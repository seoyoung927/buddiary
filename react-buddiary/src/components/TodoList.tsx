import { useRecoilValue, useSetRecoilState } from "recoil";
import { deleteTodo } from "../api/deleteTodo";
import { postTodo } from "../api/postTodo";
import { putUpdateTodo } from "../api/putUpdateTodo";
import { putUpdateTodoDone } from "../api/putUpdateTodoDone";
import { SelectedDay } from "../recoil/selectedDay";
import { useQuery } from "react-query";
import { getTodoByDate } from "../api/getTodoByDate";
import { LoginUser } from "../recoil/login";
import InputForm from "./InputForm";
import UpdateForm from "./UpdateForm";
import styled from "styled-components";

//styled-components
const InputCheck = styled.input`
    width: 14px;
    cursor: pointer;
`;
interface ICheck{
    id: number;
    done: number;
}
function Check({id,done}:ICheck){
    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();
        if(done===0){
            putUpdateTodoDone(id,1);
        }else{
            putUpdateTodoDone(id,0);
        }
    }
    
    if(done===1)
        return <InputCheck checked type="checkbox" onChange={onChange}/>
    else
        return <InputCheck type="checkbox" onChange={onChange}/>
}

const CategoryText = styled.div`
    font-size: 16px;
    margin-top: 32px;
    margin-bottom: 16px;
    span{
        border-radius: 10px;
        padding: 4px 8px;
        background-color: ${(props)=>props.theme.bgColor};
    }
`;
const Div = styled.div`
    display: grid;
    grid-template-columns: 1fr 20fr;
`;
interface ITodo {
    id: number;
    title: string;
    year: number;
    month: number;
    date: number;
    categoryId: number;
    done: number;
}
interface ITodoList{
    id: number;
    title: string;
}

function TodoList({id,title}:ITodoList){
    const selectedDate = useRecoilValue(SelectedDay);
    const loginUser = useRecoilValue(LoginUser);
    const { data: todos, isLoading: IsTodos, refetch: reTodos } = useQuery<ITodo[]>(["todos", selectedDate, loginUser], ()=>getTodoByDate(selectedDate.year, selectedDate.month, selectedDate.date));
    
    const onAdd = (add: string) => {
        postTodo(add, selectedDate,id).then((res)=>{
            reTodos();
        })
    }
    const onUpdate = (id: number, update: string) => {
        putUpdateTodo(id, update).then(()=>{
            reTodos();
        })
    }
    const onDelete = (id: number) => {
        deleteTodo(id).then(()=>{
            reTodos();
        })
    }

    return <div>
        <CategoryText><span>{title}</span></CategoryText>
        {todos?.filter((i) => i.categoryId === id).map((todo) => 
            <Div key={todo?.id}>
            <Check id={todo?.id} done={todo?.done}/>
            <UpdateForm id={todo?.id} text={todo?.title} onUpdate={onUpdate} onDelete={onDelete} />
        </Div>)}
        <InputForm onButton={onAdd} btnText="등록" placeholder="일정을 입력해주세요."/>
    </div>;
}

export default TodoList;

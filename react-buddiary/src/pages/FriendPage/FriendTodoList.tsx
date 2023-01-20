import { useRecoilValue } from "recoil";
import { SelectedDay } from "../../recoil/selectedDay";
import { useQuery } from "react-query";
import { getTodoByDate } from "../../api/getTodoByDate";
import { LoginUser } from "../../recoil/login";
import styled from "styled-components";
import { getFriendTodo } from "../../api/getFriendTodo";

const CategoryText = styled.div`
    span{
        display: inline-block;
        border-radius: 10px;
        padding: 8px 8px;
        font-size: 16px;
        margin: 2px 0px;
        background-color: ${(props)=>props.theme.bgColor};
    }
`;
const Todo = styled.div<{colorState: boolean}>`
    background-color: ${(props)=>props.colorState ? "rgb(159, 211, 199, 0.5)" : "rgb(239, 175, 175, 0.5)"};
    padding: 8px;
    margin: 8px 0px;
    border-radius: 10px;
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
    colorState: boolean;
    pairId?: number;
}

function FriendTodoList({id,title,colorState,pairId}:ITodoList){
    const selectedDate = useRecoilValue(SelectedDay);
    const loginUser = useRecoilValue(LoginUser);
    const { data: todos, isLoading: IsTodos, refetch: reTodos } = useQuery<ITodo[]>(["todos", selectedDate, pairId?
    pairId:loginUser], pairId?()=>getFriendTodo(pairId, selectedDate.year, selectedDate.month, selectedDate.date)
    :()=>getTodoByDate(selectedDate.year, selectedDate.month, selectedDate.date));

    return <div>
        <CategoryText><span>{title}</span></CategoryText>
        {todos?.filter((i) => i.categoryId === id).map((todo) => 
            <Todo colorState={colorState} key={todo?.id}>
            {todo?.title}
        </Todo>)}
    </div>;
}

export default FriendTodoList;

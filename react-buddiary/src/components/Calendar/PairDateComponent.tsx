import { useEffect } from "react";
import { useQuery } from "react-query";
import { useRecoilState, useRecoilValue } from "recoil";
import { LoginUser } from "../../recoil/login";
import { SelectedDay } from "../../recoil/selectedDay";
import { getFriendTodo } from "../../api/getFriendTodo";
import { getTodoByDate } from "../../api/getTodoByDate";
import styled from "styled-components";

//styled-components
const DateDiv = styled.div<{isToday: boolean, isBlocked: boolean}>`
    width: 100%;
    min-height: 132px;
    font-size: 16px;
    border: 1px solid black;
    border: ${(props)=>props.isToday && props.isBlocked===true && "2px solid #192a56"};
    &:hover{
        border: ${(props)=>props.isBlocked===true && "2px solid #192a56"};
    }
    cursor: ${(props)=>props.isBlocked===true && "pointer"};
    background-color: ${(props)=>props.isBlocked===false && "#EFEFEF"};
    opacity: ${(props)=>props.isBlocked===false && "0.5"};
    .text{
        display: flex;
        justify-content: left;
        align-items: center;
        padding-left: 4px;
        height: ${(props)=>props.isToday ? "23px" : "24px"};
    }
    .todos{
        .todo{
            background-color: rgba(159,211,199,0.5);
            margin-bottom: 4px;
            height: 24px;
            line-height: 24px;
            padding-left: 4px;
            overflow: hidden;
        }
        .todoPair{
            background-color: rgba(239, 175, 175,0.5);
        margin-bottom: 4px;
        height: 24px;
        line-height: 24px;
        padding-left: 4px;
        overflow: hidden;
        }
    }
`;
interface IDateComponent {
    d:{
        year: number,
        month: number,
        date: number,
        day: number,
        hours: number,
        minutes: number,
        seconds: number,
    },
    thisMonth: number;
    pairId?: number;
}
interface IToDo{
    id: number;
    title: string;
    year: number;
    month: number;
    date: number;
    userId: number;
};
function PairDateComponent({d,pairId}:IDateComponent) {
    //recoil
    const [selectedDate,setSelectedDate] = useRecoilState(SelectedDay);

    //react-query
    const loginUser = useRecoilValue(LoginUser);
    const { data: todos, isLoading: IsTodos } = useQuery<IToDo[]|undefined>(["todos", d, loginUser], ()=>getTodoByDate(d.year, d.month, d.date));
    const { data: pairTodos, isLoading: IsPairTodos, refetch:rePairTodos } = useQuery<IToDo[]|undefined>(["pairTodos", d, pairId], ()=>getFriendTodo(pairId, d.year, d.month, d.date));

    useEffect(()=>{
        rePairTodos();
    },[pairId]);

    const onChangeDate = () => {
        setSelectedDate(d);
    }

    return <DateDiv
            onClick={onChangeDate}
            isToday={d.year===selectedDate.year && d.date===selectedDate.date}
            isBlocked={d.month===selectedDate.month}>
            <div className="text">{d.date}</div>
            <div className="todos">
                {d.month===selectedDate.month && todos?.map((todo,index)=><div className="todo" key={index}>{todo?.title}</div>)}
                {d.month===selectedDate.month && pairTodos?.map((todo,index)=><div className="todoPair" key={index}>{todo?.title}</div>)} 
            </div>
    </DateDiv>;
}

export default PairDateComponent;

import { motion, PanInfo } from "framer-motion";
import { useQuery } from "react-query";
import { useRecoilValue } from "recoil";
import { LoginUser } from "../recoil/login";
import { getTodoByDate } from "../api/getTodoByDate";
import { putUpdateTodoDone } from "../api/putUpdateTodoDone";
import { getNewDateObj } from "../utils";
import styled from "styled-components";
import { useEffect } from "react";

//styled-components
const Container = styled.div`
    display: flex;
    @media all and (max-width: 768px){
        //브라우저 창 width가 768px보다 작아지는 순간부터 적용
        //모바일
        margin: 8px;
    }
    @media all and (min-width: 1024px){
        //브라우저 창 width가 1024px보다 커지는 순간부터 적용
        //데스크탑
        margin: 32px 128px;
    }
`;
const Div = styled.div`
    border: 1px solid ${(props)=>props.theme.primaryColor};
    display: flex;
    flex-direction: column;
    width: 100%;
    h1{
        padding: 8px 16px;
        padding-top: 16px;
        font-size: 18px;
        font-weight: 600;
    }

    .wrapper{
        display: flex;
        width: 100%;
        min-height: 240px;
        .todolist{
            width: calc(50% - 8px);
            padding: 16px;
            .todo{
                background-color: rgba(159, 211, 199, 0.5);
                padding: 8px;
                margin: 8px 0px;
                border-radius: 10px;
                cursor: pointer;
            }
        }
        h2{
            font-size: 16px;
            margin-bottom: 16px; 
        }
    }
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

//https://velog.io/@dosilv/React-Drag-and-Drop-%EA%B8%B0%EB%8A%A5-%EA%B5%AC%ED%98%84%ED%95%98%EA%B8%B0
function MainPage(){
    const today = getNewDateObj(new Date());
    const loginUser = useRecoilValue(LoginUser);
    const { data: todos, isLoading: IsTodos, refetch: reTodos } = useQuery<ITodo[]>(["todos", today, loginUser], ()=>getTodoByDate(today.year, today.month, today.date));
    const onDone = (event:MouseEvent | TouchEvent | PointerEvent, info:PanInfo, id:number)=>{
        if(info.point.x>window.innerWidth/4){
            putUpdateTodoDone(id, 1);
        }
        reTodos();
    }
    const onNotDone = (event:MouseEvent | TouchEvent | PointerEvent, info:PanInfo, id:number)=>{
        if(info.point.x<window.innerWidth/1.2){
            putUpdateTodoDone(id, 0);
        }
        reTodos();
    }
    return <Container>
        <Div>
            <h1>오늘의 일정</h1>
            <div className="wrapper">
    
                <div className="todolist">
                <h2>할일</h2>
                {todos?.filter(i=>i?.done===0).map((todo)=><motion.div className="todo" 
                    onDragEnd={(event, info)=>onDone(event, info, todo.id)}
                    drag dragSnapToOrigin key={todo?.id}>
                    {todo?.title}
                </motion.div>)}
                </div>
            
                <hr/>

                <div className="todolist">
                <h2>완료</h2>
                {todos?.filter(i=>i?.done===1).map((todo)=><motion.div className="todo" 
                    onDragEnd={(event, info)=>onNotDone(event, info, todo.id)}
                    drag dragSnapToOrigin key={todo?.id}>
                    {todo?.title}
                </motion.div>)}
                </div>
            </div>
        </Div>
    </Container>
}

export default MainPage;

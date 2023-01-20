import { useQuery } from "react-query";
import { useRecoilValue } from "recoil";
import { getCategory } from "../../api/getCategory";
import { LoginUser } from "../../recoil/login";
import { SelectedDay } from "../../recoil/selectedDay";
import { useEffect, useState } from "react";
import { getFriendCategory } from "../../api/getFriendCategory";
import FriendTodoList from "./FriendTodoList";
import styled from "styled-components";

const Container = styled.div`
    margin-top: 32px;
`;
const DateText = styled.h2`
    font-weight: 600;
    font-size: 18px;
    margin-bottom: 16px;
`;
const SubText = styled.h4`
    font-size: 16px;
    margin-top: 40px;
    margin-bottom: 16px;
`;
interface ICategory {
    id: number;
    title: string;
}
interface IFriendTodo{
    pairId?: number;
}
function FriendTodo({pairId}:IFriendTodo){
    const dateName = ["일", "월", "화", "수", "목", "금", "토"];
    //recoil
    const selectedDate = useRecoilValue(SelectedDay);
    const loginUser = useRecoilValue(LoginUser);
    //react-query
    const { data: categories, isLoading: IsCategories, refetch: reCategories } = useQuery<ICategory[]|undefined>(["categories",loginUser], getCategory);
    //pair-data
    const [pairCategories, setPairCategories] = useState<ICategory[]|undefined>([]);
    useEffect(()=>{
        if(pairId){
            getFriendCategory(pairId).then((res)=>{
                setPairCategories(res);
            });
        }
    },[pairId]);
    
    return (<Container>
        <DateText>{selectedDate.year}년 {selectedDate.month}월 {selectedDate.date}일 {dateName[selectedDate.day]}요일</DateText>
        <div>
            <SubText>내 일정</SubText>
            {categories?.length !== 0 && <>
            {categories?.map((category) => <FriendTodoList
                key={category.id}
                id={category.id}
                title={category.title}
                colorState={true}
            />)}</>}
        </div>
        {pairId && <div>
            <SubText>친구 일정</SubText>
            {pairCategories?.length !== 0 && <>
            {pairCategories?.map((category) => <FriendTodoList
                key={category.id}
                id={category.id}
                title={category.title}
                colorState={false}
                pairId={pairId}
            />)}</>}
        </div>}
    </Container>)
}

export default FriendTodo;

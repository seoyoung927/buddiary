import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { LoginUser } from "../recoil/login";
import { SelectedDay } from "../recoil/selectedDay";
import { getCategory } from "../api/getCategory";
import { postCategory } from "../api/postCategory";
import { putUpdateCategory } from "../api/putUpdateCategory";
import { deleteCategory } from "../api/deleteCategory";
import { useQuery } from "react-query";
import { Link, Route, Routes, useLocation } from "react-router-dom";
import styled from "styled-components";
import Calender from "../components/Calendar";
import TodoList from "../components/TodoList";
import InputForm from "../components/InputForm";
import UpdateForm from "../components/UpdateForm";

//styled-components
const Container = styled.div`
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
const Wrapper = styled.div`
    display: flex;
    padding-top: 16px;
    flex-direction: row;
`;
const UList = styled.ul`
    width: 160px;
    border-right: 1px solid ${(props) => props.theme.successColor};
    a{
        text-decoration: none;
        color: inherit;
        &:visited{
            color: inherit;
        }
    }
`;
const List = styled.li<{ path: boolean }>`
    font-size: 16px;
    margin-top: 32px;
    margin-bottom: 24px;
    span{
        padding: 4px 8px;
        border-radius: 15px;
        background-color: ${(props) => props.path ? "rgba(200,200,200,0.5)" : "rgba(0,0,0,0)"};
    }
    &:hover{
        span{
            background-color: rgba(200,200,200,0.5);
        }
    }
    cursor: pointer;
`;
const SubWrapper = styled.div`
    margin-top: 32px;
    width: 100%;
    margin-left: 16px;
`;
const DateText = styled.div`
    font-weight: 600;
    font-size: 18px;
    margin-bottom: 16px;
`;

interface ICategory {
    id: number;
    title: string;
}
function TodoPage() {
    const dateName = ["일", "월", "화", "수", "목", "금", "토"];
    //recoil
    const selectedDate = useRecoilValue(SelectedDay);
    const loginUser = useRecoilValue(LoginUser);
    //url
    const location = useLocation();
    //react-query
    const [isLoading, setIsLoading] = useState(false);
    const { data: categories, isLoading: IsCategories, refetch: reCategories } = useQuery<ICategory[]|undefined>(["categories",loginUser], getCategory);

    const onCategoryAdd = (add:string)=>{
        postCategory(add).then(()=>{
            reCategories();
        })
    }
    const onCategoryUpdate = (id:number, update:string)=>{
        putUpdateCategory(id, update).then(()=>{
            reCategories();
        })
    }
    const onCategoryDelete = (id:number) => {
        deleteCategory(id).then(()=>{
            reCategories();
        })
    }
    useEffect(()=>{
        setIsLoading(IsCategories);
    },[IsCategories]);

    return (<Container>
        {isLoading ? <div>Loading...</div>:<>
        <Calender />
        <Wrapper>
            <UList>
                <List path={location.pathname === `${process.env.PUBLIC_URL}/todo`}><Link to={'/todo'}><span>일정 관리</span></Link></List>
                <List path={location.pathname === `${process.env.PUBLIC_URL}/todo/category`}><Link to={'/todo/category'}><span>카테고리 관리</span></Link></List>
            </UList>
            <SubWrapper>
                <DateText>{selectedDate.year}년 {selectedDate.month}월 {selectedDate.date}일 {dateName[selectedDate.day]}요일</DateText>

                <Routes>
                    <Route path="" element={<div>
                        {categories?.length === 0 && <p style={{ margin: "16px 0px" }}>카테고리 설정이 필요합니다.</p>}
                        {categories?.length !== 0 && <>
                            {categories?.map((category) => <TodoList 
                                key={category.id}
                                id={category.id}
                                title={category.title}
                            />)}</>}
                    </div>} />
                    <Route path="category" element={<div>
                        {categories?.map((category) => <UpdateForm onUpdate={onCategoryUpdate} onDelete={onCategoryDelete} key={category?.id} id={category?.id} text={category?.title} />)}
                            <InputForm onButton={onCategoryAdd} btnText="등록" placeholder="카테고리를 입력해주세요."/>
                    </div>} />
                </Routes>
            </SubWrapper>
        </Wrapper></>}
    </Container>);
}

export default TodoPage;

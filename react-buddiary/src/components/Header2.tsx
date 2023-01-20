import { Link, useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { BsPerson } from "react-icons/bs";
import { getLogout } from "../api/getLogout";
import { getUserInfo } from "../api/getUserInfo";
import { useEffect, useState } from "react";
import { LoginUser } from "../recoil/login";
import { getLoginState } from "../utils";
import styled from "styled-components";
import { deleteUser } from "../api/deleteUser";

//styled-components
const Container = styled.nav`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 64px;
    border-bottom: 1px solid ${(props)=>props.theme.subBgColor};
    padding: 0px 32px;
    @media all and (max-width: 768px){
        //브라우저 창 width가 768px보다 작아지는 순간부터 적용
        //모바일
        padding: 0px 8px;
    }
`;
const UList = styled.ul`
    display: flex; justify-content: center; align-items: center;
    li{
        display: flex; flex-direction: column; justify-content: center; align-items: center;
        position: relative;
        height: 32px;
        a{
            text-decoration: none;
            color: inherit;
            &:visited{
                color: inherit;
            }
        }
        &:hover{
            ul{
                display: block;
            }
        }


        ul.menu{
            width: 120px;
        }
        ul.loginMenu{
            left: -48px;
            width: 80px;
        }
        ul{
            display: none;
            top: 32px;
            position: absolute;
            background-color: rgba(159,211,199,0.5);
            li{
                display: flex; justify-content: center; align-items: center;
                font-size: 14px;
                margin: 4px;
                padding: 4px;
                border: 0px;
                background-color: rgba(159,211,199,0);
                cursor: pointer; 
            }
        }
    }
`;
const Icon = styled.div`
    width: 32px;
    height: 32px;
    outline: 1px solid ${(props)=>props.theme.primaryColor};
    border-radius: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
`;
const Logo = styled.img`
    width: 120px;
    height: 64px;
    margin-right: 8px;
    @media all and (max-width: 768px){
        //브라우저 창 width가 768px보다 작아지는 순간부터 적용
        //모바일
        width: 104px;
        height: 56px;
        margin-right: 4px;
    }
`;
const Menu = styled.div`
    padding: 16px;
    font-size: 16px;
    @media all and (max-width: 768px){
        //브라우저 창 width가 768px보다 작아지는 순간부터 적용
        //모바일
        padding: 8px;
    }
`;
const LoginMenu = styled.div`
    padding: 8px;
    font-size: 16px;
    @media all and (max-width: 768px){
        //브라우저 창 width가 768px보다 작아지는 순간부터 적용
        //모바일
        font-size: 14px;
    }
`;



function Header2(){
    const [isLogin, setIsLogin] = useState(false);
    //recoil
    const [loginUser, setLoginUser] = useRecoilState(LoginUser);
    useEffect(()=>{
        setIsLogin(getLoginState());
        const getLoginUser = async () => {
            const newUser = await getUserInfo();
            setLoginUser(newUser.firstName);
        };
        getLoginUser();
    },[loginUser]);

    //logout
    const navigate = useNavigate();
    const onClick = () => {
        getLogout();
        setIsLogin(getLoginState());
        setLoginUser("none");
        navigate(`${process.env.PUBLIC_URL}/`);
    }
    const onDelete = () => {
        deleteUser();
        getLogout();
        setIsLogin(getLoginState());
        setLoginUser("none");
        navigate(`${process.env.PUBLIC_URL}/`);
    }
    return(
        <Container>
            <UList>
                <li>
                    <Link to={`${process.env.PUBLIC_URL}/`}><Logo src={require(`../images/buddiary.png`)} alt="logo" /></Link>
                </li>
                <li>
                    <Link to={`${process.env.PUBLIC_URL}/`}><Menu>홈</Menu></Link>
                </li>
                <li>
                    <Link to={`${process.env.PUBLIC_URL}/todo`}><Menu>일정</Menu></Link>
                    <ul className="menu">
                        <Link to={`${process.env.PUBLIC_URL}/todo`}><li>일정 관리</li></Link>
                        <Link to={`${process.env.PUBLIC_URL}/todo/category`}><li>카테고리 관리</li></Link>
                    </ul>
                </li>
                <li>
                    <Link to={`${process.env.PUBLIC_URL}/friend`}><Menu>친구</Menu></Link>
                    <ul className="menu">
                    <Link to={`${process.env.PUBLIC_URL}/friend`}><li>일정 비교</li></Link>
                        <Link to={`${process.env.PUBLIC_URL}/friend/edit`}><li>친구 관리</li></Link>
                    </ul>
                </li>
            </UList>
            <UList>
                {isLogin ? 
                <>
                <li>
                    <LoginMenu>{loginUser}님</LoginMenu>
                </li>
                <li>
                    <Icon><BsPerson size={16}/></Icon>
                    <ul className="loginMenu">
                        <li onClick={onClick}>로그아웃</li>
                        <li onClick={onDelete}>회원탈퇴</li>
                    </ul>
                </li>
                </>
                :<li>
                <Link to={`${process.env.PUBLIC_URL}/login`}><LoginMenu>로그인/가입</LoginMenu></Link>    
                </li>}
            </UList>
        </Container>
    );
}

export default Header2;

import { Link, useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { BsPerson } from "react-icons/bs";
import { getLogout } from "../api/getLogout";
import { getUserInfo } from "../api/getUserInfo";
import { useEffect, useState } from "react";
import { LoginUser } from "../recoil/login";
import styled from "styled-components";
import { getLoginState } from "../utils";

//styled-components
const Container = styled.nav`
    background-color: pink;
    width: 100%;
    height: 320px;
`;
const TopWrapper = styled.ul`
    display: flex;
    justify-content: right;
    align-items: center;
    padding-top: 16px;
    font-size: 14px;
    height: 48px;
    @media all and (max-width: 768px){
        //브라우저 창 width가 768px보다 작아지는 순간부터 적용
        //모바일
        padding-right: 16px;
    }
    @media all and (min-width: 1024px){
        //브라우저 창 width가 1024px보다 커지는 순간부터 적용
        //데스크탑
        padding-right: 32px;
    }
    a{
        text-decoration: none;
        &:visited{
            color: inherit;
        }
    }   
`;
const UserName = styled.p`
    margin-right: 8px;
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
const TopMenuBar = styled.ul`
    display: flex;
    flex-direction: row;
    list-style: none;
    li:hover{
        position: relative;
        .sub{
            display: block;
        }
        li{
            display: block;
        }
    }
`;
const SubMenuBar = styled.ul`
    //display: none;
    position: absolute;
    text-align: center;
    left: -48px;
    width: 80px;
    background-color: rgba(159,211,199,0.5);
`;
const SubMenuBtn = styled.li`
    display: none;
    font-size: 14px;
    margin: 1px 4px;
    padding: 4px;
    width: 70px;
    border-radius: 10px;
    border: 0px;
    background-color: rgba(159,211,199,0);
    &:hover{
        background-color: rgba(256, 256, 256, 0.6);
    }
    cursor: pointer;
`;

const LogoWrapper = styled.div`
    width: 100%;
    height: 224px;
    display: flex;
    justify-content: center;
    align-items: center;
`;
const Logo = styled.img`
    @media all and (max-width: 768px){
        //브라우저 창 width가 768px보다 작아지는 순간부터 적용
        //모바일
        width: 240px;
        height: 132px;
    }
    @media all and (min-width: 1024px){
        //브라우저 창 width가 1024px보다 커지는 순간부터 적용
        //데스크탑
        width: 360px;
        height: 200px;
    }

`;

const BottomWrapper = styled.div`
`;
const BottomMenuBar = styled.ul`
    list-style: none;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    a{
        text-decoration: none;
        color: inherit;
        &:visited{
            color: inherit;
        }
    }
`
const BottomMenuButton = styled.li`
    width: 184px;
    height: 48px;
    border: 0px;
    font-size: 16px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: white;
    &:hover{
        border-bottom: 3px solid ${(props)=>props.theme.primaryColor};
    }
`;

function Header(){
    const [isLogin,setIsLogin] = useState(false);
    //recoil
    const [loginUser, setLoginUser] = useRecoilState(LoginUser);
    useEffect(()=>{
        setIsLogin(getLoginState());
        const getLoginUser = async () => {
            const newUser = await getUserInfo();
            setLoginUser(newUser.email);
        };
        getLoginUser();
    },[]);

    //logout
    const navigate = useNavigate();
    const onClick = async() => {
        getLogout();
        setLoginUser("none");
        navigate("/");
    }

    return(
        <Container>
            <TopWrapper>
                {isLogin ? 
                <>
                <UserName>{loginUser}님</UserName>
                <TopMenuBar>
                    <li>
                        <Icon><BsPerson size={16}/></Icon>
                        <SubMenuBar className="sub">
                            <SubMenuBtn onClick={onClick}>로그아웃</SubMenuBtn>
                        </SubMenuBar>
                    </li>
                </TopMenuBar>
                </>
                :<Link to={`/login`}>로그인/가입</Link>}
            </TopWrapper>
            
            <LogoWrapper>
            <Link to={'/'}><Logo src={require(`../images/buddiary.png`)} alt="logo" /></Link>
            </LogoWrapper>

            <BottomWrapper>
                <BottomMenuBar>
                    <Link to={'/'}><BottomMenuButton>홈</BottomMenuButton></Link>
                    <Link to={'/todo'}><BottomMenuButton>일정 관리</BottomMenuButton></Link>
                    <Link to={'/friend'}><BottomMenuButton>친구 관리</BottomMenuButton></Link>
                </BottomMenuBar>
            </BottomWrapper>
        </Container>
    );
}

export default Header;

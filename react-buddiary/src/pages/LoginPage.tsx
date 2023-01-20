import { useNavigate } from "react-router-dom";
import { postLoginToken } from "../api/postLoginToken";
import { useSetRecoilState } from "recoil";
import { getUserInfo } from "../api/getUserInfo";
import { LoginUser } from "../recoil/login";
import styled from "styled-components";
import GoogleLogin from "../components/GoogleLogin";

//styled-components
const Container = styled.div`
    display: flex; justify-content: center; align-items: center;
    width: 100%;
    height: 400px;
`;
const SocialLoginDiv = styled.div`
    border: 1px solid ${(props)=>props.theme.primaryColor};
    padding: 32px;
    display: flex; 
    flex-direction: column; 
    justify-content: center; 
    align-items: center;
`
const Title = styled.h4`
    width: 100%;
    font-size: 18px;
    font-weight: 600;
    margin-bottom: 40px;
`;

//for typescript
interface IRes {
    clientId: string;
    client_id: string;
    credential: string;
    select_by: string;
}

function LoginPage(){
    const setLoginUser = useSetRecoilState(LoginUser);
    const navigate = useNavigate();

    const onGoogleSignIn = async (res:IRes) => {
        const { credential } = res;
        const result = await postLoginToken(credential);
        const getLoginUser = async () => {
            const newUser = await getUserInfo();
            setLoginUser(newUser.firstName);
        };
        getLoginUser();
        navigate(`${process.env.PUBLIC_URL}/`);
    };

    return(<Container>
        <SocialLoginDiv>
        <Title>로그인/가입</Title>
        <GoogleLogin onGoogleSignIn={onGoogleSignIn as any} text="로그인" />
        </SocialLoginDiv>
    </Container>);
}

export default LoginPage;


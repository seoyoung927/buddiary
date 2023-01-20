import { useState } from "react";
import { Link } from "react-router-dom";
import { TiArrowBack } from "react-icons/ti";
import { searchUserByEmail } from "../../api/searchUserByEmail";
import { postFriend } from "../../api/postFriend";
import InputForm from "../../components/InputForm";
import styled from "styled-components";

const MenuDiv = styled.div`
    display: flex;
    justify-content: flex-start;
    button{
        padding: 8px;
        font-size: 14px;
        border: 0px;
        cursor: pointer;
        a{
            text-decoration: none;
            color: inherit;
            &:visited{
                color: inherit;
            }
        }
    }
`;
const FriendWrapper = styled.div`
    min-height: 48px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    margin: 16px;
`;
const Friend = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    margin-bottom: 16px;
`;
const Profile = styled.div<{bgPhoto?:string}>`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    .profile{
        width: 48px;
        height: 48px;
        border-radius: 100%;
        background-image: url(${(props) => props.bgPhoto});
        background-repeat: no-repeat;
        background-position: center center;
        background-size: cover;
        margin-right: 8px;
    }
`;
const AButton = styled.button`
    margin: 0px 2px;
    width: 80px;
    height: 32px;
    font-size: 14px;
    border: 0px;
    border-radius: 10px;
    margin-right: 16px;
    background-color: ${(props)=>props.theme.infoColor};
    &:hover{
        outline: 2px solid #bad7e972;
        opacity: 80;
    }
    cursor: pointer;
`;


interface IUser{
    id: number; //id: user-id
    firstName: string;
    lastName: string;
    email: string;
    pictureUrl: string;
}
function FriendSearchPage(){
    //for friend-search
    const [friend,setFriend] = useState<IUser|null>();
    const onSearch = (email:string) => {
        searchUserByEmail(email).then((response)=>{
            setFriend(response);
        });
    }
    const onClick = () => {
        if(friend){
            postFriend(friend.id);
            setFriend(null);
        }
    }
    
    return <div>
        <MenuDiv>
            <button>
                <Link to={`${process.env.PUBLIC_URL}/friend/edit`}><TiArrowBack/>뒤로</Link>
            </button>
        </MenuDiv>
        <InputForm onButton={onSearch} btnText="검색"/>
        <FriendWrapper>
        {friend &&  <Friend key={friend.id}>
            <Profile bgPhoto={friend.pictureUrl}>
                <div className="profile" />
                {friend.firstName}
            </Profile>
            <AButton onClick={onClick}>친구요청</AButton>
        </Friend>}
        </FriendWrapper>
    </div>
}

export default FriendSearchPage;



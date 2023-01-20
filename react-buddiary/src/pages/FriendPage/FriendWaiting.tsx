import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { LoginUser } from "../../recoil/login";
import { useQuery } from "react-query";
import { getFriend } from "../../api/getFriend";
import { Link } from "react-router-dom";
import { TiArrowBack } from "react-icons/ti";
import styled from "styled-components";
import { putUpdateFriendStatus } from "../../api/putUpdateFriendStatus";
import { deleteFriend } from "../../api/deleteFriend";

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
    width: 48px;
    height: 32px;
    font-size: 14px;
    border: 0px;
    border-radius: 10px;
    background-color: ${(props)=>props.theme.infoColor};
    &:hover{
        outline: 2px solid #bad7e972;
        opacity: 80;
    }
    cursor: pointer;
`;
const DButton = styled.button`
    margin: 0px 2px;
    width: 48px;
    height: 32px;
    font-size: 14px;
    border: 0px;
    border-radius: 10px;
    margin-right: 16px;
    background-color: ${(props)=>props.theme.dangerColor};
    &:hover{
        outline: 2px solid #efafaf7d;
        opacity: 80;
    }
    cursor: pointer;
`;

interface IFriend{
    id: number;
    friendId: number;
    firstName: string;
    lastName: string;
    pictureUrl: string;
    status: string;
}
function FriendWaitingPage(){
    const loginUser = useRecoilValue(LoginUser);
    const { data, isLoading, refetch } = useQuery<IFriend[]>(["friends",loginUser], getFriend);
    const [friends,setFriends] = useState<IFriend[]>([]);
    useEffect(()=>{
        if(data){
            const llist = data.filter(i=>i.status==="WAITING");
            setFriends(llist);
        }
    },[data]);
    //for friend-add
    const onAdd = (id:number) => {
        putUpdateFriendStatus(id);
        refetch();
    }
    const onDelete = (id:number) => {
        deleteFriend(id);
        refetch()
    }

    return <div>
        <MenuDiv>
            <button>
                <Link to={`${process.env.PUBLIC_URL}/friend/edit`}><TiArrowBack/>뒤로</Link>
            </button>
        </MenuDiv>
        
        <FriendWrapper>
        {friends?.map((friend)=>
            <Friend key={friend.id}>
                <Profile bgPhoto={friend.pictureUrl}>
                    <div className="profile" />
                    {friend.firstName}
                </Profile>
                <div>
                <AButton onClick={()=>onAdd(friend.id)}>수락</AButton>
                <DButton onClick={()=>onDelete(friend.id)}>거절</DButton>
                </div>
            </Friend>)}
        </FriendWrapper>
    </div>
}

export default FriendWaitingPage;


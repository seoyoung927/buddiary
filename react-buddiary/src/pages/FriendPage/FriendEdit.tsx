import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { TiArrowForward } from "react-icons/ti";
import { useQuery } from "react-query";
import { useRecoilValue } from "recoil";
import { LoginUser } from "../../recoil/login";
import { deleteFriend } from "../../api/deleteFriend";
import { getFriend } from "../../api/getFriend";
import styled from "styled-components";

const MenuDiv = styled.div`
    margin-bottom: 16px;
    display: flex;
    justify-content: flex-end;
    button{
        margin: 4px;
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
function FriendEditPage(){
    const loginUser = useRecoilValue(LoginUser);
    const { data, isLoading, refetch } = useQuery<IFriend[]>(["friends",loginUser], getFriend);
    const [friends,setFriends] = useState<IFriend[]>([]);
    useEffect(()=>{
        if(data){
            const llist = data.filter(i=>i.status==="FRIEND");
            setFriends(llist);
        }
    },[data]);

    const onDelete = (id:number) => {
        deleteFriend(id);
        refetch()
    }
    
    return <div>
        <MenuDiv>
            <button>
                <Link to={'/friend/edit/waitinglist'}><TiArrowForward />친구요청</Link>    
            </button>
            <button>
                <Link to={'/friend/edit/search'}><TiArrowForward />친구검색</Link>    
            </button>
        </MenuDiv>
        <FriendWrapper>
        {friends?.map((friend)=>
            <Friend key={friend.id}>
                <Profile bgPhoto={friend.pictureUrl}>
                    <div className="profile" />
                    {friend.firstName}
                </Profile>
                <DButton onClick={()=>onDelete(friend.id)}>삭제</DButton>
            </Friend>)}
        </FriendWrapper>
    </div>
}

export default FriendEditPage;



import { useEffect, useState } from "react";
import { Link, Route, Routes, useMatch } from "react-router-dom";
import { useQuery } from "react-query";
import { useRecoilValue } from "recoil";
import { LoginUser } from "../../recoil/login";
import { getFriend } from "../../api/getFriend";
import styled from "styled-components";
import Calender from "../../components/Calendar";
import FriendEditPage from "./FriendEdit";
import FriendWaitingPage from "./FriendWaiting";
import FriendSearchPage from "./FriendSearch";
import FriendTodo from "./FriendTodo";

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
const FriendWrapper = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
`;
const Friend = styled.div<{ isSelected?: boolean, bgPhoto?: string }>`
    text-align: center;
    margin: 0px 8px; margin-bottom: 8px;
    padding: 4px;
    border-radius: 10px;
    background-color: ${(props) => props.isSelected && "#EFEFEF"};
    cursor: pointer;
    .profile{
        width: 48px; height: 48px;
        border-radius: 100%;
        background-image: url(${(props) => props.bgPhoto});
        background-repeat: no-repeat;
        background-position: center center;
        background-size: cover;
        margin-bottom: 4px;
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
    //margin-top: 32px;
    width: 100%;
    margin-left: 16px;
`;

interface IFriend {
    id: number; //friend-id
    friendId: number; //user-id
    firstName: string;
    lastName: string;
    pictureUrl: string;
    status: string;
}
function FriendPage() {
    //url-match
    const todoMatch = useMatch(`${process.env.PUBLIC_URL}/friend`);
    const friendMatch = useMatch(`${process.env.PUBLIC_URL}/friend/edit/*`);
    //react-query
    const loginUser = useRecoilValue(LoginUser);
    const { data, isLoading, refetch } = useQuery<IFriend[]>(["friends", loginUser], getFriend);
    const [friends, setFriends] = useState<IFriend[]>([]);
    const [pairId, setPairId] = useState<number>();

    useEffect(() => {
        if (data) {
            const llist = data.filter(i => i.status === "FRIEND");
            setFriends(llist);
            setPairId(llist[0]?.id);
        }
    }, [data])

    const onSetFriend = (friendId: number) => {
        setPairId(friendId);
    }

    return <Container>
        <FriendWrapper>
            {friends?.map((friend) =>
                <Friend key={friend.id} onClick={() => onSetFriend(friend.id)} bgPhoto={friend.pictureUrl} isSelected={friend.id === pairId}>
                    <div className="profile" />
                    {friend.firstName}
                </Friend>
            )}
        </FriendWrapper>
        <Calender pairId={pairId} />
        <Wrapper>
            <UList>
                <List path={todoMatch ? true : false}><Link to={`${process.env.PUBLIC_URL}/friend`}><span>일정 비교</span></Link></List>
                <List path={friendMatch ? true : false}><Link to={`${process.env.PUBLIC_URL}/friend/edit`}><span>친구 관리</span></Link></List>
            </UList>

            <SubWrapper>
                <Routes>
                    <Route path="" element={<FriendTodo pairId={pairId}/>} />
                    <Route path="edit" element={<FriendEditPage />} />
                    <Route path="edit/waitinglist" element={<FriendWaitingPage />} />
                    <Route path="edit/search" element={<FriendSearchPage />} />
                </Routes>
            </SubWrapper>
        </Wrapper>
    </Container>
}

export default FriendPage;

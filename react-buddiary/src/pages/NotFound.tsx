import styled from "styled-components";

const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 400px;
    font-size: 16px;
`;

function NotFound(){
    return <Container>
        지원하지 않는 페이지입니다.
    </Container>
}

export default NotFound;
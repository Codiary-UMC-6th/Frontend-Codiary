import styled from "styled-components";
import * as Color from '../common/Color';

import UserInfo from "../components/profile/UserInfo";
import MyDiary from "../components/profile/MyDiary";

const Container = styled.div`
    background-color : ${Color.background};
    display : flex;
    flex-direction : column;
    padding : 60px 130px;
`

const Top = styled.div`
    display : flex;
`

const Callendar = styled.div`
    background-color : #ffffff;

    height : 1 0 auto;
    flex : 1 0 auto;

    display : flex;
    justify-content : center;
    align-items : center;
`

const Profile = () => {
    return (
        <Container>
            <Top>
                <UserInfo />
                <Callendar> 캘린더 </Callendar>
            </Top>
            <MyDiary />
        </Container>
    );
}

export default Profile;
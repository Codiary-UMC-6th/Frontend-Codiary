import styled from "styled-components";

import { Head, Infotype, Content, Add } from './BottomStyle';

import PlusSvg from '../../assets/profile/ph_plus.svg';

const Container = styled.div`
    flex : 1 0 auto;
    display: flex;
    flex-direction: column;
    min-height: 150px;
`

const Team = () => {
    const OpenModal = () => {
        console.log("Team Plus Clicked");
    }

    return (
        <Container>
            <Head>
                <Infotype>소속 팀</Infotype>
                <Add onClick={OpenModal} src={PlusSvg}></Add>
            </Head>
            <Content>팀 스페이스를 만들어보세요</Content>
        </Container>
    );
}

export default Team;
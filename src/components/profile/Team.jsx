import styled from "styled-components";
import * as Color from "../../common/Color";

import { Head, Infotype, Content, Add } from './BottomStyle';

import PlusSvg from '../../assets/profile/ph_plus.svg';

const Container = styled.div`
    flex : 1 0 auto;
    display: flex;
    flex-direction: column;
    min-height: 150px;
`;

const TeamListWrapper = styled.div`
    display: flex;
    align-items: center;
    padding: 8px 32px;
    border-radius: 4px;
    cursor: pointer;
`;

const TeamName = styled.div`
    color: ${Color.text1};
    font-family: 'D2Coding';
    font-size: 18px;
`;

const TeamColor = styled.div`
    width: 22px;
    height: 22px;
    background-color: #D9D9D9;
    margin-right: 8px;
    border-radius: 50%
`;

const TeamItem = styled.div``;

const Team = (props) => {
    const { teamList } = props;
    console.log(teamList);

    const onOpenModal = () => {
        console.log('addTeamTapped')
    }

    return (
        <Container>
            <Head>
                <Infotype>소속 팀</Infotype>
                <Add onClick={onOpenModal} src={PlusSvg} />
            </Head>
            {teamList && teamList.length > 0 ? (
                <>
                    {teamList.map((team) => (
                        <TeamListWrapper
                            key={team.teamId}
                        >
                            <TeamColor />
                            <TeamName>{team.teamName}</TeamName>
                        </TeamListWrapper>
                    ))}
                </>
            ) : (
                <Content>팀 스페이스를 만들어보세요</Content>
            )}
        </Container>
    );
};

export default Team;
import styled from "styled-components";
import { Navigate, useNavigate } from "react-router-dom";

import * as Color from "../../common/Color";

import { Head, Infotype, Content } from './BottomStyle';

import { teamInfo } from "@/shared/api/profile/type";

const Team = (props: { teamList: teamInfo[]; }) => {
    const { teamList } = props;
    const navigate = useNavigate();
    // console.log("teamList", teamList);

    return (
        <Container>
            <Head>
                <InfoTitle>소속 팀</InfoTitle>
            </Head>
            {teamList && teamList.length > 0 ? (
                <>
                    {teamList.map((team: teamInfo) => (
                        <TeamListWrapper
                            key={team.team_id}
                            onClick={() => {
                                navigate(`/team/${team.team_id}`);
                            }}
                        >
                            <TeamColor />
                            <TeamName>{team.team_name}</TeamName>
                        </TeamListWrapper>
                    ))}
                </>
            ) : (
                <Content>소속 팀이 없습니다</Content>
            )}
        </Container>
    );
};

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

const InfoTitle = styled(Infotype)`
    cursor: default;
`;

export default Team;
import { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import styled from "styled-components";
import * as Color from "../../common/Color";
import { get } from "../../common/api.js";

import EnabledSvg from "../../assets/dropdown-enabled.svg";
import DisabledSvg from "../../assets/dropdown-disabled.svg";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 18px;
  margin: 0px 0px 0px 48px;
  text-decoration: none;
  color: ${Color.text1};
`;

const Nav = styled.div`
  cursor: pointer;
`;

const Svg = styled.img`
  margin: 0px 0px 0px 4px;
`;

const DropdownBox = styled.div`
  position: absolute;
  top: 75px;
  min-height: 150px;
  max-height: 400px; /* 모달 최대높이  */
  width: 180px;
  display: flex;
  flex-direction: column;
  background-color: ${Color.backgroundBlur};
  overflow-y: auto; /* 스크롤 생성 */
  padding: 10px;
`;

const TeamBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px; 
  margin-bottom: 10px;
`;

const TeamListWrapper = styled(Link)`
  display: flex;
  align-items: center;
  padding: 8px 10px;
  background-color: ${Color.backgroundBlur};
  border-radius: 4px;
  cursor: pointer;
  text-decoration: none;
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

const Create = styled.div`
  cursor: pointer;
  color: ${Color.text5};
  text-align: center;
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 24px;
  text-decoration-line: underline;
  margin-top: ${({ hasTeams }) => (hasTeams ? "auto" : "0")}; /* 팀이 없을 때 중앙에 배치 */
`;

const Dropdown = () => {
  const [visibility, setVisibility] = useState(false);
  const navigate = useNavigate();

  const [teamList, setTeamList] = useState([]);

  const toggleDropdown = () => {
    setVisibility(!visibility);
  };

  const createTeam = () => {
    setVisibility(false);
    navigate("/teamAdd");
  };

  const getTeamList = async () => {
    try {
      const response = await get(`/teams/list`);
      const teamList = response.result.teams;
      console.log("팀 리스트 가져오기 성공", teamList);
      setTeamList(teamList);
    } catch (error) {
      console.error("팀 리스트 가져오기 실패", error);
    }
  };

  useEffect(() => {
    getTeamList();
  }, []);

  return (
    <Container>
      <Nav onClick={toggleDropdown}>
        <span>팀 홈</span>
        {visibility ? <Svg src={DisabledSvg} /> : <Svg src={EnabledSvg} />}
      </Nav>
      {visibility && (
        <DropdownBox>
          {teamList.length > 0 ? (
            <>
              <TeamBox>
                {teamList.map((team) => (
                  <TeamListWrapper
                    to={`/team/${team.teamId}`}
                    key={team.teamId}
                    onClick={() => setVisibility(false)}
                  >
                    <TeamColor />
                    <TeamName>{team.teamName}</TeamName>
                  </TeamListWrapper>
                ))}
              </TeamBox>
              <Create hasTeams={true} onClick={createTeam}>
                팀스페이스 만들기
              </Create>
            </>
          ) : (
            <Create hasTeams={false} onClick={createTeam}>
              팀스페이스 만들기
            </Create>
          )}
        </DropdownBox>
      )
      }
    </Container >
  );
};

export default Dropdown;

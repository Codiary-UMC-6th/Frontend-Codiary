import { useState, useEffect, useRef } from "react";
import styled from "styled-components";

import * as Color from "../../common/Color";

import EnabledSvg from "../../assets/dropdown-enabled.svg";
import DisabledSvg from "../../assets/dropdown-disabled.svg";
import { useNavigate } from "react-router-dom";

import { getTeamList } from "@/shared/api/navbar";
import { Team } from "@/shared/api/navbar/type";

const Dropdown = () => {
  const navigate = useNavigate();

  const [visibility, setVisibility] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  
  useEffect(() => {
    const handleClickOutside = (event: any) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) { setVisibility(false); }
    };
    document.addEventListener('click', handleClickOutside);
    return () => {
        document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  const [teamList, setTeamList] = useState<Team[]>([]);
  
  const toggleDropdown = () => {
    setVisibility(!visibility);
  };

  const createTeam = () => {
    setVisibility(false);
    navigate("/teamAdd");
  };

  const handleTeamClick = (teamId: number) => {
    navigate(`/team/${teamId}`);
    window.location.reload();
  };

  const loadTeamList = async () => {
    try {
      const response = await getTeamList();
      setTeamList(response.teams);
    } catch (error) {
      console.error("팀 리스트 가져오기 실패", error);
    }
  };

  useEffect(() => {
    loadTeamList();
  }, [visibility]);

  return (
    <Container>
      <Nav onClick={(e) => {e.stopPropagation(); toggleDropdown()}}>
        <span>팀 홈</span>
        {visibility ? <Svg src={DisabledSvg} /> : <Svg src={EnabledSvg} />}
      </Nav>

      {visibility && (
        <DropdownBox ref={dropdownRef}>
          <TeamBox>
            {teamList.map((team) => (
              <TeamItem key={team.team_id} onClick={() => handleTeamClick(team.team_id)}>
                <TeamColor />
                <TeamName>{team.team_name}</TeamName>
              </TeamItem>
            ))}
          </TeamBox>
            <Create onClick={createTeam}>팀스페이스 만들기</Create>
        </DropdownBox>
      )}
    </Container >
  );
};

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

const TeamItem = styled.div`
  display: flex;
  align-items: center;
  padding: 8px 10px;
  background-color: ${Color.backgroundBlur};
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
`;

export default Dropdown;

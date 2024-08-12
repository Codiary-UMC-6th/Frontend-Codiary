import { useState } from "react";
import styled from "styled-components";
import * as Color from "../../common/Color";

import EnabledSvg from "../../assets/dropdown-enabled.svg";
import DisabledSvg from "../../assets/dropdown-disabled.svg";
import { getElementError } from "@testing-library/react";
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
  width: 180px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${Color.background3};
`;

const TeamBox = styled.div``;

const Create = styled.div`
  cursor: pointer;
  color: ${Color.text5};
  text-align: center;
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 24px; /* 150% */
  text-decoration-line: underline;
`;

const Dropdown = () => {
  const [visibility, setVisibility] = useState(false);
  const [teamList, setTeamList] = useState([]);
  const navigate = useNavigate();

  const toggleDropdown = () => {
    setVisibility(!visibility);
  };

  const createTeam = () => {
    navigate("/teamAdd");
  };

  return (
    <Container>
      <Nav onClick={toggleDropdown}>
        <span>팀 홈</span>
        {visibility ? (
          <Svg src={DisabledSvg}></Svg>
        ) : (
          <Svg src={EnabledSvg}></Svg>
        )}
      </Nav>
      {visibility ? (
        <DropdownBox id="DropdownBox">
          <TeamBox>
            {teamList.map((team) => {
              return <></>;
            })}
          </TeamBox>
          <Create onClick={createTeam}>팀스페이스 만들기</Create>
        </DropdownBox>
      ) : (
        <></>
      )}
    </Container>
  );
};

export default Dropdown;

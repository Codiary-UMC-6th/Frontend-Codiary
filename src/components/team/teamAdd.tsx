import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { post, patch } from "../../common/api";
import TeamAddUi from "./teamAddUi";
import styled from "styled-components";
const TeamAdd = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [intro, setIntro] = useState("");
  const [github, setGithub] = useState("");
  const [discord, setDiscord] = useState("");
  const [linked, setLinked] = useState("");
  const [instagram, setInstagram] = useState("");

  const [teamId, setTeamId] = useState("6");

  const location = useLocation();
  const { isEdit } = location.state || false;

  const addData = {
    name: name,
    intro: intro,
    github: github,
    email: email,
    linkedIn: linked,
    discord: discord,
    instagram: instagram,
  };

  const onClickSave = async () => {
    try {
      const response = await post("/teams", addData);
      const teamId = response.result.teamId;
      console.log(teamId);
      navigate(`/team/${teamId}`);
    } catch (error) {
      console.error("POST 요청 실패:", error);
    }
  };

  return (
    <TeamForm>
      <TeamAddUi
        onChangeName={(e: any) => setName(e.target.value)}
        onChangeEmail={(e: any) => setEmail(e.target.value)}
        onChangeIntro={(e: any) => setIntro(e.target.value)}
        onChangeGithub={(e: any) => setGithub(e.target.value)}
        onChangeDiscord={(e: any) => setDiscord(e.target.value)}
        onChangeLinked={(e: any) => setLinked(e.target.value)}
        onChangeInstagram={(e: any) => setInstagram(e.target.value)}
        isEdit
      />
      <SubmitBtn type="submit" onClick={onClickSave}>
        저장하기
      </SubmitBtn>
    </TeamForm>
  );
};

const TeamForm = styled.div`
  flex: 1;
  display: flex;
  background-color: #222222;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-bottom: 50px;
`;

const SubmitBtn = styled.button`
  width: 150px;
  height: 45px;
  color: white;
  background-color: #2d7295;
  border: none;
  font-size: 16px;
  margin: 30px 0 20px;
  &:hover {
    opacity: 0.5;
    transition: 0.25s;
    cursor: pointer;
  }
`;

export default TeamAdd;

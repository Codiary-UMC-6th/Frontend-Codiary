import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { post, patch } from "../../common/api";
import TeamAddUi from "./teamAddUi";
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

  // const validation = () => {
  //   if(!name || !email || !intro){

  //   }
  // }
  const onClickSave = async () => {
    try {
      const result = await post("/teams", addData);
      console.log("POST 요청 결과:", result);
      setTeamId(result);
      navigate("/team");
    } catch (error) {
      console.error("POST 요청 실패:", error);
    }
  };
  const onClickEdit = async () => {
    try {
      const result = await patch(`/teams/profile/${teamId}`, addData);
      console.log("PATCH 요청 결과:", result);
      navigate("/team");
    } catch (error) {
      console.error("PATCH 요청 실패:", error);
    }
  };
  return (
    <TeamAddUi
      onChangeName={(e) => setName(e.target.value)}
      onChangeEmail={(e) => setEmail(e.target.value)}
      onChangeIntro={(e) => setIntro(e.target.value)}
      onChangeGithub={(e) => setGithub(e.target.value)}
      onChangeDiscord={(e) => setDiscord(e.target.value)}
      onChangeLinked={(e) => setLinked(e.target.value)}
      onChangeInstagram={(e) => setInstagram(e.target.value)}
      onClickSave={onClickSave}
      onClickEdit={onClickEdit}
      isEdit={isEdit}
    />
  );
};

export default TeamAdd;

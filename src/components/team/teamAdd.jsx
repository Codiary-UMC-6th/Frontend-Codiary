import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { post, get } from "../../common/api";
import TeamAddUi from "./teamAddUi";
const TeamAdd = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [info, setInfo] = useState("");
  const [github, setGithub] = useState("");
  const [discord, setDiscord] = useState("");
  const [linked, setLinked] = useState("");
  const [instagram, setInstagram] = useState("");

  const location = useLocation();
  const { isEdit } = location.state || false;
  console.log(isEdit);
  const teamData = {
    name: "string",
    profilePhoto: "string",
    bannerphoto: "string",
    intro: "introducion",
    github: "string",
    email: "string@naver.com",
    linkedIn: "string",
    discord: "string",
    instagram: "string",
  };

  const url = "http://43.202.229.89:8080/teams";
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      //토큰 관련 추가 예정
      //'Authorization': `Bearer ${token}`
    },
  };

  const onClickSave = async () => {
    // try {
    //   const result = await post("/teams", teamData);
    //   console.log("POST 요청 결과:", result);
    //   navigate("/team");
    // } catch (error) {
    //   console.error("POST 요청 실패:", error);
    // }
    try {
      const response = await fetch(url, options);
      console.log(response.json());
    } catch (error) {
      console.log(error);
    }
  };
  const onClickEdit = async () => {
    try {
      const result = await post("/teams", teamData);
      console.log("POST 요청 결과:", result);
      navigate("/team");
    } catch (error) {
      console.error("POST 요청 실패:", error);
    }
  };
  return (
    <TeamAddUi
      onChangeName={(e) => setName(e.target.value)}
      onChangeEmail={(e) => setEmail(e.target.value)}
      onChangeInfo={(e) => setInfo(e.target.value)}
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

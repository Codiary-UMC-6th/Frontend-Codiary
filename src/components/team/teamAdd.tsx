import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import * as Color from "@/common/Color";

import { post, patch } from "../../common/api";
import styled from "styled-components";
import { AddTeamData } from "@/shared/api/team/type";
import { postTeam } from "@/shared/api/team";
import SignUpTitle from "../signup/component/SignUpTitle";
import { SignUpInputContainer } from "../signup/component/SignUpInputContainer";
import { SocialInputContainer } from "../signup/component/SocialInputContainer";
import { SignUpBtnBox } from "../signup/component/SignUpBtnBox";


const TeamAdd = () => {

  const navigate = useNavigate();

  const [addTeamFormData, setAddTeamFormData] = useState<AddTeamData>({
    name: "",
    // admin_mail: "",
    intro: "",
    github: "",
    linked_in: "",
    discord: "",
    instagram: ""
  });

  const [errors, setErrors] = useState({
    name: "",
    // admin_mail: "",
    intro: "",
  })

  const [isNameChecked, setIsNameChecked] = useState<boolean>(true);

  const handleChange = (name: string, value: string, error?: string) => {
    setAddTeamFormData({
      ...addTeamFormData,
      [name]: value,
    });
    setErrors({
      ...errors,
      [name]: error,
    });

    // 중복확인 - 이름이 변경되었을 시 초기화
    if (name === "name") {
      // setIsNameChecked(false);
    }
  }

  // Team add api
  const handleTeamAdd = async () => {
    try {
      if (Object.values(errors).some((error) => error)) {
        console.error("폼 형식이 알맞지 않습니다.");
        return;
      } else if (!isNameChecked) {
        alert("팀 이름 중복 확인이 필요합니다.");
        return;
      }
      const response = await postTeam(addTeamFormData);
      console.log("팀 추가 성공", response);
      alert("팀 추가 성공");
      navigate(`/team/${response.team_id}`);
    } catch (error) {
      console.log(error);
    }
  }

  const [isDisabled, setIsDisabled] = useState(true);

  useEffect(() => {
    const hasErrors = Object.values(errors).some((error) => error);
    const requiredFields: Array<keyof AddTeamData> = [
      "name",
      // "administratorEmail",
      "intro",
    ];
    const hasEmptyFields = requiredFields.some(
      (field) => !addTeamFormData[field]
    );
    const disable = hasErrors || hasEmptyFields;
    setIsDisabled(disable);
  }, [addTeamFormData, errors]);


  // const navigate = useNavigate();
  // const [name, setName] = useState("");
  // const [email, setEmail] = useState("");
  // const [intro, setIntro] = useState("");
  // const [github, setGithub] = useState("");
  // const [discord, setDiscord] = useState("");
  // const [linked, setLinked] = useState("");
  // const [instagram, setInstagram] = useState("");

  // const [teamId, setTeamId] = useState("6");

  // const location = useLocation();
  // const { isEdit } = location.state || false;

  // const addData = {
  //   name: name,
  //   intro: intro,
  //   github: github,
  //   email: email,
  //   linkedIn: linked,
  //   discord: discord,
  //   instagram: instagram,
  // };

  // const onClickSave = async () => {
  //   try {
  //     const response = await post("/teams", addData);
  //     const teamId = response.result.teamId;
  //     console.log(teamId);
  //     navigate(`/team/${teamId}`);
  //   } catch (error) {
  //     console.error("POST 요청 실패:", error);
  //   }
  // };

  return (
    <St.SignUpWrapper>
      <SignUpTitle>팀 정보</SignUpTitle>
      <St.SignUpContainerWrapper>
        <SignUpInputContainer
          props={{
            title: "팀 이름",
            essential: Boolean(true),
            type: "text",
            placeholder: "Team Name",
            isButtonHidden: Boolean(false),
            onChange: (value, error) => handleChange("name", value, error),
            onCheckDuplicate: () => setIsNameChecked(true),
          }}
        />
        {/* <SignUpInputContainer
          props={{
            title: "관리자메일",
            essential: Boolean(true),
            type: "text",
            placeholder: "usermail@codiary.com",
            isButtonHidden: Boolean(true),
            onChange: (value, error) => handleChange("administratorEmail", value, error),
          }}
        /> */}
        <SignUpInputContainer
          props={{
            title: "팀 소개",
            essential: Boolean(true),
            type: "text",
            placeholder: "소개글",
            isButtonHidden: Boolean(true),
            onChange: (value, error) => handleChange("intro", value, error),
          }}
        />
      </St.SignUpContainerWrapper>
      <SocialInputContainer
        props={{
          handleChange: handleChange,
        }}
      />
      <SignUpBtnBox
        props={{
          onSubmit: handleTeamAdd,
          isDisabled: isDisabled,
          title: "저장하기",
        }}
      />      
    </St.SignUpWrapper>
    // <TeamForm>
    //   <TeamAddUi
    //     onChangeName={(e: any) => setName(e.target.value)}
    //     onChangeEmail={(e: any) => setEmail(e.target.value)}
    //     onChangeIntro={(e: any) => setIntro(e.target.value)}
    //     onChangeGithub={(e: any) => setGithub(e.target.value)}
    //     onChangeDiscord={(e: any) => setDiscord(e.target.value)}
    //     onChangeLinked={(e: any) => setLinked(e.target.value)}
    //     onChangeInstagram={(e: any) => setInstagram(e.target.value)}
    //     isEdit
    //   />
    //   <SubmitBtn type="submit" onClick={onClickSave}>
    //     저장하기
    //   </SubmitBtn>
    // </TeamForm>
  );
};

const St = {
  SignUpWrapper: styled.div`
    width: 100%;
    height: 100%;
    position: flex;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: ${Color.background};
    padding-bottom: 126px;
  `,

  SignUpContainerWrapper: styled.div`
    display: flex;
    align-items: center;
    margin-top: 48px;
    flex-direction: column;
  `,
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

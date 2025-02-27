import React, { useEffect, useState } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import styled from "styled-components";
import { getTeamInfo, putTeamProfile } from "@/shared/api/team";
import * as Color from "@/common/Color";
import SignUpTitle from "../signup/component/SignUpTitle";
import { SignUpInputContainer } from "../signup/component/SignUpInputContainer";
import { SocialInputContainer } from "../signup/component/SocialInputContainer";
import { SignUpBtnBox } from "../signup/component/SignUpBtnBox";

const TeamEdit = () => {
  const { teamId } = useParams();
  const navigate = useNavigate();
  
  const [teamProfileFromData, setTeamProfileFromData] = useState({
    "name": '',
    "email": '',
    "intro": '',
    "github": '',
    "linked_in": '',
    "discord": '',
    "instagram": '',
  });

  const getTeamInfoData = async () => {
    try {
      const userData = await getTeamInfo(teamId);
      setTeamProfileFromData({
        name: userData.name,
        email: userData.email,
        intro: userData.intro || '',
        github: userData.github || '',
        linked_in: userData.linked_in || '',
        discord: userData.discord || '',
        instagram: userData.instagram || '',
      });
      console.log(teamProfileFromData);
    } catch (error) {
      console.error(error);
    }
  }

  const [changeFormData, setChangeFormData] = useState({
    "name": teamProfileFromData.name,
    "email": teamProfileFromData.email,
    "intro": teamProfileFromData.intro,
    "github": teamProfileFromData.github,
    "linked_in": teamProfileFromData.linked_in,
    "discord": teamProfileFromData.discord,
    "instagram": teamProfileFromData.instagram,
  });

  useEffect(() => {
    if (teamId) {
      getTeamInfoData();
    }
  }, [teamId]);

  // 에러 체크
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    intro: '',
  });

  const handleChange = (name: string, value: string, error: string | undefined) => {
    setTeamProfileFromData({
      ...teamProfileFromData,
      [name]: value,
    });
    
    setErrors({
      ...errors,
      [name]: error,
    });

    setChangeFormData({
      ...teamProfileFromData,
      [name]: value,
    });
  };

  const putTeamProfileData = async () => {
    try {
      if (Object.values(errors).some(error => error)) {
        console.error('폼 형식이 알맞지 않습니다.');
        return;
      }

      const formattedData = {
        ...changeFormData
      }

      const response = await putTeamProfile(teamId, formattedData);
      alert(response.message);
      console.log('팀프로필 수정 성공', changeFormData);
      navigate(-1);
    } catch (error) {
      console.error('팀프로필 수정 실패', error);
      console.log(changeFormData);
    }
  }

  return (
    <St.SignUpWrapper>
      <SignUpTitle>팀 정보</SignUpTitle>
      <St.SignUpContainerWrapper>
        <SignUpInputContainer
          props={{
            title: "팀 이름",
            essential: Boolean(true),
            placeholder: "Team Name",
            value: teamProfileFromData.name,
            onChange: (value, error) => handleChange('name', value, error),
            isButtonHidden: Boolean(true),
            type: "text",
          }}
        />
        <SignUpInputContainer
          props={{
            title: "관리자메일",
            essential: Boolean(true),
            placeholder: "usermail@codiary.com",
            value: teamProfileFromData.email,
            onChange: (value, error) => handleChange('email', value, error),
            isButtonHidden: Boolean(true),
            type: "text",
          }}
        />
        <SignUpInputContainer
          props={{
            title: "팀 소개",
            essential: Boolean(true),
            type: "text",
            value: teamProfileFromData.intro,
            placeholder: "팀 소개",
            isButtonHidden: Boolean(true),
            onChange: (value, error) => handleChange("intro", value, error),
          }}
        />
      </St.SignUpContainerWrapper>
      <SocialInputContainer
        props={{
          handleChange: handleChange,
          github: teamProfileFromData.github,
          linkedIn: teamProfileFromData.linked_in,
          discord: teamProfileFromData.discord
        }}
      />
      <SignUpBtnBox
        props={{
          onSubmit: putTeamProfileData,
          isDisabled: false,
          title: "저장하기",
        }}
      />      
    </St.SignUpWrapper>
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

export default TeamEdit;

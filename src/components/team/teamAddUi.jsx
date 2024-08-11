import React, { useState, useEffect } from "react";
import styled from "styled-components";
import TeamInput from "./commons/teamInput";
import { Link } from "react-router-dom";

const TeamAddUi = (props) => {
  return (
    <TeamForm>
      <Title>팀 정보</Title>
      <TeamContainer>
        <Text>팀 이름</Text>
        <TeamInput
          placeholder={'input name = "team name"'}
          onChange={props.onChangeName}
        />
        <CheckBtn>중복 확인</CheckBtn>
        {!props.isEdit && (
          <>
            <Text>관리자 메일</Text>
            <TeamInput
              placeholder={'input email = "manager email"'}
              onChange={props.onChangeEmail}
            />
            <p />
          </>
        )}
        <Text>팀 소개</Text>
        <TeamInput
          placeholder={'input info = "team information'}
          onChange={props.onChangeIntro}
        />
        <p />
        <Text>소셜 계정</Text>
        <SocialDiv>
          <SocialImg src={`${process.env.PUBLIC_URL}/team_images/github.png`} />
          <TeamInput
            placeholder={'input github = "team github"'}
            width="280px"
            onChange={props.onChangeGithub}
          />
        </SocialDiv>
        <p />
        <p />
        <SocialDiv>
          <SocialImg
            src={`${process.env.PUBLIC_URL}/team_images/discord.png`}
            onChange={props.onChangeDiscord}
          />
          <TeamInput
            placeholder={'input discord = "team discord"'}
            width="280px"
          />
        </SocialDiv>
        <p />
        <p />
        <SocialDiv>
          <SocialImg
            src={`${process.env.PUBLIC_URL}/team_images/linked.png`}
            onChange={props.onChangeLinked}
          />
          <TeamInput
            placeholder={'input linkedin = "team linkedin"'}
            width="280px"
          />
        </SocialDiv>
        <p />
        <p />
        <SocialDiv>
          <SocialImg
            src={`${process.env.PUBLIC_URL}/team_images/instagram.png`}
          />
          <TeamInput
            placeholder={'input instagram = "team instagram"'}
            width="280px"
            onChange={props.onChangeInstagram}
          />
        </SocialDiv>
        <p />
      </TeamContainer>
      {props.isEdit ? (
        <SubmitBtn type="submit" onClick={props.onClickEdit}>
          수정하기
        </SubmitBtn>
      ) : (
        <SubmitBtn type="submit" onClick={props.onClickSave}>
          저장하기
        </SubmitBtn>
      )}
      <Link
        to="/team"
        style={{
          textDecorationColor: "#888888",
          color: "#888888",
          fontSize: "14px",
        }}
      >
        뒤로가기
      </Link>
    </TeamForm>
  );
};

export default TeamAddUi;

const TeamForm = styled.div`
  flex: 1;
  display: flex;
  background-color: #222222;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-bottom: 50px;
`;

const TeamContainer = styled.form`
  width: 600px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(7, 1fr);
  gap: 20px 5px;
`;

const Title = styled.p`
  color: white;
  font-size: 22px;
  margin: 40px;
`;

const Text = styled.p`
  color: white;
  font-size: 16px;
`;

const CheckBtn = styled.button`
  width: 100px;
  height: 45px;
  margin-left: 20px;
  padding: 0;
  border-radius: 10px;
  background-color: transparent;
  border: 2px solid #e19e58;
  color: #e19e58;
  box-sizing: border-box;

  &:hover {
    opacity: 0.5;
    transition: 0.25s;
    cursor: pointer;
  }
`;

const SocialDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const SocialImg = styled.img`
  width: 28px;
  height: 28px;
  margin-left: 15px;
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

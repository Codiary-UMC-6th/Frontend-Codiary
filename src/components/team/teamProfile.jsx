import styled from "styled-components";
import React, { useState, useEffect } from "react";
import TeamMember from "./teamMember";
import { useNavigate } from "react-router-dom";
const TeamProfile = ({ isManager }) => {
  const [teamName, setTeamName] = useState("");
  const [teamUrl, setTeamUrl] = useState([]);
  const [teamDescription, setTeamDescription] = useState("");
  const [teamImage, setTeamImage] = useState("");

  const isEdit = true;
  const navigate = useNavigate();

  useEffect(() => {
    setTeamName("Team Name");
    setTeamDescription("Team Description");
    setTeamUrl(["", "", "", ""]);
    setTeamImage(`${process.env.PUBLIC_URL}/team_images/profile.png`);
  }, []);

  const onClickEdit = () => {
    navigate("/teamAdd", { state: { isEdit } });
  };

  const onClickMake = () => {
    navigate("/teamAdd");
  };

  return (
    <Container>
      {/* Name Container */}
      <NameContainer>
        <NameText>
          {teamName}
          <UrlContainer>
            <UrlImg src={`${process.env.PUBLIC_URL}/team_images/github.png`} />
            <UrlImg src={`${process.env.PUBLIC_URL}/team_images/discord.png`} />
            <UrlImg src={`${process.env.PUBLIC_URL}/team_images/linked.png`} />
            <UrlImg
              src={`${process.env.PUBLIC_URL}/team_images/instagram.png`}
            />
          </UrlContainer>
        </NameText>
        {isManager && (
          <>
            <ProfileEditBtn onClick={onClickEdit}>프로필 수정</ProfileEditBtn>
            <ProfileEditBtn onClick={onClickMake}>팀 생성</ProfileEditBtn>
          </>
        )}
      </NameContainer>

      {/* Introduce Container */}
      <IntroduceContainer>
        <IntroduceLeft>
          <IntroduceTitle>팀 소개</IntroduceTitle>
          <InfoContainer>
            <TeamImage src={teamImage} />
            {teamDescription}
          </InfoContainer>
        </IntroduceLeft>
        <IntroduceRight>
          <TeamMember isManager={isManager} />
        </IntroduceRight>
      </IntroduceContainer>
    </Container>
  );
};

export default TeamProfile;

const Container = styled.div`
  width: 80vw;
`;

const NameContainer = styled.div`
  width: 50%;
`;

const NameText = styled.div`
  display: flex;
  margin-top: 20px;
  color: #e19e58;
  font-size: 40px;
  align-items: center;
`;

const UrlContainer = styled.div`
  width: 30%;
  display: flex;
  justify-content: space-between;
  padding: 0 10%;
`;

const UrlImg = styled.img`
  width: 26px;
  height: 26px;
`;

const ProfileEditBtn = styled.button`
  background-color: #222222;
  border: 2px solid #999999;
  border-radius: 10px;
  color: #999999;
  padding: 8px;
  font-size: 16px;
  margin-top: 20px;
  &:hover {
    opacity: 0.5;
    transition: 0.5s;
    cursor: pointer;
  }
`;

const IntroduceContainer = styled.div`
  width: 100%;
  display: flex;
  margin-top: 30px;
`;

const IntroduceTitle = styled.div`
  color: white;
  font-size: 30px;
`;

const IntroduceLeft = styled.div`
  width: 60%;
`;

const InfoContainer = styled.div`
  display: flex;
  align-items: center;
  margin: 25px 0;
  color: white;
`;

const TeamImage = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  margin-right: 20px;
`;

const IntroduceRight = styled.div`
  width: 40%;
`;

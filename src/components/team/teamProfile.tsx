import styled from "styled-components";
import * as Color from '../../common/Color';

import { useState, useEffect } from "react";
import TeamMember from "./teamMember";
import { useNavigate, useParams } from "react-router-dom";
import { get } from "../../common/api";
import { teamMember, teamProfile } from "@/shared/api/team/type";
import TeamFollowBtn from "./TeamFollowBtn";

type Propstype = {
  props: {
    isManager: boolean;
    teamProfileData: teamProfile | undefined;
    teamMemberList: teamMember[] | undefined;
  }
}

const TeamProfile = ({ props }: Propstype) => {
  const [teamName, setTeamName] = useState("Team Name");
  const [teamUrl, setTeamUrl] = useState([]);
  const [teamDescription, setTeamDescription] = useState("Team Introduce");
  const [teamImage, setTeamImage] = useState(
    `${process.env.PUBLIC_URL}/team_images/profile.png`
  );

  const isEdit = true;
  // const { teamId } = useParams();

  const [isManager, setIsManager] = useState<boolean>(false);

  const navigate = useNavigate();

  const onClickEdit = () => {
    navigate(
      `/teamEdit/${props.teamProfileData?.team_id}`,
      { state: { teamInfo: props.teamProfileData } }
    );
  };

  return (
    <Container>
      {/* Name Container */}
      <NameContainer>
        <NameText>
          {props.teamProfileData?.name}
          <UrlContainer>
            <UrlImg src={`${process.env.PUBLIC_URL}/team_images/github.png`} />
            <UrlImg src={`${process.env.PUBLIC_URL}/team_images/discord.png`} />
            <UrlImg src={`${process.env.PUBLIC_URL}/team_images/linked.png`} />
            <UrlImg
              src={`${process.env.PUBLIC_URL}/team_images/instagram.png`}
            />
          </UrlContainer>
        </NameText>
        {props.isManager ? 
            <ProfileEditBtn onClick={onClickEdit}>프로필 수정</ProfileEditBtn>
            :
            <TeamFollowBtn teamId={props.teamProfileData?.team_id} />
        }
      </NameContainer>

      {/* Introduce Container */}
      <IntroduceContainer>
        <IntroduceLeft>
          <IntroduceTitle>팀 소개</IntroduceTitle>
          <InfoContainer>
            {/* <TeamImage src={teamImage} /> */}
            <ImageBox diameter={134}/>
            <Bio>
              {props.teamProfileData?.intro}
            </Bio>
          </InfoContainer>
        </IntroduceLeft>
        <IntroduceRight>
          <TeamMember  
            props={{
              isManager: props.isManager, 
              teamProfileData: props.teamProfileData,
              teamMemberList: props.teamMemberList,
            }} 
            />
        </IntroduceRight>
      </IntroduceContainer>
      <BorderBox />
    </Container>
  );
};

export default TeamProfile;


export const ImageBox = styled.div<{ diameter: number }>`
  background-color: ${Color.backgroundBlur};
  width: ${({ diameter }) => diameter}px;
  height: ${({ diameter }) => diameter}px;
  border-radius : 140px;
  position: relative;
`

const BorderBox = styled.div`
  border-bottom: 1px solid ${Color.gray500};
  height: 32px;
  margin-bottom: 34px;
`

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
  font-size: 42px;
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
  padding: 8px 16px;
  font-size: 18px;
  margin: 20px 0;
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

const Bio = styled.div`
  background-color : ${Color.backgroundBlur};
  height: 102px;
  width: 488px;

  padding: 16px;
  margin-left: 26px;

  color : ${Color.text3};
  font-family: Pretendard;
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
  line-height: 32px;
  letter-spacing: -0.06px;
`

const IntroduceRight = styled.div`
  width: 40%;
`;

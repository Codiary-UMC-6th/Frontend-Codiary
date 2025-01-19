import styled from "styled-components";
import { useState, useEffect } from "react";
import TeamMember from "./teamMember";
import { useNavigate, useParams } from "react-router-dom";
import { get } from "../../common/api";

interface TeamData {
  team_id: 0;
  name: "string";
  intro: "string";
  admin_mail: "string";
  profile_image_url: "string";
  banner_image_url: "string";
  github: "string";
  email: "string";
  linked_in: "string";
  discord: "string";
  instagram: "string";
}

const TeamProfile = (props: any) => {
  const [teamName, setTeamName] = useState("Team Name");
  const [teamUrl, setTeamUrl] = useState([]);
  const [teamDescription, setTeamDescription] = useState("Team Introduce");
  const [teamImage, setTeamImage] = useState(
    `${process.env.PUBLIC_URL}/team_images/profile.png`
  );

  const isEdit = true;
  const { teamId } = useParams();
  const [teamData, setTeamData] = useState<TeamData | null>(null);

  const [isManager, setIsManager] = useState(true);

  useEffect(() => {
    const fetchTeamData = async () => {
      try {
        const response = await get(`api/v2/teams/${teamId}`);
        setTeamData(response.result);
        console.log(response.result);
      } catch (error) {
        console.error("Error fetching team data:", error);
      }
    };
    fetchTeamData();
  }, []);
  const navigate = useNavigate();

  const onClickEdit = () => {
    navigate(`/teamEdit/${teamId}`, { state: { isEdit } });
  };

  return (
    <Container>
      {/* Name Container */}
      <NameContainer>
        <NameText>
          {teamData?.name}
          <UrlContainer>
            <UrlImg src={`${process.env.PUBLIC_URL}/team_images/github.png`} />
            <UrlImg src={`${process.env.PUBLIC_URL}/team_images/discord.png`} />
            <UrlImg src={`${process.env.PUBLIC_URL}/team_images/linked.png`} />
            <UrlImg
              src={`${process.env.PUBLIC_URL}/team_images/instagram.png`}
            />
          </UrlContainer>
        </NameText>
        {props.isManager && (
          <>
            <ProfileEditBtn onClick={onClickEdit}>프로필 수정</ProfileEditBtn>
          </>
        )}
      </NameContainer>

      {/* Introduce Container */}
      <IntroduceContainer>
        <IntroduceLeft>
          <IntroduceTitle>팀 소개</IntroduceTitle>
          <InfoContainer>
            <TeamImage src={teamImage} />
            {teamData?.intro}
          </InfoContainer>
        </IntroduceLeft>
        <IntroduceRight>
          <TeamMember isManager={props.isManager} />
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
  font-size: 36px;
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

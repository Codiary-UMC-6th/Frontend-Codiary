import styled from "styled-components";
import TeamInput from "./commons/teamInput";

interface TeamAddUiProps {
  onChangeName: (value: string) => void;
  onChangeEmail: (value: string) => void;
  onChangeIntro: (value: string) => void;
  onChangeGithub: (value: string) => void;
  onChangeDiscord: (value: string) => void;
  onChangeLinked: (value: string) => void;
  onChangeInstagram: (value: string) => void;
  isEdit: boolean;
}

const TeamAddUi = (props: TeamAddUiProps) => {
  return (
    <div>
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
          />

          <TeamInput
            placeholder={'input discord = "team discord"'}
            width="280px"
            onChange={props.onChangeDiscord}
          />
        </SocialDiv>
        <p />
        <p />
        <SocialDiv>
          <SocialImg src={`${process.env.PUBLIC_URL}/team_images/linked.png`} />
          <TeamInput
            placeholder={'input linkedin = "team linkedin"'}
            width="280px"
            onChange={props.onChangeLinked}
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
    </div>
  );
};

export default TeamAddUi;

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
  text-align: center;
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

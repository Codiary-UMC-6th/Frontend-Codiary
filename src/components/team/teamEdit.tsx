import { useState } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { patch } from "../../common/api";
import TeamAddUi from "./teamAddUi";
import styled from "styled-components";
import { Link } from "react-router-dom";
const TeamEdit = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [intro, setIntro] = useState("");
  const [github, setGithub] = useState("");
  const [discord, setDiscord] = useState("");
  const [linked, setLinked] = useState("");
  const [instagram, setInstagram] = useState("");

  const { teamId } = useParams();

  const location = useLocation();
  const { isEdit } = location.state || false;

  const editData = {
    name: name,
    intro: intro,
    github: github,
    linkedIn: linked,
    discord: discord,
    instagram: instagram,
  };

  const onClickEdit = async () => {
    try {
      const result = await patch(`/teams/profile/${teamId}`, editData);
      console.log("PATCH 요청 결과:", result);
      navigate(`/team/${teamId}`);
    } catch (error) {
      console.error("PATCH 요청 실패:", error);
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
        isEdit={isEdit}
      />
      <SubmitBtn type="submit" onClick={onClickEdit}>
        수정하기
      </SubmitBtn>

      <Link
        to={`/team/${teamId}`}
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
  margin-bottom: 20px;
  &:hover {
    opacity: 0.5;
    transition: 0.25s;
    cursor: pointer;
  }
`;

export default TeamEdit;

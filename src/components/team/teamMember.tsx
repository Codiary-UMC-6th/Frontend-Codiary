import styled from "styled-components";
import { useState, useEffect } from "react";
import { get } from "../../common/api";
import MemberAdd from "./memberAdd";
import { useParams } from "react-router-dom";

interface Member {
  team_member_id: Number;
  team_member_role: string;
  team_member_position: string;
  member: MemberInfo;
}

interface MemberInfo {
  user_id: Number;
  user_name: string;
  photo_url: string;
}

type Members = Member[];

const TeamMember = ({ isManager }: { isManager: boolean }) => {
  const [memberIndex, setMemberIndex] = useState(0);
  const [isPop, setIsPop] = useState(false);
  const [memberData, setMemberData] = useState<Members>([]);
  const { teamId } = useParams();
  useEffect(() => {
    const getTeamInfo = async () => {
      try {
        const result = await get(`/teams/${teamId}`);
        setMemberData(result?.result.team_member_list);
        console.log(result?.result.team_member_list);
      } catch (error) {
        console.log("Error fetching team info:", error);
      }
    };
    getTeamInfo();
  }, [isPop]);

  const nextMember = () => {
    if (memberIndex + 3 < memberData.length) {
      setMemberIndex(memberIndex + 3);
    }
  };

  const previousMember = () => {
    if (memberIndex - 3 >= 0) {
      setMemberIndex(memberIndex - 3);
    }
  };

  const togglePop = () => {
    setIsPop(!isPop);
  };
  return (
    <Container>
      {isPop && <MemberAdd isPop={isPop} onClose={togglePop} />}
      <Title>
        구성원
        {isManager && (
          <AddBtn onClick={togglePop}>
            <img
              src={`${process.env.PUBLIC_URL}/team_images/member.png`}
              style={{ marginLeft: "20px" }}
            />
          </AddBtn>
        )}
      </Title>
      <MemberContainer>
        {memberIndex > 0 ? (
          <NavigationButton
            onClick={previousMember}
            src={`${process.env.PUBLIC_URL}/team_images/next.png`}
            alt="Previous"
            style={{ transform: "rotate(180deg)" }}
          />
        ) : (
          <EmptyNavigationButton />
        )}

        {memberData.slice(memberIndex, memberIndex + 3).map((el, index) => (
          <MemberCard key={index}>
            <MemberImage
              src={
                el.member.photo_url
                  ? el.member.photo_url
                  : "https://codiary.s3.ap-northeast-2.amazonaws.com/files/61fa6597-b41f-4943-a589-8fa8a44e0148"
              }
              alt={el.member.user_name}
            />
            <MemberName>{el.member.user_name}</MemberName>
            <MemberRole>
              {el.team_member_role === "ADMIN"
                ? el.team_member_role
                : el.team_member_position}
            </MemberRole>
          </MemberCard>
        ))}

        {memberIndex + 3 < memberData.length ? (
          <NavigationButton
            onClick={nextMember}
            src={`${process.env.PUBLIC_URL}/team_images/next.png`}
            alt="Next"
          />
        ) : (
          <EmptyNavigationButton />
        )}
      </MemberContainer>
    </Container>
  );
};

export default TeamMember;

const Container = styled.div`
  width: 100%;
`;

const Title = styled.div`
  color: white;
  font-size: 30px;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
`;

const AddBtn = styled.div`
  &:hover {
    opacity: 0.5;
    transition: 0.5s;
    cursor: pointer;
  }
`;

const MemberContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
`;

const NavigationButton = styled.img`
  width: 30px;
  height: 30px;
  margin: 15px;
  &:hover {
    opacity: 0.5;
    transition: 0.5s;
    cursor: pointer;
  }
`;

const EmptyNavigationButton = styled.div`
  width: 30px;
  height: 30px;
  margin: 15px;
`;

const MemberCard = styled.div`
  margin: 15px;
  text-align: center;
`;

const MemberImage = styled.img`
  width: 60px;
  height: 60px;
  border-radius: 50%;
`;

const MemberName = styled.div`
  margin: 10px 0;
  color: #888888;
`;

const MemberRole = styled.div`
  color: #888888;
`;

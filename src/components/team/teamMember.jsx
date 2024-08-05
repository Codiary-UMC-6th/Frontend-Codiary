import styled from "styled-components";
import React, { useState, useEffect } from "react";
import { memberData } from "../../pages/teamDataEx";

const TeamMember = ({ isManager }) => {
  const [memberIndex, setMemberIndex] = useState(0);

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

  return (
    <Container>
      <Title>
        구성원
        {isManager && (
          <AddBtn>
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

        {memberData.slice(memberIndex, memberIndex + 3).map((el) => (
          <MemberCard key={el.id}>
            <MemberImage src={el.profileImg} alt={el.userName} />
            <MemberName>{el.userName}</MemberName>
            <MemberRole>{el.role}</MemberRole>
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
  cursor: pointer;
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
  cursor: pointer;
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

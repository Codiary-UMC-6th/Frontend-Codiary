import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { get, post } from "../../common/api";

const MemberAdd = ({ isPop, onClose }) => {
  if (!isPop) return null;
  else {
    const getFollowing = async () => {
      const result = await get("/members/following");
      console.log(result.result);
    };
    getFollowing();
  }
  const memberData = {
    teamId: 0,
    memberId: 0,
    memberRole: "MEMBER",
  };

  return (
    <Container>
      <CloseBtn
        onClick={onClose}
        src={`${process.env.PUBLIC_URL}/team_images/close.png`}
      />
      <MemberContainer>
        <p>구성원 관리</p>
        <SearchContainer>
          <img src={`${process.env.PUBLIC_URL}/team_images/search.png`} />
          <MemberInput placeholder="추가하려는 사용자를 검색하세요" />
        </SearchContainer>
      </MemberContainer>
    </Container>
  );
};

const Container = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 400px;
  height: 400px;
  padding: 20px;
  background-color: #434343;
  z-index: 1000;
`;

const CloseBtn = styled.img`
  margin-left: 95%;
  &:hover {
    cursor: pointer;
    opacity: 0.5;
    transition: 0.5s;
  }
`;

const MemberContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  color: white;
  font-size: 20px;
  align-items: center;
`;

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid white;
  border-radius: 10px;
  padding: 10px 10px 7.5px;
  width: 70%;
`;

const MemberInput = styled.input`
  background-color: transparent;
  width: 100%;
  border: none;
  outline: none;
  color: white;
  font-size: 14px;
`;
export default MemberAdd;

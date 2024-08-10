import React, { useState } from "react";
import styled from "styled-components";

const MemberAdd = ({ isPop, onClose }) => {
  if (!isPop) return null;
  return (
    <Container>
      <CloseBtn
        onClick={onClose}
        src={`${process.env.PUBLIC_URL}/team_images/close.png`}
      />
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

export default MemberAdd;

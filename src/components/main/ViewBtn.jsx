import React, { useState } from "react";
import styled from "styled-components";

const Container = styled.div`
  padding-left: 30px;
  display: flex;
  margin: 0px 130px 28px 130px;
`;

const Btn = styled.button`
  background: none;
  border: none;
  color: ${(props) => (props.active ? "#FFFFFF" : "#999999")};
  text-decoration: none;
  padding-right: 60px;
  cursor: pointer;

  font-family: Pretendard;
  font-size: 32px;
  font-weight: 600;
  line-height: 48px;
`;

const ViewBtn = (props) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleBtnClick = (index) => {
    setActiveIndex(index);
  };

  return (
    <Container>
      <Btn
        active={(activeIndex === 0) ? 'active' : ''}
        onClick={() => {
          handleBtnClick(0);
          props.onClickPopular();
        }}
      >
        인기글
      </Btn>
      <Btn
        active={(activeIndex === 1) ? 'active' : ''}
        onClick={() => {
          handleBtnClick(1);
          props.onClickLatest();
        }}
      >
        최신글
      </Btn>
      <Btn active={(activeIndex === 2) ? 'active' : ''} onClick={() => handleBtnClick(2)}>
        팔로잉
      </Btn>
    </Container>
  );
};

export default ViewBtn;

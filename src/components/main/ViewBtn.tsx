import React, { useState } from "react";
import styled from "styled-components";

type ViewBtnProps = {
  onClickPopular: () => void;
  onClickLatest: () => void;
}

type BtnProps = {
  active: boolean;
}

const ViewBtn = (props: ViewBtnProps) => {
  const [activeIndex, setActiveIndex] = useState<number>(0);

  const handleBtnClick = (index: number) => {
    setActiveIndex(index);
  };

  return (
    <Container>
      <Btn
        active={activeIndex == 0}
        onClick={() => {
          handleBtnClick(0);
          props.onClickPopular();
        }}
      >
        인기글
      </Btn>
      <Btn
        active={activeIndex == 1}
        onClick={() => {
          handleBtnClick(1);
          props.onClickLatest();
        }}
      >
        최신글
      </Btn>
      <Btn
        active={activeIndex == 2}
        onClick={() => handleBtnClick(2)}
      >
        팔로잉
      </Btn>
    </Container>
  );
};

export default ViewBtn;

const Container = styled.div`
  padding-left: 30px;
  display: flex;
  margin: 0px 130px 28px 130px;
`;

const Btn = styled.button<BtnProps>`
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

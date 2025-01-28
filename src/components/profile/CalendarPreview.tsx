import React from "react";
import { styled } from "styled-components";

import * as Color from "../../common/Color";

const CanlendarPreview: React.FC = () => {
  const now = new Date();
  const currentMonth = now.getMonth() + 1;
  const currentYear = now.getFullYear();
  const daysInMonth = new Date(currentYear, currentMonth, 0).getDate();

  const dayArray = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  return (
    <Container>
      <Title>{currentMonth.toString().padStart(2, "0")}월의 기록</Title>
      <Content>
        {Array.from(
          { length: Math.ceil(dayArray.length / 7) },
          (_, weekIdx) => (
            <WeekBox key={weekIdx}>
              {dayArray.slice(weekIdx * 7, (weekIdx + 1) * 7).map((day) => (
                <Box key={day}></Box>
              ))}
            </WeekBox>
          )
        )}
        <Text>이번달 0개의 기록 작성</Text>
        <WeekBox></WeekBox>
      </Content>
    </Container>
  );
};

const Container = styled.div`
  width: 380px;
  height: 341px;
  border: 1px solid ${Color.gray500};
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Title = styled.div`
  margin-top: 40px;
  color: ${Color.text1};
  font-family: Pretendard;
  font-size: 22px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  width: 380px;
  height: 275px;
  padding: 32px 0px 0px 32px;
`;

const WeekBox = styled.div`
  display: flex;
  width: 100%;
`;

const Box = styled.div`
  width: 28px;
  height: 28px;
  border-radius: 6px;
  background-color: ${Color.gray300};
  margin: 0px 20px 20px 0px;
`;

const Text = styled.div`
  color: ${Color.gray500};
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 22px;
  position: absolute;
  margin-top: 195px;
  margin-left: 180px;
`;

export default CanlendarPreview;

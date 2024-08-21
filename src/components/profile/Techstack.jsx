import styled from "styled-components";
import * as Color from "../../common/Color";

import { Head, Infotype, Content, Add } from "./BottomStyle";
import PlusSvg from "../../assets/profile/ph_plus.svg";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 380px;
  min-height: 150px;
  border-color: #ffffff;
  border-width: 0px 1px 0px 0px;
  border-style: solid;
`;

const TechStackItem = styled.div`
  color: ${Color.primary_yellow};
  border: 1px solid ${Color.primary_yellow};
  border-radius: 20px;
  padding: 8px 16px;
  margin-bottom: 8px;
  font-size: 16px;
`;

const TechStackWrapper = styled.div`
  width: 100%;
  margin-top: 20px;
  padding: 0 16px;
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
`;

const Techstack = (props) => {
  const { techStackList, onClick } = props;

  return (
    <Container>
      <Head onClick={onClick}>
        <Infotype>TECH STACK</Infotype>
        <Add src={PlusSvg} />
      </Head>
      {techStackList && techStackList.length > 0 ? (
        <TechStackWrapper>
          {techStackList.map((stack, index) => (
            <TechStackItem key={index}>{stack}</TechStackItem>
          ))}
        </TechStackWrapper>
      ) : (
        <Content>기술 스택을 등록해주세요</Content>
      )}
    </Container>
  );
};

export default Techstack;

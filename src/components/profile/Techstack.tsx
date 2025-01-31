import styled from "styled-components";
import * as Color from "../../common/Color";

import { Head, Infotype, Content, Add } from "./BottomStyle";
import PlusSvg from "../../assets/profile/ph_plus.svg";

interface props {
  techstackList: string[];
  onClick: any;
  my_page: boolean;
}
const Techstack = (props: props) => {
  const { techstackList, onClick } = props;

  return (
    <Container>
      <Head onClick={onClick}>
        <Infotype>TECH STACK</Infotype>
        {props.my_page ? <Add src={PlusSvg} /> : <></>}
      </Head>
      {techstackList && techstackList.length > 0 ? (
        <TechStackWrapper>
          {techstackList.map((stack, index) => (
            <TechStackItem key={index}>{stack}</TechStackItem>
          ))}
        </TechStackWrapper>
      ) : (
        <Content>등록된 기술 스택이 없습니다</Content>
      )}
    </Container>
  );
};

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
  border-radius: 30px;
  padding: 0px 16px;
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

export default Techstack;

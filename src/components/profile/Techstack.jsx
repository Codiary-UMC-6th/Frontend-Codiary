import styled from "styled-components";

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

const Techstack = (props) => {
  const OpenModal = () => {
    console.log("Techstack Plus Clicked");
  };

  return (
    <Container>
      <Head>
        <Infotype>TECH STACK</Infotype>
        <Add onClick={props.onClick} src={PlusSvg}></Add>
      </Head>
      <Content>기술 스택을 등록해주세요</Content>
    </Container>
  );
};

export default Techstack;

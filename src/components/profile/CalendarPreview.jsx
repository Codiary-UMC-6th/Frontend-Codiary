import { useState } from "react";
import { styled } from "styled-components";

import * as Color from "../../common/Color";

const CanlendarPreview = () => {
    const [ days, setDays ] = useState(Array.from({ length: 31 }, (_, i) => i + 1));
    console.log("days", days);

    return (
        <Container>
            <Title>08월의 기록</Title>
            <Content>
                <WeekBox><Box/><Box/><Box/><Box/><Box/><Box/><Box/></WeekBox>
                <WeekBox><Box/><Box/><Box/><Box/><Box/><Box/><Box/></WeekBox>
                <WeekBox><Box/><Box/><Box/><Box/><Box/><Box/><Box/></WeekBox>
                <WeekBox><Box/><Box/><Box/><Box/><Box/><Box/><Box/></WeekBox>
                <WeekBox><Box/><Box/><Box/><Text>이번달 0개의 기록 작성</Text></WeekBox>
            </Content>
        </Container>
    );
}

const Container = styled.div`
    width: 380px;
    height: 341px;
    border: 1px solid ${Color.gray500};
    border-radius: 20px;
    display: flex;
    flex-direction: column;
    justify-cotent: center;
`

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
`

const Content = styled.div`
    display: flex;
    flex-direction : column;
    padding: 32px 0px 0px 32px;
`

const WeekBox = styled.div`
    display: flex;
    width: 100%;
`

const Box = styled.div`
    width: 28px;
    height: 28px;
    border-radius: 6px;
    background-color: ${Color.gray300};
    margin: 0px 20px 20px 0px;
`

const Text = styled.div`
    Color: ${Color.gray500};
    font-family: Pretendard;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 22px;
`

export default CanlendarPreview;
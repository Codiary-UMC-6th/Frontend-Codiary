import styled from "styled-components";
import * as Color from '../../common/Color';

import DefaultIMG from '../../assets/diary_default_img.png';
import ProfileDefulat from '../../assets/user_profile_default.svg';

const Container = styled.div`
    display : flex;
`

const Img = styled.img`
    width: 321px;
    height: 180px;
    border-radius : 5;
    margin : 0px 24px 0px 0px;
`

const Title = styled.div`
    color : ${Color.text1};
    font-family: Pretendard;
    font-size: 24px;
    font-style: normal;
    font-weight: 500;
    line-height: 36px;
`

const Content = styled.div`
    color : ${Color.text1};
    font-family: Pretendard;
    font-size: 24px;
    font-style: normal;
    font-weight: 500;
    line-height: 36px;
    
    margin : 0px 0px 24px 0px;
`

const Writer = styled.div`
    display : flex;
`

const WriterImg = styled.img`
    margin : 0px 16px 0px 0px;
`

const WriterName = styled.div`
    color : ${Color.text1};
    font-family: Pretendard;
    font-size: 20px;
    font-style: normal;
    font-weight: 400;
    line-height: 32px; /* 160% */
    letter-spacing: -0.06px;
`

const Date = styled.div`
    margin : 24px 0px 0px 0px;

    color:${Color.text5};
    font-family: Pretendard;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 24px;
`

const Diary = () => {
    return (
        <Container>
            <div>
                <Img src={DefaultIMG}></Img>
            </div>
            <div>
                <Title>제목</Title>
                <Content>내용</Content>
                <Writer>
                    <WriterImg src={ProfileDefulat}></WriterImg>
                    <WriterName>Writer</WriterName>
                </Writer>
                <Date>YYYY.MM.DD</Date>
            </div>
        </Container>
    );
}

export default Diary;
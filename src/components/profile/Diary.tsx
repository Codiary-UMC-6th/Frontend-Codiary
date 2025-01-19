import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import * as Color from '../../common/Color';

import DefaultIMG from '../../assets/diary_default_img.png';
import ProfileDefulat from '../../assets/user_profile_default.svg';
import { diary } from "@/shared/api/profile/type";

interface diaryProps {
  diary: diary;
}

const Diary = (props: diaryProps) => {
  const createYear = props.diary.created_at.slice(0, 4);
  const createMonth = props.diary.created_at.slice(5, 7);
  const createDate = props.diary.created_at.slice(8, 10);
  const createdAt = createYear + "." + createMonth + "." + createDate;

  const navigate = useNavigate();

  const handleDiaryClick = () => {
    navigate(`/DiaryDetails/${props.diary.post_id}`, { state: props.diary });
    window.scrollTo(0, 0);
    window.location.reload();
  }

  const makeDetailsPreview = (content: string) => {
    return content.replace(/<[^>]*>/g, '').slice(0, 35) + "...";
  }

  return (
    <Container onClick={handleDiaryClick}>
      <div>
        <Img src={props.diary.thumbnail_image_url}></Img>
      </div>
      <TextArea>
        <Title>{props.diary.post_title}</Title>
        <Content>{makeDetailsPreview(props.diary.post_body)}</Content>
        <Writer>
          <WriterImg src={ProfileDefulat}></WriterImg>
          <WriterName>{props.diary.author_nickname}</WriterName>
        </Writer>
        <Date>{createdAt}</Date>
      </TextArea>
    </Container>
  );
}

const Container = styled.div`
    display : flex;
    width: 100%;
    margin : 0px 0px 64px 0px;
    cursor : pointer;
    border : 1px solid ${Color.background};
    border-radius : 5px;
    &:hover {
        border : 1px solid ${Color.divider}
    }
`

const Img = styled.img`
    width: 321px;
    height: 180px;
    border-radius : 5px;
    object-fit: cover;
    background-color: ${Color.divider};
`

const Title = styled.div`
    color : ${Color.text1};
    font-family: Pretendard;
    font-size: 24px;
    font-style: normal;
    font-weight: 500;
    line-height: 36px;

    flex-shrink: 0;
    align-self: stretch;
`

const Content = styled.div`
    flex-shrink: 0;
    align-self: stretch;
    
    color: ${Color.text1};
    font-family: Pretendard;
    font-size: 24px;
    font-style: normal;
    font-weight: 500;
    line-height: 36px;
    margin : 0px 0px 24px 0px;
    overflow: hidden;
    text-overflow: ellipsis;
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

const TextArea = styled.div`
  width: 311px;
  padding: 0px 24px;
`


export default Diary;
import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import * as Color from "../../common/Color";
import { SmallProfileImg } from "../diaryDetails/ProfileImg";
import DiaryDefaultImg from "../../assets/diary_default_img.png";

type CardProps = {
  props: {
    postId: number;
    title: string;
    thumbnailImageUrl?: string;
    createAt: string;
    authorId: number;
    author: string;
    details: string;
  };
};

function Card({ props }: CardProps) {
  const navigate = useNavigate();

  const onClickPostDetails = () => {
    navigate(`/DiaryDetails/${props.postId}`, { state: props });
    window.scrollTo(0, 0);
    window.location.reload();
  };

  const makeDetailsPreview = (content: string) => {
    return content.replace(/<[^>]*>/g, "");
  };

  return (
    <CardBox onClick={onClickPostDetails}>
      <Img
        src={
          props.thumbnailImageUrl ? props.thumbnailImageUrl : DiaryDefaultImg
        }
      />
      <TextWrapper>
        <Title>{props.title}</Title>
        <Author>
          <SmallProfileImg memberId={props.authorId} />
          <AuthorName>{props.author}</AuthorName>
        </Author>
        <Details>
          {props.details
            ? makeDetailsPreview(props.details)
            : "내용이 없습니다."}
        </Details>
      </TextWrapper>
    </CardBox>
  );
}

export default Card;

const CardBox = styled.div`
  display: flex;
  width: 360px;
  height: 468px;
  flex-direction: column;
  align-items: flex-start;
  flex-shrink: 0;
`;

const Img = styled.img`
  width: 360px;
  height: 202px;
  background-color: rgb(200, 200, 200);
  object-fit: cover;
  border-radius: 10px 10px 0px 0px;
`;

const TextWrapper = styled.div`
  display: flex;
  padding: 16px;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 16px;
  align-self: stretch;
  background-color: ${Color.background3};
  border-radius: 0px 0px 10px 10px;
`;

const Title = styled.div`
  color: ${Color.text1};

  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;

  font-family: Pretendard;
  font-size: 24px;
  font-style: normal;
  font-weight: 500;
  line-height: 36px;
`;

const Author = styled.div`
  display: flex;
  align-items: center;
`;

const AuthorImg = styled.img`
  width: 30px;
  height: 30px;
  border-radius: 15px;
  background-color: rgb(200, 200, 200);
  margin-right: 16px;
`;

const AuthorName = styled.div`
  color: ${Color.text1};

  font-family: Pretendard;
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
  line-height: 32px;
`;

const Details = styled.span`
  width: 328px;
  height: 100px;

  overflow: hidden;
  color: ${Color.text5};
  text-align: justify;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
  white-space: normal;

  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 24px;
`;

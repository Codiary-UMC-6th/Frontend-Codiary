import React, {useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import * as Color from '../../common/Color';
import { SmallProfileImg } from '../diaryDetails/ProfileImg';
import DiaryDefaultImg from '../../assets/diary_default_img.png';
import UserProfileDefault from '../../assets/user_profile_default.svg';

interface PostType {
    author: string;
    author_image_url: string;
    body: string;
    created_at: string;
    id: number;
    team_banner_image_url?: string;
    team_profile_image_url?: string;
    thumbnail_image_url?: string;
    title: string;
    updated_at: string;
}
  
interface CardProps {
    post: PostType;
}

function Card({ post }: CardProps) {
    const postId = post.id;
    const postTitle = post.title;
    const postBody = post.body;
    const authorImageUrl = post.author_image_url;
    const author = post.author;
    const teamBannerImage_url = post.team_banner_image_url;
    const teamProfileImageUrl = post.team_profile_image_url;
    const thumbnailImageUrl = post.thumbnail_image_url;
    const createdAt = post.created_at;
    const updatedAt = post.updated_at;

    const navigate = useNavigate();

    const onClickPostDetails = () => {
        navigate(`/DiaryDetails/${postId}`, { state: post });
        window.scrollTo(0, 0);
        window.location.reload();
    }

    const makeDetailsPreview = (content: string) => {
        return content.replace(/<[^>]*>/g, '');
    }

    useEffect(() => {
        console.log(post.author_image_url);
    })

    return (
        <CardBox onClick={onClickPostDetails}>
            <Img src={thumbnailImageUrl?thumbnailImageUrl:DiaryDefaultImg}/>
            <TextWrapper>
                <Title>{postTitle}</Title>
                <Author>
                    {
                        (authorImageUrl!=="")
                        ?
                        <AuthorImg src={authorImageUrl}></AuthorImg>
                        :
                        <AuthorDefault type="image/svg+xml" data={UserProfileDefault}></AuthorDefault>
                    }
                    <AuthorName>{author}</AuthorName>
                </Author>
                <Details>{postBody ? makeDetailsPreview(postBody) : "내용이 없습니다."}</Details>
            </TextWrapper>
        </CardBox>
    );

    //<SmallProfileImg authorImageUrl={authorImageUrl} />
};

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

const AuthorDefault = styled.object`
    margin-right: 16px;
`

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
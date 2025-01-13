import React, { useState, useEffect } from "react";
import { useLocation } from 'react-router-dom';
import styled from "styled-components";

import * as Color from '../common/Color';
import { get } from '../common/api';
import { formatDateTime } from "../components/diaryDetails/comments/formatDate";
import { ReactComponent as Scrap } from "../assets/symbols_scrap.svg";
import { ReactComponent as CommentIcon } from "../assets/symbols_comment.svg";

import KebabModal from "../components/diaryDetails/KebabModal";
import FAB from "../components/diaryDetails/FAB";
import CategoryChip from "../components/diaryDetails/CategoryChip";
import ProfileCard from "../components/diaryDetails/ProfileCard";
import Comments from "../components/diaryDetails/comments/Comments";
import CommentInput from "../components/diaryDetails/comments/CommentInput";
import OtherCards from "../components/diaryDetails/OtherCards";

const Example = () => {
    const { state } = useLocation();
    const [memberId, setMemberId] = useState(null);
    const [bookmarkCount, setBookmarkCount] = useState(0);
    const [totalComments, setTotalComments] = useState(0);
    const [content, setContent] = useState();
    const [commentsData, setCommentsData] = useState([]);
    const [category, setCategory] = useState('');
    const [post, setPost] = useState();
    const [loading, setLoading] = useState(true);
    const [coauthorIds, setCoauthorIds] = useState([]);
    
    /*
    const getPost = async () => {
        try {
            const result = await get(`/posts/${state.postId}`);
            //console.log("다이어리 조회 성공: ", result);
            setPost(result.result);
            setCategory(result.result.postCategory);
            setLoading(false);
        } catch (error) {
            console.error("다이어리 조회 실패: ", error);
            setLoading(false);
        }
    }

    const getMemberId = async () => {
        try {
            const result = await get("/members/info");
            //console.log("사용자 정보 조회 성공: ", result);
            setMemberId(result.result.memberId);
        } catch (error) {
            console.error("사용자 정보 조회 실패:", error);
        }
    };

    const getBookmarkCount = async () => {
        try {
            const result = await get(`/bookmarks/count/${state.postId}`);
            //console.log("북마크 개수 조회 결과:", result);
            setBookmarkCount(result.result.countBookmark);
        } catch (error) {
            console.error("북마크 개수 조회 실패:", error);
        }
    };

    const getCommentsCount = async () => {
        try {
            const result = await get(`/comments/count/${state.postId}`);
            console.log("댓글 개수 조회 결과:", result);
            setTotalComments(result.result.countComments);
        } catch (error) {
            console.error("댓글 개수 조회 실패:", error);
        }
    };

    const getCommentsData = async () => {
        try {
            const result = await get(`/posts/comments/list/${state.postId}`);
            //console.log("댓글 조회 성공: ", result);
            setCommentsData(result.result);
        } catch (error) {
            console.error("댓글 조회 실패: ", error);
        }
    }
  
    useEffect(() => {
        getPost();
        getMemberId();
        getCommentsCount();
        getCommentsData();
        getBookmarkCount();

        console.log("state", state);
        setContent(state.details);
    }, []);

    useEffect(() => {
        if (post) {
            setCoauthorIds(post.coauthorIds);
        }
    }, [post]);


    const stringModifyForImg = (content) => {
        const regex = /<img\s+id="(\w+)">/g;
        var string = content;
        var i = 0;
        string = string.replace(regex, function(match) {
            const replacedString = match.replace(/<img/, `<img class="postImg" src=${state.postFileList[i].url}`);
            i += 1;
            console.log("replacedString", replacedString);
            return replacedString;
        });

        return string;
    }

    if (loading || !post) {
        return null;
    }
    */

    return (
        <Container>
            <FAB postId={999} memberId={memberId} />
            <CenterBox>
                <Title>{"코드블록을 사용한 다이어리 예시"}</Title>
                <CategoryChip postId={999} category={["category"]} />
                <DiaryInfo>
                    <NameBox>
                        <UserName>{"Song"}</UserName>
                        <Details>
                            <Scrap />
                            <ScrapCount>{bookmarkCount}</ScrapCount>
                            <CommentIcon />
                            <CommentCount>{totalComments}</CommentCount>
                            <KebabModal memberId={memberId} authorId={99} />
                        </Details>
                    </NameBox>
                    <PostInfo>최초 등록일 {"2024년 10월 4일"}</PostInfo>
                </DiaryInfo>
                
                {/*
                <Text dangerouslySetInnerHTML={{ __html: stringModifyForImg(state.details) }}></Text>
                <CodeBox>
                    <Code>{state.details}</Code>
                </CodeBox>
                */}

                <Text>
                    <h2>1. 코드 샌드박스 Code Sandbox</h2>
                    <div>이 글은 코드블록이 어떻게 나타나는지 확인하기 위한 <span style={{color: Color.primary_blue}}><b>예시 다이어리</b></span>입니다.</div>
                    <div> <span style={{color: Color.primary_blue}}><b><a href="https://codesandbox.io/">코드 샌드박스</a></b></span>의 Embed 기능을 사용하여 코드 블록과 실행 결과를 보여주는 iframe을 웹 페이지에 가져올 수 있습니다.</div>
                    <br></br>
                    <br></br>

                    <h2>2. 코드블록 예시</h2>
                    <h3>-Python</h3>
                    <Iframe src="https://codesandbox.io/p/devbox/hrck8l?embed=1&file=%2Fmain.py"
                        title="python-example"
                        allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
                        sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
                    ></Iframe>
                    
                    <h3>-React</h3>
                    <Iframe src="https://codesandbox.io/embed/5n72yf?view=editor+%2B+preview&module=%2Fsrc%2FApp.js"
                        title="react-example"
                        allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
                        sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
                    ></Iframe>

                </Text>

                <ProfileCard authorId={99} author={"Song"} memberId={memberId} />
                {coauthorIds ? 
                (coauthorIds.map((data) => (
                    <ProfileCard authorId={data} author={''} />
                )))
                : <></>}
                <CommentTitle>{totalComments}개의 댓글</CommentTitle>
                <CommentInput postId={999} memberId={memberId} />
                {commentsData.map((data) => (
                    <Comments comment={data} postId={0} memberId={memberId} />
                ))}
            </CenterBox>
            <OtherCards postId={999} />
        </Container>
    );

}

const Iframe = styled.iframe`
    width:100%; 
    height: 700px; 
    border: 0; 
    border-radius: 4px; 
    overflow: hidden;
`

const Container = styled.div`
    background-color : ${Color.background};

    display: flex;
    flex-direction: column;
    align-items: center;
`;

const CenterBox = styled.div`
    width: 780px;
`;

const Title = styled.div`
    color: ${Color.text1};
    display: flex;
    width: 780px;
    margin-top: 52px;
    margin-bottom: 48px;

    font-family: Pretendard;
    font-size: 42px;
    font-style: normal;
    font-weight: 600;
    line-height: 50px;
`;

const DiaryInfo = styled.div`
    border-bottom: 1px solid ${Color.divider};
    margin-bottom: 80px;
`;

const NameBox = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 16px;
`;

const UserName = styled.div`
    color: ${Color.text1};
    text-align: justify;

    font-family: Pretendard;
    font-size: 20px;
    font-style: normal;
    font-weight: 400;
    line-height: 32px;
    letter-spacing: -0.06px;
`;

const Details = styled.div`
    display: flex;
    align-items: center;
`;

const ScrapCount = styled.div`
    color: ${Color.primary_yellow};
    text-align: justify;
    font-family: Pretendard;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 12px;
    margin-left: 6px;
    margin-right: 24px;
`;

const CommentCount = styled.div`
    color: ${Color.primary_red};
    text-align: justify;
    font-family: Pretendard;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 12px;
    margin-left: 6px;
    margin-right: 24px;
`;

const PostInfo = styled.div`
    color: ${Color.text5};
    text-align: justify;
    margin-bottom: 25px;

    font-family: Pretendard;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 22px;
`;

const Subtitle = styled.div`
    color: ${Color.text1};
    text-align: justify;
    margin-bottom: 16px;

    font-family: Pretendard;
    font-size: 32px;
    font-style: normal;
    font-weight: 600;
    line-height: 48px;
`;

const Text = styled.div`
    color: ${Color.text1};
    text-align: justify;
    margin-bottom: 130px;

    font-family: Pretendard;
    font-size: 20px;
    font-style: normal;
    font-weight: 400;
    line-height: 32px;
    letter-spacing: -0.06px;
`;

const CodeBox = styled.div`
    display: flex;
    width: 732px;
    height: 70px;
    padding: 24px;
    align-items: center;

    border: 1px solid ${Color.divider};
    background: ${Color.background3};
`;

const CommentTitle = styled.div`
    color: ${Color.text1};

    font-family: Pretendard;
    font-size: 20px;
    font-style: normal;
    font-weight: 500;
    line-height: 32px;
`;

const Code = styled.div`
    width: 732px;
    color: ${Color.primary_blue};

    font-family: D2Coding;
    font-size: 18px;
    font-style: normal;
    font-weight: 400;
    line-height: 22px;
    letter-spacing: -0.09px;
`;


export default Example;
import React, { useState, useEffect } from 'react';
import * as Color from "../../common/Color";
import styled from "styled-components";

import { post, del, get } from '../../common/api';
import { Button } from './FAB';
import { ReactComponent as BookmarkIcon } from "../../assets/icon_bookmark.svg";
import { ReactComponent as FilledBookmarkIcon } from "../../assets/icon_bookmark_fill.svg";


const StyledFilledBookmarkIcon = styled(FilledBookmarkIcon)`
    &:hover {
        path {
            fill: ${Color.primary_red};
        }
    }
`;

const StyledBookmarkIcon = styled(BookmarkIcon)`
    &:hover {
        path {
            fill: ${Color.primary_red};
        }
    }
`;

const BookmarkBtn = ({ postId, memberId }) => {
    const [isBookmarked, setIsBookmarked] = useState(false);
    const [bookmarkId, setBookmarkId] = useState();

    async function postBookmark() {
        const endpoint = `/bookmarks/add/${memberId}/${postId}`;
        const data = {
            bookmarkId: null,
            memberId: memberId,
            postId: postId,
            createAt: new Date().toISOString()
        };

        try {
            const result = await post(endpoint, data);
            console.log("북마크 추가 결과:", result);
            setBookmarkId(result.result.bookmarkId);
            setIsBookmarked(true);
        } catch (error) {
            console.error("북마크 추가 실패:", error);
        }

    }

    async function deleteBookmark() {
        const endpoint = `/bookmarks/delete/${bookmarkId}`;
        
        try {
            const result = await del(endpoint);
            console.log("북마크 삭제 결과:", result);
            setBookmarkId(null);
            setIsBookmarked(false);
        } catch (error) {
            console.error("북마크 삭제 실패:", error);
        }
    }

    async function getBookmark() {
        const endpoint = `/members/bookmarks/list/${memberId}?page=1`;

        try {
            const result = await get(endpoint);
            console.log("북마크 게시글 리스트 가져옴 : ", result);
            
            totalPage = result.result.totalPage;
        } catch (error) {
            console.error("북마크 게시글 리스트 조회 실패: ", error);
        }

    }

    let totalPage;
    async function findBookmark() {

        for(let i = 1; i <= totalPage; i++) {
            const endpoint = `/members/bookmarks/list/${memberId}?page=${i}`;

            const result = await get(endpoint);
            console.log("findBookmark 성공 : ", result);

            for (let j = 0; j < 9; j++ ) {
                if (result.result.bookmarkList[j].memberId == memberId && result.result.bookmarkList[j].postId == postId) {
                    console.log("찾았음");
                    setIsBookmarked(true);
                    setBookmarkId(result.result.bookmarkList[j].bookmarkId);
                    break;
                } 
            }

            if (isBookmarked) {
                break;
            }
        }

        if (!isBookmarked) {
            console.log("북마크 못찾음");
        }
    }

    //컴포넌트가 마운트될 때 북마크 상태를 가져옴
    useEffect(() => {
        const getAndFindData = async () => {
            try {
                await getBookmark();
                await findBookmark();
            } catch (error) {
                console.error(error);
            }
        }
        getAndFindData();

    }, [memberId, postId]);

    const handleBookmark = () => {

        if (isBookmarked) {
            deleteBookmark();
        } else {
            postBookmark();
        }

    };

    return(<>
        <Button onClick={handleBookmark}>
            {isBookmarked ? <StyledFilledBookmarkIcon /> : <StyledBookmarkIcon />}
        </Button>
    </>);
}

export default BookmarkBtn;
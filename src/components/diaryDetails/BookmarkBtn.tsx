import React, { useState, useEffect } from 'react';
import * as Color from "../../common/Color";
import styled from "styled-components";

import { Button } from './FAB';
import BookmarkIcon from "../../assets/diaryDetail/icon_bookmark.svg";
import FilledBookmarkIcon from "../../assets/diaryDetail/icon_bookmark_fill.svg";

import { postBookmark, deleteBookmark } from '@/shared/api/diaryDetail';

interface BookmarkBtnProps {
    postId: number | undefined;
    memberId: number | undefined;
}

const BookmarkBtn = ({ postId, memberId }: BookmarkBtnProps) => {
    const [isBookmarked, setIsBookmarked] = useState<boolean>(false);
    const [bookmarkId, setBookmarkId] = useState<number | undefined>();

    const enableBookmark = async () => {
        const response = await postBookmark(Number(postId));
        console.log(response);
        alert('북마크하였습니다.');
    }

    const diableBookmark = async () => {
        const response = await deleteBookmark(Number(postId));
        console.log(response);
        alert('북마크를 삭제하였습니다.');
    }

    const handleBookmark = () => {
        if (isBookmarked) {
            diableBookmark();
        } else {
            enableBookmark();
        }
        //window.location.reload();
    };

    return(
        <Button onClick={handleBookmark}>
            {isBookmarked ? <img src={FilledBookmarkIcon} alt='filled bookmark icon'/> : <img src={BookmarkIcon} alt='bookmark icon'/> }
        </Button>
    );
}

export default BookmarkBtn;
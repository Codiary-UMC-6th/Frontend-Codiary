import React, { useState, useEffect } from 'react';
import * as Color from "../../common/Color";
import styled from "styled-components";

import { post, del, get } from '../../common/api';
import { Button } from './FAB';
import BookmarkIcon from "../../assets/icon_bookmark.svg";
import FilledBookmarkIcon from "../../assets/icon_bookmark_fill.svg";

interface BookmarkBtnProps {
    postId: number | undefined;
    memberId: number | undefined;
}

const BookmarkBtn = ({ postId, memberId }: BookmarkBtnProps) => {
    const [isBookmarked, setIsBookmarked] = useState<boolean>(false);
    const [bookmarkId, setBookmarkId] = useState<number | undefined>();

    async function enableBookmark() {
    }

    async function diableBookmark() {

    }

    const handleBookmark = () => {
        if (isBookmarked) {
            diableBookmark();
        } else {
            enableBookmark();
        }
        window.location.reload();
    };

    return(
        <Button onClick={handleBookmark}>
            {isBookmarked ? <img src={FilledBookmarkIcon} alt='filled bookmark icon'/> : <img src={BookmarkIcon} alt='bookmark icon'/> }
        </Button>
    );
}

export default BookmarkBtn;
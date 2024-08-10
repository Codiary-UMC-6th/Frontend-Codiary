import React, { useState } from 'react';
import * as Color from "../../common/Color";
import styled from "styled-components";

import { post } from '../../common/api';
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

const BookmarkBtn = ({ memberId, postId }) => {
    const [isBookmarked, setIsBookmarked] = useState(false);

    const handleBookmark = async () => {
        try {
            const endpoint = `/bookmarks/add/${memberId}/${postId}`;
            const body = {
                bookmarkId: null,
                memberId: memberId,
                postId: postId,
                createAt: new Date().toISOString()
            };

            const response = await post(endpoint, body);
            
            if (response.isSuccess) {
                console.log("북마크 추가 결과:", response);
                setIsBookmarked(true);
            } else {
                throw new Error(response.message);
            }
        } catch (error) {
            console.error("북마크 추가 실패:", error);
        }
    };

    return(
        <Button onClick={handleBookmark}>
            {isBookmarked ? <StyledFilledBookmarkIcon /> : <StyledBookmarkIcon />}
        </Button>
    );
}

export default BookmarkBtn;
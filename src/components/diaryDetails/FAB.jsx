import React from "react";
import styled from "styled-components";
import * as Color from "../../common/Color";

import { ReactComponent as SharekIcon } from "../../assets/icon_share.svg";
import BookmarkBtn from "./BookmarkBtn";

const Container = styled.div`
    background: ${Color.primary_blue};
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 80px;
    height: 180px;
    border-radius: 40px;
    gap: 28px;

    position: fixed;
    top: 158px;
    left: 130px;
    z-index: 10;
`;

export const Button = styled.button`
    border: 0;
    background-color: transparent;
    cursor: pointer;
`;

const StyledShareIcon = styled(SharekIcon)`
    &:hover {
        path {
            stroke: ${Color.primary_yellow};
        }
    }
`;

const FAB = ({ postId, memberId }) => {

    return(
        <Container>
            <BookmarkBtn postId={postId} memberId={memberId} />
            <Button>
                <StyledShareIcon />
            </Button>
        </Container>
    );
}

export default FAB;
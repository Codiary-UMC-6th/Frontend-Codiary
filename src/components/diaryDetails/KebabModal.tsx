import React, { useState, useEffect } from "react";
import styled from "styled-components";
import KebabIcon from "../../assets/symbols_kebab.svg";
import * as Color from '../../common/Color';
import { del } from '../../common/api';

const KebabButton = styled.button`
    border: 0;
    background-color: transparent;
    cursor: pointer;
`;

const Button = styled.button`
    border: 0;
    background-color: #434343;
    cursor: pointer;
    height: 40px;
    width: 125px;

    color: ${Color.text1};
    text-align: justify;

    font-family: Pretendard;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 24px;

        &:hover {
        background: #666666;
    }
`;

const Modal = styled.div`
    position: absolute;
    display: flex;
    flex-direction: column;
`

interface Props {
    memberId: number | undefined;
    authorId: number;
    commentId: number;
}


const KebabModal = ({ memberId, authorId, commentId }: Props) => {
    const [showModal, setShowModal] = useState(false);

    const toggleModal = () => {
        setShowModal(pre => !pre);
    }

    const delComment = async () => {
        try {
            const result = await del(`/comments/delete/${commentId}`);
            console.log("댓글 삭제 성공: ", result);
        } catch (error) {
            console.error("댓글 삭제 실패:", error);
        }
        toggleModal();
    }


    return(
        <div>
            <KebabButton onClick={toggleModal}>
                <KebabIcon />
            </KebabButton>
            {showModal && (
                <Modal>
                    {memberId == authorId ?
                        <>
                        <Button onClick={delComment}>삭제하기</Button>
                        <Button onClick={toggleModal} >수정하기</Button>
                        </> :
                        <Button onClick={toggleModal}>신고하기</Button>
                    }
                </Modal>
            )}

        </div>
    )

}

export default KebabModal;
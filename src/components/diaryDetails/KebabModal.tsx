import { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import KebabIcon from "../../assets/symbols_kebab.svg";
import * as Color from '../../common/Color';
import { del } from '../../common/api';

interface Props {
    memberId: number | undefined;
    authorId: number;
    commentId: number;
}

const KebabModal = ({ memberId, authorId, commentId }: Props) => {
    const [showModal, setShowModal] = useState<boolean>(false);
    const modalRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const handleClickOutside = (event: any) => {
            if (modalRef.current && !modalRef.current.contains(event.target)) { setShowModal(false); }
        };
        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);

    const toggleModal = () => {
        setShowModal(pre => !pre);
    }

    return(
        <Container>
            <KebabButton onClick={(e) => {
                e.stopPropagation();
                toggleModal();
            }}>
                <img src={KebabIcon} alt='kebab icon' />
            </KebabButton>
            {showModal && (
                <Modal ref={modalRef}>
                    {memberId === authorId ?
                        <>
                        <Button onClick={() => {}}>삭제하기</Button>
                        <Button onClick={toggleModal}>수정하기</Button>
                        </> :
                        <Button onClick={toggleModal}>신고하기</Button>
                    }
                </Modal>
            )}
        </Container>
    )
}

const Container = styled.div`
    position: relative;
`

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
    right: 0;
    display: flex;
    flex-direction: column;
`

export default KebabModal;
import { useEffect, useRef } from 'react';
import styled from 'styled-components';

import * as Color from "../../common/Color";

import CodeSVG from '../../assets/diaryEditor/code_icon.svg';
import ImageSVG from '../../assets/diaryEditor/image_icon.svg';

import { BlockType } from '@/pages/DiaryEditor';
import { EditorState } from 'draft-js';

interface Props {
    cursorPosition: any;
    selectedIndex: number;
    updateBlock: (index: number, newBlock: BlockType) => void;
    setShowSlashBox: React.Dispatch<React.SetStateAction<boolean>>;
}

const SlashBox = ({ cursorPosition, selectedIndex, updateBlock, setShowSlashBox }: Props) => {
    const slashBoxRef = useRef<HTMLDivElement>(null);
    console.log('cursorPosition', cursorPosition);

    const handleImageClick = () => {
        const newBlock = {
            type: 'image',
            editorState: EditorState.createEmpty(),
        }
        updateBlock(selectedIndex, newBlock);
        setShowSlashBox(false);
    }

    return (
        <Container 
            style={{top: cursorPosition.top + window.scrollY, left: cursorPosition.left + window.scrollX}}
            onMouseDown={(e) => {e.preventDefault()}}
            ref={slashBoxRef}>
            <Option onClick={() => { alert('미구현') }}><Img src={CodeSVG} alt='code icon' />코드 스니펫</Option>
            <Option onClick={handleImageClick}><Img src={ImageSVG} alt='image icon' />이미지</Option>
        </Container>
    );
}

const Container = styled.div`
    position: absolute;
    background-color: ${Color.gray800};

    display: flex;
    flex-direction: column;

    color: ${Color.text1};
    font-size: 18px;
    width: 207px;
    
    justify-content: center;
`

const Option = styled.div`
    padding: 10px 12px;
    display: flex;
    align-items: center;
    
    user-select: none;

    cursor: pointer;
    &:hover {
        background-color: ${Color.gray700};
    }
`

const Img = styled.img`
    margin-right: 16px;
`

export default SlashBox;
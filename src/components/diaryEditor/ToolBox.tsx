import { useRef, useEffect } from 'react';
import styled from 'styled-components';


import * as Color from "../../common/Color";

import { EditorState, RichUtils } from 'draft-js';

import CODE_PNG from '../../assets/diaryEditor/opt_code.png';
import DownSVG from '../../assets/diaryEditor/down.svg';

interface Props {
    selectionRect: DOMRect;
    editorState: EditorState;
    setEditorState: any;
}

const ToolBox = ({ selectionRect, editorState, setEditorState }: Props) => {
    const toolBoxRef = useRef<HTMLDivElement>(null);

    // 도구 상자 위치, 노출 여부 설정
    useEffect(() => {
        if ( toolBoxRef.current === null ) { return }
        const floatingDiv = toolBoxRef.current;

        if ( selectionRect === null ) {
            floatingDiv.style.display = 'none';
        } else if ( selectionRect ) {
            floatingDiv.style.left = `${selectionRect.left + window.scrollX}px`;
            floatingDiv.style.top = `${selectionRect.top + window.scrollY - 48}px`;
            floatingDiv.style.display = 'flex';
        }
    }, [selectionRect]);

    // 에디터 기능
    const handleBoldClick = () => {
        setEditorState(RichUtils.toggleInlineStyle(editorState, 'BOLD'));
    };
    const handleItalicClick = () => {
        setEditorState(RichUtils.toggleInlineStyle(editorState, 'ITALIC'));
    };  
    const handleUnderlineClick = () => {
        setEditorState(RichUtils.toggleInlineStyle(editorState, 'UNDERLINE'));
    };
    const handleStrikethroughClick = () => {
        setEditorState(RichUtils.toggleInlineStyle(editorState, 'STRIKETHROUGH'));
    };

    return (
        <Container 
            ref={toolBoxRef}
            onMouseDown={(e) => {e.preventDefault()}}
        >
            <LeftBtn>텍스트<img style={{marginLeft: '4px'}} src={DownSVG} alt='dropdown icon'/></LeftBtn>
            <MiddleBtn onClick={handleBoldClick} style={{fontWeight: '600'}}>B</MiddleBtn>
            <MiddleBtn onClick={handleItalicClick} style={{fontStyle:'italic', fontFamily: 'Noto Sans'}}>I</MiddleBtn>
            <MiddleBtn onClick={handleUnderlineClick} style={{textDecorationLine: 'underline', }}>U</MiddleBtn>
            <MiddleBtn onClick={handleStrikethroughClick} style={{textDecorationLine: 'line-through'}}>S</MiddleBtn>
            <MiddleBtn onClick={()=> {alert('미구현')}}><img src={CODE_PNG} alt='code'/></MiddleBtn>
            <RightBtn>
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
                <circle cx="9" cy="9" r="9" fill="white"/>
                </svg>
                <img style={{marginLeft: '4px'}} src={DownSVG} alt='dropdown icon'/>
            </RightBtn>
        </Container>
    );
}


const Container = styled.div`
    position: absolute;
    background-color: ${Color.gray800};

    height: 38px;
    display: flex;
    flex-direction: row;

    color: ${Color.text1};
    font-size: 18px;
`

const LeftBtn = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 6px 12px;
    
    margin-right: 8px;
    border-right: 1px solid ${Color.gray500};

    cursor: pointer;
    &:hover {
        background-color: ${Color.gray700};
    }
`

const MiddleBtn = styled.div`
    width: 38px;
    display: flex;
    align-items: center;
    justify-content: center;

    cursor: pointer;
    &:hover {
        background-color: ${Color.gray700};
    }
`

const RightBtn = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 6px 12px;

    margin-left: 8px;
    border-left: 1px solid ${Color.gray500};
    
    cursor: pointer;
    &:hover {
        background-color: ${Color.gray700};
    }
`

export default ToolBox;
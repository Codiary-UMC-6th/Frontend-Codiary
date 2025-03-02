import { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';


import * as Color from "../../common/Color";

import { EditorState, RichUtils } from 'draft-js';

import CodePNG from '../../assets/diaryEditor/opt_code.png';
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

    // Text Color
    const dropdownRef = useRef<HTMLDivElement>(null);
    const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
    const handleClickDropdownOutside = (e:any) => {
        if (
          toolBoxRef.current && !toolBoxRef.current.contains(e.target) &&
          dropdownRef.current && !dropdownRef.current.contains(e.target)
        ) {
          setIsDropdownOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickDropdownOutside);
        return () => {
          document.removeEventListener('mousedown', handleClickDropdownOutside);
        };
    }, []);

    const handleColorClick = (color:string) => {
        console.log('set color:', color);
        setEditorState(RichUtils.toggleInlineStyle(editorState, `COLOR_${color}`));
        setIsDropdownOpen(false);
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
            <MiddleBtn onClick={()=> {alert('미구현')}}><img src={CodePNG} alt='code'/></MiddleBtn>
            <RightBtn onClick={() => {setIsDropdownOpen(prev => !prev)}}>
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
                <circle cx="9" cy="9" r="9" fill="white"/>
                </svg>
                <img style={{marginLeft: '4px'}} src={DownSVG} alt='dropdown icon'/>
            </RightBtn>
            {isDropdownOpen && (
                <RightDropdown ref={dropdownRef}>
                    <ColorOption onClick={() => {handleColorClick(Color.text1)}}><div style={{color: Color.text1}}>A</div><div>White</div></ColorOption>
                    <ColorOption onClick={() => {handleColorClick(Color.primary_blue)}}><div style={{color: Color.primary_blue}}>A</div><div>Blue</div></ColorOption>
                    <ColorOption onClick={() => {handleColorClick(Color.primary_red)}}><div style={{color: Color.primary_red}}>A</div><div>Red</div></ColorOption>
                    <ColorOption onClick={() => {handleColorClick(Color.primary_yellow)}}><div style={{color: Color.primary_yellow}}>A</div><div>Yellow</div></ColorOption>
                    <ColorOption onClick={() => {handleColorClick(Color.secondary_green)}}><div style={{color: Color.secondary_green}}>A</div><div>Green</div></ColorOption>
                    <ColorOption onClick={() => {handleColorClick(Color.secondary_pink)}}><div style={{color: Color.secondary_pink}}>A</div><div>Pink</div></ColorOption>
                </RightDropdown>
            )}
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

const RightDropdown = styled.div`
    position: absolute;
    background-color: ${Color.gray800};
    top: 46px;
    left: 294px;
`
const ColorOption = styled.div`
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 24px;

    display: flex;
    padding: 5px 12px;
    gap: 17px;

    cursor: pointer;
    &:hover {
        background-color: ${Color.gray700};
    }
`

export default ToolBox;
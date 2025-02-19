import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import * as Color from "../common/Color";

import { useEditorStore } from '../store/EditorStore';
import { Editor, EditorState, RichUtils, convertToRaw } from 'draft-js';

import ToolBox from '../components/diaryEditor/ToolBox';

const DiaryEditor: React.FC = () => {
    const navigate = useNavigate();
    const { register, setRegister } = useEditorStore();

    const [title, setTitle] = useState<string>('');
    const [editorState, setEditorState] = useState<EditorState>(EditorState.createEmpty());

    // 에디터 변경시 상태 업데이트
    const handleEditorChange = (state: EditorState) => {
        setEditorState(state);
    };

    // 도구 박스
    const [selectionRect, setSelectionRect] = useState<DOMRect | null>();
    const handleMouseUp = () => {
        const selection = window.getSelection();

        if (selection === null) { 
            setSelectionRect(null);
        } else if (selection.isCollapsed) {
            setSelectionRect(null);
        } else if (selection.rangeCount > 0) {
          const range = selection.getRangeAt(0);
          const rect = range.getBoundingClientRect();
          setSelectionRect(rect); // Store the selection's bounding rect
        }
    };

    // 등록
    // LocalStorage에 저장 후 등록 페이지로 이동
    useEffect(() => {
        if (register) {
            localStorage.setItem('diary-title', title);

            const contentState = editorState.getCurrentContent();
            const rawContent = convertToRaw(contentState);
            localStorage.setItem('diary-content', JSON.stringify(rawContent));
            setRegister(false);
            navigate('/diary/register');
        }
    }, [register])

    return (
        <Container onMouseUp={handleMouseUp}>
            <OptionBtn onClick={() => {}}>출력</OptionBtn>
            <Title 
                value={title}
                onChange={(e) => {setTitle(e.target.value)}}
                placeholder="제목을 입력하세요"
            />
            <HR></HR>
            <EditorContainer>
                <Editor
                    editorState={editorState}
                    onChange={handleEditorChange}
                />
            </EditorContainer>
            
            {selectionRect && <ToolBox selectionRect={selectionRect} editorState={editorState} setEditorState={setEditorState}/>}
        </Container>
    );
  
}

const OptionBtn = styled.button`
    width: 100px;
`

const Container = styled.div`
    display: flex;
    flex-direction: column;
    padding: 60px 330px;
`

const Title = styled.input`
    background: none;
    padding: 10px 0px;
    border-radius: 5px;
    font-size: 42px;
    border: none;
    color: ${Color.text1}
`

const HR = styled.div`
    margin: 16px 0px 30px 0px;
    width: 100%;
    height: 0px;

    border-bottom: 1px solid ${Color.gray500}
`

const EditorContainer = styled.div`
    padding: 10px 0px;
    border-radius: 5px;
    color: ${Color.text1};
    font-size: 20px;

    border: 1px solid ${Color.gray500};
`

export default DiaryEditor;
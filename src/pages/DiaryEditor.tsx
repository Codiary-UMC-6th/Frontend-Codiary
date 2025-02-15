import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import * as Color from "../common/Color";

import { useEditorStore } from '../store/EditorStore';
import { Editor, EditorState } from 'draft-js';

const DiaryEditor: React.FC = () => {
    const navigate = useNavigate();
    const { register, setRegister } = useEditorStore();

    const [title, setTitle] = useState<string>('');
    const [editorState, setEditorState] = useState<EditorState>(EditorState.createEmpty());

    const handleEditorChange = (state: EditorState) => {
        setEditorState(state);
    };

    useEffect(() => {
        if (register) {
            localStorage.setItem('diary-title', title);
            localStorage.setItem('diary-content', editorState.getCurrentContent().getPlainText());
            setRegister(false);
            navigate('/diary/register');
        }
    }, [register])

    return (
        <Container>
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
                    placeholder="여기에 내용을 입력하세요."
                />
            </EditorContainer>
        </Container>
    );
  
}

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
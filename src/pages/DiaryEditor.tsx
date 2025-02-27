import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import * as Color from "../common/Color";

import { useEditorStore } from '../store/EditorStore';
import { Editor, EditorCommand, EditorState, convertToRaw, RawDraftContentState } from 'draft-js';

import ToolBox from '../components/diaryEditor/ToolBox';

//Register 전용 type
interface ContentType {
    type: String;
    raw_content: RawDraftContentState;
}

interface BlockType {
    type: string;
    editorState: EditorState;
}

const styleMap = {
    'COLOR_#FFFFFF': {
        color: '#FFFFFF',
    },
    'COLOR_#2D7295': {
        color: '#2D7295',
    },
    'COLOR_#AE5257': {
        color: '#AE5257',
    },
    'COLOR_#E19E58': {
        color: '#E19E58',
    },
    'COLOR_#83A67B': {
        color: '#83A67B',
    },
    'COLOR_#EAB3CE': {
        color: '#EAB3CE',
    },
};


const DiaryEditor: React.FC = () => {
    const navigate = useNavigate();
    const { register, setRegister } = useEditorStore();

    const [title, setTitle] = useState<string>('');

    // 블록 1개 = 에디터 1개
    // 각 블록별로 editorState를 가짐
    // 모든 블록을 담는 배열
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
    const [blocks, setBlocks] = useState<BlockType[]>([
        {
            type: 'text',
            editorState: EditorState.createEmpty(),
        },
        {
            type: 'text',
            editorState: EditorState.createEmpty(),
        },
        {
            type: 'text',
            editorState: EditorState.createEmpty(),
        },
    ]);

    // 블록 추가
    const addBlockAtIndex = (index: number) => {
        // 추가되는 block이 배열의 index 값을 갖는다.
        const newBlock = {
            type: 'text',
            editorState: EditorState.createEmpty(),
        }
        setBlocks(prevState => {
            const newArray = [...prevState];
            newArray.splice(index, 0, newBlock);
            return newArray;
        })
    }

    // 에디터 변경시 상태 업데이트
    const handleEditorChange = (newState: EditorState, index: number) => {
        setBlocks((prevBlocks) =>
            prevBlocks.map((block, i) =>
                index === i
                    ? { ...block, editorState: newState }
                    : block
            )
        )
    }

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
            setSelectionRect(rect);
        }
    };

    // 도구 박스 전달용
    const setSelectedEditorState = (newState: EditorState) => {
        setBlocks((prevBlocks) =>
            prevBlocks.map((block, i) =>
                selectedIndex === i
                    ? { ...block, editorState: newState }
                    : block
            )
        )
    }

    // 등록
    // LocalStorage에 저장 후 등록 페이지로 이동
    useEffect(() => {
        if (register) {
            localStorage.setItem('diary-title', title);
                        
            const diary_content:ContentType[] = [];
            blocks.forEach((block) => {
                if (block.type === 'text') {
                    const contentState = block.editorState.getCurrentContent();
                    const rawContent = convertToRaw(contentState);
                    diary_content.push({
                        type: 'text',
                        raw_content: rawContent,
                    });
                }
            })
            localStorage.setItem('diary-content', JSON.stringify(diary_content));
            setRegister(false);
            navigate('/diary/register');
        }
    }, [register])

    return (
        <Container
            onMouseUp={handleMouseUp}
        >
            <OptionBtn onClick={() => { }}>출력</OptionBtn>
            <OptionBtn onClick={() => { addBlockAtIndex(0) }}>Add 0</OptionBtn>
            <OptionBtn onClick={() => { addBlockAtIndex(1) }}>Add 1</OptionBtn>
            <OptionBtn onClick={() => { addBlockAtIndex(2) }}>Add 2</OptionBtn>
            <Title
                value={title}
                onChange={(e) => { setTitle(e.target.value) }}
                placeholder="제목을 입력하세요"
            />
            <HR></HR>
            {
                blocks.map((block, index) => {
                    if (block.type === 'text') {
                        return (
                            <EditorContainer>
                                <Editor
                                    editorState={block.editorState}
                                    onChange={(state: EditorState) => { handleEditorChange(state, index); }}
                                    onFocus={() => { setSelectedIndex(index); console.log("selected index: ", index) }}
                                    customStyleMap={styleMap}
                                />

                            </EditorContainer>
                        );
                    } else {
                        return <></>
                    }
                })
            }
            <OptionBtn onClick={() => { addBlockAtIndex(blocks.length) }}>Add Last</OptionBtn>
            {selectionRect && (selectedIndex !== null) && <ToolBox selectionRect={selectionRect} editorState={blocks[selectedIndex].editorState} setEditorState={setSelectedEditorState} />}
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
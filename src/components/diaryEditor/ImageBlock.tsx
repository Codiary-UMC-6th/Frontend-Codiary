import { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';

import { useFileStore } from '@/store/FileStore';

const ImageBlock = () => {
    const fileInputRef = useRef<HTMLInputElement>(null);

    const [previewURL, setPreviewURL ] = useState<string>();

    const { addFiles } = useFileStore();

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files
        if (files) {
            addFiles(Array.from(files));
            setPreviewURL(URL.createObjectURL(files[0]));
        }
    }

    return (
        <Container >
            <input style={{visibility:'hidden'}} ref={fileInputRef} type="file"  onChange={handleFileChange} />
            <Preview src={previewURL} alt={`preview`} />
            <Btn onClick={() => { fileInputRef?.current?.click(); }}>클릭하여 탐색기 열기</Btn>
        </Container>
    );
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
    
    align-items: center;
    justify-content: center;
`

const Preview = styled.img`
    max-width: 600px;
    cursor: pointer;
    &:hover {
        opacity: 0.7;
    }
    object-fit: none;
`

const Btn = styled.button`
    width: 300px;
`

export default ImageBlock;
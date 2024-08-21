import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { get } from "../../common/api";

const Container = styled.div`
    display: flex;
    width: 780px;
    align-items: center;
    align-content: center;
    gap: 16px;
    flex-wrap: wrap;
    margin-bottom: 48px;
`;

const Category = styled.div`
    display: flex;
    padding: 4px 12px;
    justify-content: center;
    align-items: center;
    gap: 10px;

    border-radius: 8px;
    border: 1px solid #225373;

    color: #2D7295;
    text-align: justify;

    font-family: Pretendard;
    font-size: 20px;
    font-style: normal;
    font-weight: 400;
    line-height: 32px;
    letter-spacing: -0.06px;
`;

function CategoryChip({ postId }) {
    const [categoryList, setCategoryList] = useState();
    const [category, setCategory] = useState('');
    
    const getPost = async () => {
        try {
            const result = await get(`/posts/${postId}`);
            //console.log("다이어리 조회 성공: ", result);
            setCategory(result.result.postCategory);
        } catch (error) {
            console.error("다이어리 조회 실패: ", error);
        }
    }

    const getCategoryList = async () => {
        setCategoryList(category.split(', '));
    }

    useEffect(() => {
        getPost();
    }, [])

    useEffect(() => {
        getCategoryList();
    }, [category])

    return (
        <Container>
            {category && 
            categoryList.map((data) => (
                <Category>{data}</Category>
            ))}
        </Container>
    );

}

export default CategoryChip;
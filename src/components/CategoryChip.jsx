import React from "react";
import * as Color from '../common/Color';
import styled from "styled-components";

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

function CategoryChip(props) {
    const categoryList = ["카테고리", "카테고리2222", "카테", "카테고리", "아아아아아아아아아", "으아아ㅏ아아아", "으아앙아ㅏ아ㅏ아"];

    return (
        <Container>
            {categoryList.map((data) => (
                <Category>{data}</Category>
            ))}
        </Container>
    );

}

export default CategoryChip;
import React from 'react';
import styled from 'styled-components';
import * as Color from '../common/Color';

const Container = styled.div`
    padding-left: 30px;
    display: flex;
    margin: 0px 130px 64px 130px;

`;

const Btn = styled.div`
    background: #AE5257;
    border: none;
    color: ${Color.text1};
    padding: 8px 32px 8px 32px;
    margin-right: 10px;
    border-radius: 15px 15px 0px 0px;
    display: flex;
    justify-content: center;
    align-items: center;

    font-family: Pretendard;
    font-size: 20px;
    font-weight: 500;
`;

const AddBtn = styled.button`
    background: ${Color.background2};
    border: none;
    color: ${Color.text1};
    padding: 3px 32px 0px 32px;
    border-radius: 15px 15px 0px 0px;
    display: flex;
    justify-content: center;
    align-items: center;

    font-family: Pretendard;
    font-size: 40px;
    font-weight: 200;
`;

function CategoryBtn() {

    return (
        <Container>
            <Btn>전체</Btn>
            <AddBtn>+</AddBtn>
        </Container>
    )
};

export default CategoryBtn;
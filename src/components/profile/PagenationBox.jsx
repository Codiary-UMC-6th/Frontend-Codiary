import react, { useState, useEffect } from "react";
import styled from "styled-components";
import * as Color from '../../common/Color';

import PrevSvg from '../../assets/profile/icon_prev.svg';
import NextSvg from '../../assets/profile/icon_next.svg';

const Container = styled.div`
    display : flex;
    margin : 128px 0px 0px 206px;
` 

const Button = styled.img`
    margin : 0px 32px 0px 0px;
`

const Page = styled.div`
    margin : 0px 32px 0px 0px;

    color: ${Color.gray500};
    font-family: Pretendard;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 24px;
`

const PagenationBox = (props) => {
    const setCurrentPage = props.setCurrentPage;

    const pageClick = (event) => {
        const pages = document.getElementsByClassName("page");
        Array.prototype.map.call(pages, (item) => {
            item.style.color = Color.gray500;
        });
        event.target.style.color = Color.text2;
        
        setCurrentPage(event.target.innerText);
    }

    return (
        <Container>
            <Button src={PrevSvg}></Button>
            <Page className="page" onClick={pageClick}>1</Page>
            <Page className="page" onClick={pageClick}>2</Page>
            <Page className="page" onClick={pageClick}>3</Page>
            <Page className="page" onClick={pageClick}>4</Page>
            <Page className="page" onClick={pageClick}>5</Page>
            <Button src={NextSvg}></Button>
        </Container>
    );
}

export default PagenationBox;
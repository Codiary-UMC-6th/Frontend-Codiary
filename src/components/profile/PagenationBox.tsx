import react, { useState, useEffect } from "react";
import styled from "styled-components";
import * as Color from '../../common/Color';

import PrevSvg from '../../assets/profile/icon_prev.svg';
import NextSvg from '../../assets/profile/icon_next.svg';


const PagenationBox = (props: any) => {
    const setCurrentPage = props.setCurrentPage;
    const [currentStart, setCurrentStart] = useState(1);
    const pages = document.getElementsByClassName("page") as HTMLCollectionOf<HTMLElement>;

    useEffect(() => {
        pages[0].style.color = Color.text2;
    },[]);

    const pageClick = (event: any) => {
        Array.prototype.map.call(pages, (item) => {
            item.style.color = Color.gray500;
        });
        event.target.style.color = Color.text2;
        
        setCurrentPage(event.target.innerText);
    }

    const clickPrev = (event: any) => {
        if(currentStart != 1) {
            setCurrentStart(currentStart - 5);
            setCurrentPage(currentStart - 1);           
            Array.prototype.map.call(pages, (item) => {
                item.style.color = Color.gray500;
            });
            pages[4].style.color = Color.text2;
        }
    }

    const clickNext = (event: any) => {
        setCurrentStart(currentStart + 5);
        setCurrentPage(currentStart + 5);
        
        Array.prototype.map.call(pages, (item) => {
            item.style.color = Color.gray500;
        });
        pages[0].style.color = Color.text2;
    }

    return (
        <Container>
            <Button onClick={clickPrev} src={PrevSvg}></Button>
            <Page className="page" onClick={pageClick}>{currentStart}</Page>
            <Page className="page" onClick={pageClick}>{currentStart+1}</Page>
            <Page className="page" onClick={pageClick}>{currentStart+2}</Page>
            <Page className="page" onClick={pageClick}>{currentStart+3}</Page>
            <Page className="page" onClick={pageClick}>{currentStart+4}</Page>
            <Button onClick={clickNext} src={NextSvg}></Button>
        </Container>
    );
}


const Container = styled.div`
    display : flex;
    margin : 128px 0px 0px 206px;
` 

const Button = styled.img`
    margin : 0px 32px 0px 0px;
    cursor: pointer;
`

const Page = styled.div`
    margin : 0px 32px 0px 0px;

    cursor: pointer;
    color: ${Color.gray500};
    font-family: Pretendard;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 24px;
`


export default PagenationBox;
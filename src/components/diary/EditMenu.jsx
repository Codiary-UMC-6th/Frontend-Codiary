import { useState, useEffect, useRef} from "react";
import styled from "styled-components";

import * as Color from "../../common/Color";

import DropdownSVG from "../../assets/dropdown-disabled.svg";
import DropupSVG from "../../assets/dropdown-enabled.svg";
import LinkSVG from "../../assets/diary/link.svg";

import DropText from "../../assets/diary/text.svg";
import DropBlist from "../../assets/diary/blist.svg";
import DropNumlist from "../../assets/diary/numlist.svg";
import DropCode from "../../assets/diary/code.svg";

const EditMenu = (props) => {
    const decoSelected = props.decoSelected;
    const colorSelected = props.colorSelected;
    const headSelected = props.headSelected;
    
    const selected = props.selected;

    useEffect(() => {
        const container = document.getElementById("container");
        const rect = selected.getBoundingClientRect();
        container.style.left = `${rect.left + window.scrollX}px`;
        container.style.top = `${rect.top - 44}px`;
        //container.style.top = `${rect.top + window.scrollY + 30}px`;
    }, [selected]);

    const [textDropIsOpen, setTextDropIsOpen] = useState(false);
    const [colorDropIsOpen, setColorDropIsOpen] = useState(false);

    useEffect(() => {
        setTextDropIsOpen(false);
        setColorDropIsOpen(false);

        const container = document.getElementById("container");
        container.addEventListener("mousedown", (event) => {
            event.preventDefault();
            selected.focus();
        })
    }, [selected]);

    const dropdownRef = useRef(null);
    const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setTextDropIsOpen(false);
            setColorDropIsOpen(false);
        }
    };

    useEffect(() => {
        if (textDropIsOpen||colorDropIsOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [textDropIsOpen, colorDropIsOpen]);

    return (
        <Container onClick={() => {console.log("menu clicked")}} id="container">
            <TextDrop onClick={() => {
                setTextDropIsOpen(!textDropIsOpen);
                setColorDropIsOpen(false);
            }}>
                텍스트
                {textDropIsOpen ? 
                <>
                <SVG src={DropupSVG}></SVG>
                <DropDown ref={dropdownRef}>
                    <Option><DropSVG src={DropText}></DropSVG>텍스트</Option>    
                    <Option onClick={()=>{headSelected("h1")}}>제목 1</Option>    
                    <Option onClick={()=>{headSelected("h2")}}>제목 2</Option>    
                    <Option onClick={()=>{headSelected("h3")}}>제목 3</Option>    
                    <Option><DropSVG src={DropBlist}></DropSVG>글머리 기호</Option>    
                    <Option><DropSVG src={DropNumlist}></DropSVG>번호 매기기</Option>    
                    <Option><DropSVG src={DropCode}></DropSVG>코드</Option>    
                </DropDown>                
                </>
                :
                <SVG src={DropdownSVG}></SVG>
                }
            </TextDrop>

            <Buttons>
                <Deco onClick={()=>{decoSelected("b")}}><b>B</b></Deco>
                <Deco onClick={()=>{decoSelected("i")}}><i>I</i></Deco>
                <Deco onClick={()=>{decoSelected("u")}}><u>U</u></Deco>
                <Deco onClick={()=>{decoSelected("s")}}><s>S</s></Deco>
                <Embed>{"</>"}</Embed>
                <img src={LinkSVG} alt="link"></img>
            </Buttons>
            <ColorDrop onClick={() => {
                setColorDropIsOpen(!colorDropIsOpen);
                setTextDropIsOpen(false);
            }}>
                <ColorCircle></ColorCircle>
                {colorDropIsOpen ? 
                <>
                <SVG src={DropupSVG}></SVG>
                <DropDown ref={dropdownRef}>
                    <Option onClick={()=>{colorSelected(Color.text1)}}><ColorIcon style={{color: Color.text1}}>A</ColorIcon>White</Option>    
                    <Option onClick={()=>{colorSelected(Color.primary_blue)}}><ColorIcon style={{color: Color.primary_blue}}>A</ColorIcon>Blue</Option>    
                    <Option onClick={()=>{colorSelected(Color.primary_red)}}><ColorIcon style={{color: Color.primary_red}}>A</ColorIcon>Red</Option>    
                    <Option onClick={()=>{colorSelected(Color.primary_yellow)}}><ColorIcon style={{color: Color.primary_yellow}}>A</ColorIcon>Yellow</Option>    
                    <Option onClick={()=>{colorSelected(Color.secondary_green)}}><ColorIcon style={{color: Color.secondary_green}}>A</ColorIcon>Green</Option>  
                    <Option onClick={()=>{colorSelected(Color.secondary_pink)}}><ColorIcon style={{color: Color.secondary_pink}}>A</ColorIcon>Pink</Option>
                </DropDown>                
                </>
                :
                <SVG src={DropdownSVG}></SVG>
                }
            </ColorDrop>
        </Container>
    );
}

const Container = styled.div`
    display: flex;
    background-color : ${Color.background3};
    position: absolute;
    width: 405px;
`

const TextDrop = styled.div`
    padding: 6px 12px;
    border-right: 1px solid ${Color.divider};

    font-family: Pretendard;
    font-size: 18px;
    font-style: normal;
    font-weight: 400;
    line-height: 26px;

    position: relative;
`

const DropDown = styled.div`
    background-color: ${Color.background3};
    width: 185px;
    
    position: absolute;
    top: 46px;
    left: 0px;
`

const Option = styled.div`
    padding: 5px 12px;
    display: flex;
    align-items: center;
`

const DropSVG = styled.img`
    margin: 0px 16px 0px 0px;
`

const SVG = styled.img`
    margin: 0px 0px 0px 4px;
`

const Buttons = styled.div`
    display: flex;
    padding: 0px 8px;
    border-right: 1px solid ${Color.divider};
`

const Deco = styled.div`
    display: flex;
    padding: 6px 13px;
    justify-content: center;
    align-items: center;

    font-family: Pretendard;
    font-size: 18px;
    font-style: normal;
    font-weight: 400;
    line-height: 26px;
`

const Embed = styled.div`
    display: flex;
    padding: 6px 5px 6px 4px;
    justify-content: center;
    align-items: center;

    font-family: Pretendard;
    font-size: 18px;
    font-style: normal;
    font-weight: 400;
    line-height: 26px;
`

const ColorDrop = styled.div`
    padding: 6px 12px;
    display: flex;
    justify-content: center;
    align-items: center;

    position: relative;
`

const ColorCircle = styled.div`
    width: 18px;
    height: 18px;
    background-color: ${Color.text1};
    border-radius: 9px;
`

const ColorIcon = styled.div`
    padding: 0px 17px 0px 0px;
`

export default EditMenu;
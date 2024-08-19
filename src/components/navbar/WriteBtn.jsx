import styled from "styled-components";
import { useNavigate } from "react-router-dom";

import * as Color from '../../common/Color';

import SymbolSvg from '../../assets/symbols_write.svg'

const Btn = styled.button`
    display : flex;
    align-items : center;
    padding : 4px 12px;
    margin : 0px 0px 0px 20px;
    background: ${Color.primary_red};
    outline: none;
    border: none;
    border-radius: 30px;
    color: ${Color.text1};
    font-family: Pretendard;
    font-size: 20px;
    font-style: normal;
    font-weight: 500;
    
    &:focus,
    &:active {
        outline: none;
        box-shadow: none;
    }
`
const WriteSymbol = styled.img`
    width : 24px;
    height : 24px;
`

const WriteBtn = () => {
    const navigate = useNavigate();

    
    const btnClick = () => {
        navigate("/diary");
    }

    return (
        <Btn onClick = {btnClick}>
            글쓰기
            <WriteSymbol src={SymbolSvg} alt={"write symbol"}/>
        </Btn>
    );
}

export default WriteBtn;
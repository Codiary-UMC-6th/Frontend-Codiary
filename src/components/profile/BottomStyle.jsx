import styled from "styled-components";
import * as Color from '../../common/Color';

export const Head = styled.div`
    height: 32px;
    display : flex;
    justify-content : center;
    align-items : center;
    cursor: pointer;
`;

export const Infotype = styled.div`
    display : flex;
    justify-content: center;
    color : ${Color.text3};
    font-family: Pretendard;
    font-size: 18px;
    font-style: normal;
    font-weight: 400;
    line-height: 26px;
`;

export const Content = styled.div`
    display : flex;
    justify-content : center;
    align-items : center;
    padding : 12px;
    flex : 1 0 auto;

    color : ${Color.text5};
    font-family: Pretendard;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 22px;
`;


export const Add = styled.img`
    margin : 0px 0px 0px 3px;
`
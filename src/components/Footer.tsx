import { NavLink } from "react-router-dom";
import styled from "styled-components";
import * as Color from '../common/Color';

const Footer = () => {
    return (
        <Container>
            <div>
                ⓒ Codiary All rights reserved.
            </div>
            <div>
                <NavStyle to={"/"}>회사소개</NavStyle>
                <span>|</span>
                <NavStyle to={"/"}>공지사항</NavStyle>
                <span>|</span>
                <NavStyle to={"/"}>개인정보보호정책</NavStyle>
                <span>|</span>
                <NavStyle to={"/"}>이용약관</NavStyle>
                <span>|</span>
                <NavStyle to={"/"}>Contact Us</NavStyle>                
            </div>
        </Container>
    );
};

const Container = styled.div`
    display : flex;
    justify-content: space-evenly; 
    align-items : center;
    flex-direction : column;
    
    min-height : 180px;
    background-color : #434343;
    color : ${Color.text1};
`;

const NavStyle = styled(NavLink)`
  font-size : 18px;
  margin : 0px 24px 0px 24px;
  text-decoration : none;
  color : ${Color.text1};
`;

export default Footer;
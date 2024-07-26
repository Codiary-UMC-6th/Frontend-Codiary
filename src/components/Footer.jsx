import { NavLink } from "react-router-dom";
import styled from "styled-components";
import * as Color from '../common/Color';

const buttonInfo = [
    { name: "회사소개", link: "/" },
    { name: "공지사항", link: "/" },
    { name: "개인정보보호정책", link: "/" },
    { name: "이용약관", link: "/" },
    { name: "Contact Us", link: "/" },
  ];
  

const Container = styled.div`
    display : flex;
    justify-content: space-evenly; 
    align-items : center;
    flex-direction : column;
    
    height : 180px;
    background-color : #434343;
    color : ${Color.text1};
`;

const NavStyle = styled(NavLink)`
  font-size : 18px;
  margin : 0px 24px 0px 24px;
  text-decoration : none;
  color : ${Color.text1};
`;

const Footer = () => {
    return (
        <Container>
            <div>
                ⓒ Codiary All rights reserved.
            </div>
            <div>
                {buttonInfo.map((contenst, index) => {
                return (buttonInfo.length === index) ?
                (
                <NavStyle
                    key={index}
                    to={contenst.link}
                    >
                    {contenst.name}
                </NavStyle>
                ) :
                (
                <>
                <NavStyle
                    key={index}
                    to={contenst.link}
                    >
                    {contenst.name}
                </NavStyle>
                <span>|</span>
                </>
                )
                })}    
            </div>
        </Container>
    );
};

export default Footer;
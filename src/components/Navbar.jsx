import { Link, NavLink } from "react-router-dom";
import styled from "styled-components";
import * as Color from '../common/Color';

import SearchBox from "./SearchBox";
import WriteBtn from "./WriteBtn";

const buttonInfo = [
  { name: "홈", link: "/" },
  { name: "내 다이어리", link: "/profile" },
  { name: "팀 홈", link: "/team" },
];

const Container = styled.div`
  display : flex;
  justify-content: space-between;
  flex-direction : row;
  align-items : center;
  height : 40px;
  padding : 35px 130px 35px 130px;
  background-color : ${Color.background};
`;

const Left = styled.div`
  display : flex;
  flex-direction : row;
  align-items : center;
`

const Right = styled.div`
  display : flex;
  flex-direction : row;
  align-items : center;
`

const LinkStyle = styled(Link)`
  text-decoration : none;
`;

const Codiary = styled.span`
  text-decoration : none;
  font-family: D2Coding;
  font-size: 32px;
  font-style: normal;
  font-weight: 700;
  line-height: 40px; /* 125% */
  letter-spacing: 0.96px;
  color : ${Color.primary_yellow};
`;

const Typography = styled.span`
  color: ${Color.primary_blue};
  font-family: D2Coding;
  font-size: 32px;
  font-style: normal;
  font-weight: 700;
  line-height: 40px; /* 125% */
  letter-spacing: 0.96px;
`;

const NavStyle = styled(NavLink)`
  font-size : 18px;
  margin : 0px 0px 0px 48px;
  text-decoration : none;
  color : ${Color.text1};
`;

const Navbar = () => {
  return (
    <Container>
      <Left>
        <LinkStyle to="/" >
          <Typography>/*</Typography>
          <Codiary>Codiary</Codiary>
          <Typography>*/</Typography>
        </LinkStyle>
          {buttonInfo.map((content, index) => {
            return (
                <NavStyle
                  key={index}
                  to={content.link}
                  >
                  {content.name}
                </NavStyle>
            );
          })}
      </Left>
      <Right>
        <SearchBox />
        <WriteBtn />
      </Right>
    </Container>
  );
};

export default Navbar;
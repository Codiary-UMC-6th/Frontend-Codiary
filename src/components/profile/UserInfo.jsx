import styled from "styled-components";
import * as Color from '../../common/Color';

import ProfileLink from "./ProfileLink";
import Techstack from "./Techstack";
import Team from "./Team";

import GithubSvg from '../../assets/profile/github.svg'
import DiscordSvg from '../../assets/profile/discord.svg'
import LinkedinSvg from '../../assets/profile/linkedin.svg'
import { useNavigate } from "react-router-dom";

const Container = styled.div`
    display : flex;
    flex-direction : column;
    width: 680px;
    margin: 0px 120px 0px 0px;
`

const Top = styled.div`
    display : flex;
    margin : 0px 0px 36px 0px;
`

const ImageBox = styled.div`
    background-color: ${Color.backgroundBlur};
    width: 200px;
    height: 200px;
    border-radius : 140px;
`

const Image = styled.img`
`

const UserName = styled.div`
    color : ${Color.primary_yellow};
    font-family: Pretendard;
    font-size: 42px;
    font-style: normal;
    font-weight: 600;
    margin: 72px 34px 0 29px;
    height: 60px;
    padding-top: 8px;
`

const LinkBox = styled.div`
    display : flex;
    margin-top: 72px;
`

const Bio = styled.div`
    background-color : ${Color.backgroundBlur};
    height : 204px;

    padding : 16px;

    color : ${Color.text3};
    font-family: Pretendard;
    font-size: 20px;
    font-style: normal;
    font-weight: 400;
    line-height: 32px;
    letter-spacing: -0.06px;
`

const Bottom = styled.div`
    display : flex;
    margin : 27px 0px;
`

const ModifyProfileButton = styled.button`
    display: absolute;
    width: 115px;
    height: 42px;
    background-color: ${Color.background};
    border-radius: 10px;
    border: 1px solid ${Color.gray500};
    color: ${Color.gray500};
    text-align: center;
    font-family: Pretendard;
    font-size: 18px;
    weight: 400;
    line-height: 26px;
    padding: 8px 15px 8px 15px;
    margin-left: 29px;
    cursor: pointer;
`

const UserInfoWrapper = styled.div`
    width: 237px;
`

const UserInfo = (props) => {
    const data = props.userInfoData;
    const navigate = useNavigate();

    const modifyProfileButtonClicked = () => {
        navigate("/modify-profile");
        console.log("Modify profile button clicked");
    }
    return (
        <Container>
            <Top>
                <ImageBox>
                    <Image></Image>
                </ImageBox>
                <UserInfoWrapper>
                    <UserName>{data.userName}</UserName>
                    <ModifyProfileButton onClick={modifyProfileButtonClicked}>프로필 수정</ModifyProfileButton>
                </UserInfoWrapper>
                <LinkBox>
                    <ProfileLink type={"Github"} svg={GithubSvg} link={`https://github.com/${data.githubUrl}`} />
                    <ProfileLink type={"Discord"} svg={DiscordSvg} link={`https://discord.com/`} />
                    <ProfileLink type={"Linkedin"} svg={LinkedinSvg} link={`https://www.linkedin.com/${data.linkedinUrl}`} />
                </LinkBox>
            </Top>
            <Bio>
                {data.introduction ?
                    data.introduction
                    :
                    "소개를 입력해주세요."
                }
            </Bio>
            <Bottom>
                <Techstack onClick={props.onClick}></Techstack>
                <Team></Team>
            </Bottom>
        </Container>
    );
}

export default UserInfo;
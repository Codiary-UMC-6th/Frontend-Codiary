import styled from "styled-components";
import * as Color from '../../common/Color';

import ProfileLink from "./ProfileLink";
import Techstack from "./Techstack";
import Team from "./Team";

import GithubSvg from '../../assets/profile/github.svg'
import DiscordSvg from '../../assets/profile/discord.svg'
import LinkedinSvg from '../../assets/profile/linkedin.svg'

const Container = styled.div`
    display : flex;
    flex-direction : column;
    width: 680px;
    margin: 0px 120px 0px 0px;
`

const Top = styled.div`
    display : flex;
    align-items : center;
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
    margin: 0px 29px 0px 34px;
`

const LinkBox = styled.div`
    display : flex;
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

const UserInfo = (props) => {
    const data = props.userInfoData;
    return (
        <Container>
            <Top>
                <ImageBox>
                    <Image></Image>
                </ImageBox>
                <UserName>{data.userName}</UserName>
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
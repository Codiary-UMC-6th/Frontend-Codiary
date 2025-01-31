import styled from "styled-components";
import * as Color from '../../common/Color';

import ProfileLink from "./ProfileLink";
import Techstack from "./Techstack";
import Team from "./Team";

import GithubSvg from '../../assets/profile/github.svg'
import DiscordSvg from '../../assets/profile/discord.svg'
import LinkedinSvg from '../../assets/profile/linkedin.svg'
import { useNavigate } from "react-router-dom";

import { teamInfo, memberProfile } from "@/shared/api/profile/type";
import FollowBtn from "../diaryDetails/FollowBtn";
import { useRef, useState } from "react";

type userPersonalInfo = {
  props: {
    memberProfileData: memberProfile;
    onClick: any;
    techstackList: string[];
    teamList: teamInfo[];
  }
}

const UserInfo = ({props}: userPersonalInfo) => {
  const data = props.memberProfileData;
  const navigate = useNavigate();


  const handleUploadImg = () => {

  }

  const handlePreviewImg = () => {

  }

  const modifyProfileButtonClicked = () => {
    navigate("/modify-profile", { state: { userInfo: props.memberProfileData } });
    console.log("Modify profile button clicked");
  }


  return (
    <Container>
      <Top>
        <ImageBox>
          <Image/>
          <ImageUploadButtonWrapper>
            {/*<ImageInput type="file" />*/}
            <AddImageButton>+</AddImageButton>
          </ImageUploadButtonWrapper>
        </ImageBox>
        <UserInfoWrapper>
          <UserName>{data?.user_name}</UserName>
          {
            data?.my_page ?
              <ModifyProfileButton onClick={modifyProfileButtonClicked}>프로필 수정</ModifyProfileButton>
              :
              <FollowBtnWrapper>
                <FollowBtn authorId={props.memberProfileData.user_id} />
              </FollowBtnWrapper>
          }
        </UserInfoWrapper>
        <LinkBox>
          <ProfileLink type={"Github"} svg={GithubSvg} link={`https://github.com/${data?.github_url}`} />
          <ProfileLink type={"Discord"} svg={DiscordSvg} link={`https://discord.com/`} />
          <ProfileLink type={"Linkedin"} svg={LinkedinSvg} link={`https://www.linkedin.com/${data?.linkedin_url}`} />
        </LinkBox>
      </Top>
      <Bio>
        {
          data?.my_page ?
            (data.introduction ? data?.introduction : "소개를 입력해주세요.")
            :
            (data.introduction ? data?.introduction : "소개가 없습니다.")
        }
      </Bio>
      <Bottom>
        <Techstack onClick={props.onClick} techstackList={props.techstackList} my_page={data.my_page} ></Techstack>
        <Team teamList={props.teamList}></Team>
      </Bottom>
    </Container>
  );
}

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
    position: relative;
`



const ImageUploadButtonWrapper = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;
`
const Image = styled.img`
`

const ImageInput = styled.input`
`

const AddImageButton = styled.div`
  background: ${Color.background2};
  border: none;
  color: ${Color.text1};
  border-radius: 30px;
  display: flex;
  justify-content: center;
  width: 48px;
  height: 48px;

  font-family: Pretendard;
  font-size: 36px;
  font-weight: 200;
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
    width: 130px;
    height: 42px;
    background: ${Color.background};
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
const FollowBtnWrapper = styled.div`
  margin-left: 28px;
`

const FollowButton = styled.button`
    display: absolute;
    width: 79px;
    height: 34px;
    border-radius: 18px;
    text-align: center;
    font-family: Pretendard;
    font-size: 18px;
    weight: 400;
    line-height: 26px;
    padding: 4px 16px;
    margin-left: 29px;
    cursor: pointer;

    background: ${Color.primary_blue};
    border: none;
    color: ${Color.text1};
`

const UserInfoWrapper = styled.div`
    width: 237px;
`

export default UserInfo;
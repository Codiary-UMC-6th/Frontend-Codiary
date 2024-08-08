import React from 'react'
import styled from 'styled-components'
import { SocialInputBox } from './SocialInputBox'
import githubIcon from '../../assets/signUp/github.svg'
import linkedInIcon from '../../assets/signUp/linkedin.svg'
import discordIcon from '../../assets/signUp/discord.svg'
import { SignUpInputTitle } from './SignUpInputTitle'

export const SocialInputContainer = () => {
  return (
    <>
      <St.SocialInputContainerWrapper>
        <SignUpInputTitle
          title='소셜 계정'
          essential={Boolean(false)}
        />
        <SocialInputBox
          image={<img src={githubIcon} ale="Github" />}
          placeholder='id를 입력해주세요.'
        />
      </St.SocialInputContainerWrapper>
      <St.SocialInputWithoutTitleWrapper>
        <SocialInputBox
          image={<img src={linkedInIcon} ale="linkedIn" />}
          placeholder='id를 입력해주세요.'
        />
      </St.SocialInputWithoutTitleWrapper>
      <St.SocialInputWithoutTitleWrapper>
        <SocialInputBox
          image={<img src={discordIcon} ale="discord" />}
          placeholder='id를 입력해주세요.'
        />
      </St.SocialInputWithoutTitleWrapper>
    </>
  )
}

const St = {
  SocialInputContainerWrapper: styled.div`
    display: flex;
    width: 780px;
    align-items: center;
  `,

  SignUpInputTitleWrapper: styled.div`
    width: 100px;
    margin-right: 105px;
  `,

  SocialInputWithoutTitleWrapper: styled.div`
    flex-direction: column;
    margin-top: 32px;
    display: flex;
    width: 420px; 
    margin-right: 160px;
  `
}
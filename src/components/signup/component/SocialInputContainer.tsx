import styled from "styled-components";
import { SocialInputBox } from "./SocialInputBox";
import githubIcon from "@/assets/signUp/github.svg";
import linkedInIcon from "@/assets/signUp/linkedin.svg";
import discordIcon from "@/assets/signUp/discord.svg";
import { SignUpInputTitle } from "./SignUpInputTitle";

type SocialInputContainerProps = {
  props: {
    github?: string;
    linkedIn?: string;
    discord?: string;
    handleChange: (name: string, value: string, error?: string) => void;
  };
};

export const SocialInputContainer = ({ props }: SocialInputContainerProps) => {
  return (
    <>
      <St.SocialInputContainerWrapper>
        <SignUpInputTitle title="소셜 계정" essential={Boolean(false)} />
        <SocialInputBox
          props={{
            image: <img src={githubIcon} alt="Github" />,
            placeholder: "id를 입력해주세요.",
            value: props.github,
            onChange: (value) => props.handleChange("github", value, ""),
          }}
        />
      </St.SocialInputContainerWrapper>
      <St.SocialInputWithoutTitleWrapper>
        <SocialInputBox
          props={{
            image: <img src={linkedInIcon} alt="linkedIn" />,
            placeholder: "id를 입력해주세요.",
            value: props.github,
            onChange: (value) => props.handleChange("linkedin", value, ""),
          }}
        />
      </St.SocialInputWithoutTitleWrapper>
      <St.SocialInputWithoutTitleWrapper>
        <SocialInputBox
          props={{
            image: <img src={discordIcon} alt="discord" />,
            placeholder: "id를 입력해주세요.",
            value: props.github,
            onChange: (value) => props.handleChange("discord", value, ""),
          }}
        />
      </St.SocialInputWithoutTitleWrapper>
    </>
  );
};

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
  `,
};

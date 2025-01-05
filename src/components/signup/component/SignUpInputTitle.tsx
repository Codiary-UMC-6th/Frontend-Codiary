import styled from "styled-components";
import * as Color from "@/common/Color";

type SignUpInputTitleProps = {
  title: string;
  essential?: boolean;
};

export const SignUpInputTitle = ({
  title,
  essential,
}: SignUpInputTitleProps) => {
  return (
    <St.SignUpInputTitleWrapper>
      <St.StyledSignUpInputTitle>{title}</St.StyledSignUpInputTitle>
      {essential && <St.EssentialPoint />}
    </St.SignUpInputTitleWrapper>
  );
};

const St = {
  SignUpInputTitleWrapper: styled.div`
    display: flex;
    width: 100px;
  `,

  StyledSignUpInputTitle: styled.h1`
    font-family: Pretendard;
    font-size: 20px;
    font-weight: 500;
    line-height: 32px;
    color: ${Color.text1};
    margin-left: 0px;
  `,

  EssentialPoint: styled.div`
    width: 8px;
    height: 8px;
    border-radius: 4px;
    margin-left: 2px;
    margin-top: 6px;
    background-color: ${Color.primary_red};
  `,
};

import styled from "styled-components";
import * as Color from "@/common/Color";

type IntroduceInputContainerProps = {
  props: {
    value?: string;
    handleChange?: (name: string, value: string, error?: string) => void;
  };
};

export const IntroduceInputContainer = ({
  props,
}: IntroduceInputContainerProps) => {
  return (
    <St.IntroduceConatinerWrapper>
      <St.IntroduceTitle>내 소개</St.IntroduceTitle>
      <St.IntroduceInput
        placeholder="소개글"
        value={props.value}
        onChange={(e) =>
          props.handleChange?.("introduction", e.target.value, "")
        }
      />
    </St.IntroduceConatinerWrapper>
  );
};

const St = {
  IntroduceConatinerWrapper: styled.div`
    display: flex;
    width: 780px;
    margin-bottom: 48px;
  `,

  IntroduceInput: styled.textarea`
    background-color: ${Color.gray700};
    color: ${Color.gray300};
    width: 390px;
    height: 110px;
    font-family: "D2Coding";
    border: none;
    border-radius: 10px;
    font-size: 18px;
    line-height: 22px;
    outline: none;
    padding: 16px;
    resize: none;

    &::placeholder {
      color: ${Color.gray300};
    }
  `,

  IntroduceTitle: styled.h1`
    font-family: Pretendard;
    font-size: 20px;
    font-weight: 500;
    line-height: 32px;
    color: ${Color.text1};
    margin-left: 0px;
    margin-right: 120px;
    margin-top: 12px;
  `,
};

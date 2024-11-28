import styled from "styled-components";
import * as Color from "@/common/Color";
import { useNavigate } from "react-router-dom";

type SignUpBtnBoxProps = {
  props: {
    onSubmit?: () => Promise<void>;
    isDisabled: boolean;
    title: string;
  };
};

export const SignUpBtnBox = ({ props }: SignUpBtnBoxProps) => {
  const navigate = useNavigate();
  const handleBackButton = () => {
    navigate(-1);
  };

  return (
    <St.SignUpBtnBoxWrapper>
      <St.SignUpButton onClick={props.onSubmit} disabled={props.isDisabled}>
        {props.title}
      </St.SignUpButton>
      <St.BackButton title="뒤로가기" onClick={handleBackButton}>
        뒤로가기
      </St.BackButton>
    </St.SignUpBtnBoxWrapper>
  );
};

const St = {
  SignUpBtnBoxWrapper: styled.div`
    display: flex;
    margin-top: 88px;
    align-items: center;
    justify-content: center;
    flex-direction: column;
  `,

  SignUpButton: styled.button`
    width: 230px;
    height: 56px;
    border: none;
    cursor: pointer;
    color: ${Color.text1};
    font-family: "Pretendard";
    font-size: 20px;
    font-weight: 500;
    line-height: 32px;
    text-align: center;
    margin-bottom: 24px;
    pointer-events: ${(props) => (props.disabled ? "none" : "auto")};
    background-color: ${(props) =>
      props.disabled ? Color.text5 : Color.primary_blue};
  `,

  BackButton: styled.button`
    height: 22px;
    text-decoration: underline;
    cursor: pointer;
    font-family: "Pretendard";
    font-size: 14px;
    font-weight: 400;
    line-height: 22px;
    background-color: ${Color.background};
    color: ${Color.gray300};
    border: none;
  `,
};

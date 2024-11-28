import styled from "styled-components";
import * as Color from "@/common/Color";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import SignUpTitle from "./component/SignUpTitle";
import { SignUpInputContainer } from "./component/SignUpInputContainer";
import { SocialInputContainer } from "./component/SocialInputContainer";
import { SignUpBtnBox } from "./component/SignUpBtnBox";

import { postSignup } from "@/shared/api/signup";

interface SignUpFormData {
  email: string;
  password: string;
  nickname: string;
  birth: string;
  gender: "Male" | "Female";
  github: string;
  linkedin: string;
  discord: string;
}

export const SignUp = () => {
  const navigate = useNavigate();
  const [signUpFormData, setSignUpFormData] = useState<SignUpFormData>({
    email: "",
    password: "",
    nickname: "",
    birth: "1000-01-01",
    gender: "Male",
    github: "",
    linkedin: "",
    discord: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
    nickname: "",
    birth: "",
  });

  const [isEmailChecked, setIsEmailChecked] = useState(false);
  const [isNicknameChecked, setIsNicknameChecked] = useState(false);

  const handleChange = (name: string, value: string, error?: string) => {
    if (name === "birth") {
      value = birthFormatDate(value);
    }

    setSignUpFormData({
      ...signUpFormData,
      [name]: value,
    });
    setErrors({
      ...errors,
      [name]: error,
    });

    // 이메일이나 닉네임 변경되었을 시 초기화
    if (name === "email") {
      setIsEmailChecked(false);
    } else if (name === "nickname") {
      setIsNicknameChecked(false);
    }
  };

  // 회원가입 api
  const handleSubmit = async () => {
    try {
      if (Object.values(errors).some((error) => error)) {
        console.error("폼 형식이 알맞지 않습니다.");
        return;
      } else if (!isEmailChecked) {
        alert("이메일 중복 확인이 필요합니다.");
        return;
      } else if (!isNicknameChecked) {
        alert("닉네임 중복 확인이 필요합니다.");
        return;
      }
      const response = postSignup(signUpFormData);
      console.log("회원가입 성공", response);
      console.log(signUpFormData);
      alert("회원가입 성공");
      navigate(-1);
    } catch (error) {
      // console.error('회원가입 실패', error.response);
      console.log(signUpFormData);
      alert("회원가입 실패");
    }
  };

  // 생년월일 포맷
  const birthFormatDate = (date: string) => {
    const year = date.slice(0, 4);
    const month = date.slice(4, 6);
    const day = date.slice(6, 8);

    return `${year}-${month}-${day}`;
  };

  const [isDisabled, setIsDisabled] = useState(true);

  useEffect(() => {
    const hasErrors = Object.values(errors).some((error) => error);
    const requiredFields: Array<keyof SignUpFormData> = [
      "email",
      "password",
      "nickname",
    ];
    const hasEmptyFields = requiredFields.some(
      (field) => !signUpFormData[field]
    );
    const disable = hasErrors || hasEmptyFields;
    setIsDisabled(disable);
  }, [signUpFormData, errors]);

  return (
    <St.SignUpWrapper>
      <SignUpTitle>회원가입</SignUpTitle>
      <St.SignUpContainerWrapper>
        <SignUpInputContainer
          props={{
            title: "이메일",
            essential: Boolean(true),
            type: "text",
            placeholder: "예: codiary@codiary.com",
            isButtonHidden: Boolean(false),
            onChange: (value, error) => handleChange("email", value, error),
            onCheckDuplicate: () => setIsEmailChecked(true),
          }}
        />
        <SignUpInputContainer
          props={{
            title: "비밀번호",
            essential: Boolean(true),
            type: "password",
            placeholder: "8자 이상의 영문, 숫자 조합",
            isButtonHidden: Boolean(true),
            onChange: (value, error) => handleChange("password", value, error),
          }}
        />
        <SignUpInputContainer
          props={{
            title: "닉네임",
            essential: Boolean(true),
            type: "text",
            placeholder: "사용자 닉네임을 입력해주세요.",
            isButtonHidden: Boolean(false),
            onChange: (value, error) => handleChange("nickname", value, error),
            onCheckDuplicate: () => setIsNicknameChecked(true),
          }}
        />
        <SignUpInputContainer
          props={{
            title: "생년월일",
            essential: Boolean(false),
            type: "text",
            placeholder: "YYYYDDMM",
            isButtonHidden: Boolean(true),
            onChange: (value, error) => handleChange("birth", value, error),
          }}
        />
      </St.SignUpContainerWrapper>
      <SocialInputContainer
        props={{
          handleChange: handleChange,
        }}
      />
      <SignUpBtnBox
        props={{
          onSubmit: handleSubmit,
          isDisabled: isDisabled,
          title: "회원가입",
        }}
      />
    </St.SignUpWrapper>
  );
};

const St = {
  SignUpWrapper: styled.div`
    width: 100%;
    height: 100%;
    position: flex;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: ${Color.background};
    padding-bottom: 126px;
  `,

  SignUpContainerWrapper: styled.div`
    display: flex;
    align-items: center;
    margin-top: 48px;
    flex-direction: column;
  `,
};

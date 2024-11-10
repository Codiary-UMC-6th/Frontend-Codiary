import styled from 'styled-components'
import * as Color from '../../common/Color'

type SocialInputBoxProps = {
  props: {
    image: any;
    placeholder: string;
    value?: string;
    onChange: (value: string) => void;
  }
}

export const SocialInputBox = ({ props }: SocialInputBoxProps) => {
  const handleInputChange = (event: any) => {
    props.onChange(event.target.value);
  };

  return (
    <St.SocialInputWrapper>
      <St.SocialInputIcon>{props.image}</St.SocialInputIcon>
      <St.SocialInput
        placeholder={props.placeholder}
        value={props.value}
        onChange={handleInputChange}
      />
    </St.SocialInputWrapper>
  )
}

const St = {

  SocialInputWrapper: styled.div`
    display: flex;
    width: 420px;
    margin-left: 80px;
  `,

  SocialInputIcon: styled.div`
    width: 56px;
    height: 56px;
    margin-right: 20px;
  `,

  SocialInput: styled.input`
    background-color: ${Color.gray700};
    color: ${Color.gray300};
    width: 344px;
    height: 56px;
    font-family: 'D2Coding';
    border: none;
    border-radius: 10px;
    font-size: 18px;
    line-height: 22px;
    outline: none;
    padding-left: 14px;

    &::placeholder {
      color: ${Color.gray300};
    }
  `,
}
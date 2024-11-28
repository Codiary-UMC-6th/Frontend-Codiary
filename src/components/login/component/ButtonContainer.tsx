import styled from "styled-components";

type ButtonComponentProps = {
  title?: string;
};

const ButtonContainer = ({ title }: ButtonComponentProps) => (
  <StyledButtonContainer>{title}</StyledButtonContainer>
);

export default ButtonContainer;

const StyledButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  max-width: 600px;
`;

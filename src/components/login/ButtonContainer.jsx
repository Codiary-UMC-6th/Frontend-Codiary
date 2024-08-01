import React from 'react';
import styled from 'styled-components';

const ButtonContainer = ({ children }) => (
  <StyledButtonContainer>{children}</StyledButtonContainer>
);

export default ButtonContainer;

const StyledButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  max-width: 600px;
`;

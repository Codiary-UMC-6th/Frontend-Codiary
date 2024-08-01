import React from 'react';
import styled from 'styled-components';
import CloseBtn from '../../assets/login/closeBtn.svg';

const CloseButton = ({ onClick }) => (
  <StyledButton onClick={onClick}>
    <img src={CloseBtn} alt="Close" />
  </StyledButton>
);

export default CloseButton;

const StyledButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  cursor: pointer;
`;

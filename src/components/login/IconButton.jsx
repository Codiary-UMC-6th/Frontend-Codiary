import React from 'react';
import styled from 'styled-components';

const IconButton = ({ children }) => (
  <StyledIconButton>{children}</StyledIconButton>
);

export default IconButton;

const StyledIconButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  outline: none;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 12px;

  &:hover {
    opacity: 0.8;
  }

  img {
    width: 32px;
    height: 32px;
  }
`;

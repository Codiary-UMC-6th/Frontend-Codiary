import styled from "styled-components";

const StyledInput = styled.input`
  background-color: #666666;
  border: 1px solid transparent;
  border-radius: 10px;
  width: ${(props) => props.width || "350px"};
  height: ${(props) => props.height || "45px"};
  padding: 5px 15px;
  box-sizing: border-box;
  transition: border 0.3s;
  color: white;
  font-size: 14px;

  &::placeholder {
    color: #b3b3b3;
  }

  &:focus {
    border: 1px solid white;
    outline: none;
  }
`;

const TeamInput = ({ placeholder, width, height, onChange }) => {
  return (
    <StyledInput
      type="text"
      placeholder={placeholder}
      width={width}
      height={height}
      onChange={onChange}
    />
  );
};

export default TeamInput;

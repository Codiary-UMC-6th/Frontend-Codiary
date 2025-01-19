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

interface TeamInputProps {
  placeholder?: string;
  width?: string;
  height?: string;
  onChange: (value: string) => void;
}

const TeamInput: React.FC<TeamInputProps> = ({
  placeholder,
  width,
  height,
  onChange,
}) => {
  return (
    <input
      type="text"
      placeholder={placeholder}
      style={{ width, height }}
      onChange={(e) => onChange(e.target.value)}
    />
  );
};

export default TeamInput;

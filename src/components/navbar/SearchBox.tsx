import styled from "styled-components";
import * as Color from "../../common/Color";
import { useNavigate } from "react-router-dom";

import SymbolSvg from "../../assets/symbols_search.svg";
import useSearchStore from "../../store/SearchStore";

import { searchPosts } from "@/shared/api/main";

const SearchBox = () => {
  const { keyword, setKeyword, setSearchResults } = useSearchStore();
  const navigate = useNavigate();

  const handleSubmit = async (e:any) => {
    e.preventDefault();
    const response = await searchPosts(keyword);
    setSearchResults(response.content);
    navigate(`/search/${keyword}`);
    console.log('search result', response);
  };

  return (
    <Box>
      <SearchSymbol src={SymbolSvg} alt={"search symbol"} />
      <form onSubmit={(e) => {handleSubmit(e)}}>
      <Input
        placeholder="검색어를 입력하세요."
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
      />
      </form>
    </Box>
  );
};

const Box = styled.div`
  display: flex;
  align-items: center;
  width: 300px;
  height: 40px;
  border: 1px solid ${Color.primary_blue};
  background-color: transparent;
  border-radius: 10px;
  padding: 0px 12px;
`;

const SearchSymbol = styled.img`
  width: 28px;
  height: 28px;
`;

const Input = styled.input`
  width: 100%;
  appearance: none;
  border: none;
  background-color: transparent;
  color: ${Color.text2};
  font-size: 16px;

  &:focus,
  &active {
    outline: none;
    box-shadow: none;
  }
`;

export default SearchBox;

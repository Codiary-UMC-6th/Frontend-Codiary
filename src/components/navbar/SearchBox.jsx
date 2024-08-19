import styled from "styled-components";
import * as Color from "../../common/Color";

import SymbolSvg from "../../assets/symbols_search.svg";
import { useState } from "react";
import { get } from "../../common/api";
import useSearchStore from "../../store/SearchStore";

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

const SearchBox = () => {
  const { keyword, setKeyword, setSearchResults } = useSearchStore();

  const performSearch = async () => {
    try {
      const response = await get(
        `/posts/search/title/body/member/project/categories?keyword=${keyword}&page=1`
      );
      console.log(response?.result.postSearchTitleList);
      setSearchResults(response?.result.postSearchTitleList);
    } catch (error) {
      console.error("Get(Search-List) 요청 실패:", error);
    }
  };

  // 엔터 키를 감지하는 함수
  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      performSearch();
    }
  };

  return (
    <Box>
      <SearchSymbol src={SymbolSvg} alt={"search symbol"} />
      <Input
        placeholder="검색어를 입력하세요."
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)} // 입력 값 상태 업데이트
        onKeyPress={handleKeyPress} // 엔터 키 감지
      />
    </Box>
  );
};

export default SearchBox;

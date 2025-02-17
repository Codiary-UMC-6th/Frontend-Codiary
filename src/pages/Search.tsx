import styled from 'styled-components';
import { useParams } from 'react-router-dom';

import Card from "../components/main/Card";
import * as Color from "../common/Color";

import useSearchStore from "../store/SearchStore";

const Search = () => {
    const { searchResults } = useSearchStore();
    const { keyword } = useParams();

    return (
        <>
            <Container>
                <CardsContainer>
                <Result>'{keyword}'의 검색결과</Result>
                    {searchResults.map((post: any) => (
                        <Card
                            key={post.id}
                            post={post}
                        />
                    ))}
                </CardsContainer>
            </Container>
        </>
    );
}


const Container = styled.div`
  background-color: ${Color.background};
`;

const Result = styled.div`
  color: #fff;
  font-family: Pretendard;
  font-size: 28px;
  font-style: normal;
  font-weight: 500;
  line-height: 36px;
  width: 100%;
`;

const CardsContainer = styled.div`
  margin: 0px 130px 0px 130px;
  display: flex;
  gap: 50px;
  flex-wrap: wrap;
  justify-content: flex-start;
`;

export default Search;
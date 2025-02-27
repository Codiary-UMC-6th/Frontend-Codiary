import styled from 'styled-components';

import * as Color from '../../../common/Color';

const CommentPage = () => {
    const pages = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

    return (
        <Container>
            <ArrowBtn></ArrowBtn>
            {pages.map((num) => {
                return <PageBtn key={num}>{num}</PageBtn>
            })}
            <ArrowBtn></ArrowBtn>
        </Container>
    );
}

const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 32px;
`

const ArrowBtn = styled.div`
`

const PageBtn = styled.div`
    color: ${Color.text5};
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 24px;
    cursor: pointer; 

    &:hover {
        font-weight: bold;
    }
`

export default CommentPage;
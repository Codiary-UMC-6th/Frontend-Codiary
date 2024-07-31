import React from "react";
import MockData from "../components/MockData";
import Card from "../components/Card";
import ViewBtn from "../components/ViewBtn";
import styled from "styled-components";
import * as Color from '../common/Color';
import CategoryBtn from "../components/CategoryBtn";

const Container = styled.div`
  background-color : ${Color.background};
`;

const Banner = styled.img`
    width: 100%;
    height: 200px;
    background-color: rgb(200, 200, 200);
    display: flex;
    margin-bottom: 52px;
`;

const CardsContainer = styled.div`
    margin: 0px 130px 0px 130px;
    display: flex;
    gap: 50px;
    flex-wrap: wrap;
    justify-content: center;
`;

const Main = () => {

    return (
        <Container>
            <Banner />
            <ViewBtn />
            <CategoryBtn />
            <CardsContainer>
                {MockData.map(data => (
                    <Card
                    id={data.id}
                    title={data.title}
                    author={data.author}
                    details={data.details} />
                    ))}
            </CardsContainer>
        </Container>
    );
}

export default Main;
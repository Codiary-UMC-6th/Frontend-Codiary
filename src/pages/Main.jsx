import React, { useState } from "react";
import MockData from "../components/main/MockData";
import Card from "../components/main/Card";
import ViewBtn from "../components/main/ViewBtn";
import styled from "styled-components";
import * as Color from '../common/Color';
import CategoryBtn from "../components/main/CategoryBtn";

import { AddModal } from "../components/modal/AddModal";

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
    const [isAddCategoryModalOpen, setIsAddCategoryModalOpen] = useState(false);

    const openAddCategoryModal = () => setIsAddCategoryModalOpen(true);
    const closeAddCategoryModal = () => setIsAddCategoryModalOpen(false);

    return (
        <>
        <Container>
            <Banner />
            <ViewBtn />
            <CategoryBtn onClick={openAddCategoryModal}/>
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
        {isAddCategoryModalOpen && 
        <AddModal 
            title='카테고리 추가하기'
            placeholder='input name = "interest"'
            onClose={closeAddCategoryModal} 
        />
        }
        </>
    );
}

export default Main;
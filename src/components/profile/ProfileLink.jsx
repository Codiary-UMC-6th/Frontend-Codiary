import styled from "styled-components";

const Img = styled.div`
    cursor: pointer;
`

const ProfileLink = ({ type, svg, link }) => {

    const OpenOuterProfilePage = () => {
        window.open(link)
    }

    return (
        <Img onClick={OpenOuterProfilePage}><img src={svg} alt={type + " svg"}></img></Img>
    );
}

export default ProfileLink;
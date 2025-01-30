import styled from "styled-components";

const Img = styled.div`
    cursor: pointer;
`

interface props {
    type: string;
    svg: string;
    link: string;
}

const ProfileLink = ({ type, svg, link }: props) => {

    const OpenOuterProfilePage = () => {
        window.open(link)
    }

    return (
        <Img onClick={OpenOuterProfilePage}><img src={svg} alt={type + " svg"}></img></Img>
    );
}

export default ProfileLink;
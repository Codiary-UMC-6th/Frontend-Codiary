import React, { useEffect } from "react";
import styled from "styled-components";
import { useState } from "react";
import { get } from "../common/api.js";
import { useParams } from "react-router-dom";
import TeamProfile from "../components/team/teamProfile";
import TeamDiary from "../components/team/teamDiary";
import { teamMember, teamProfile } from "@/shared/api/team/type";
import { getTeamProfile } from "@/shared/api/team/index";

const Team = () => {
  const bannerImgUrl = process.env.PUBLIC_URL + "/team_images/banner.png";
  const [isManager, setIsManager] = useState<boolean>(false);

  const { teamId } = useParams();
  const [teamProfileData, setTeamProfileData] = useState<teamProfile>();
  const [teamMemberList, setTeamMemberList] = useState<teamMember[]>();

  const getTeamProfileData = async () => {
    const response = await getTeamProfile(teamId);
    setTeamProfileData(response);
    setTeamMemberList(response.team_member_list);
    setIsManager(response.is_admin);
  }

  useEffect(() => {
    getTeamProfileData();
  }, [])

  return (
    <Container>
      <BannerContainer>
        {bannerImgUrl ? (
          <img src={bannerImgUrl} style={{ width: "100%", height: "280px" }} />
        ) : (
          <div style={{ height: "280px" }}></div>
        )}
      </BannerContainer>
      <TeamProfile 
        props={{
          isManager: isManager, 
          teamProfileData: teamProfileData,
          teamMemberList: teamMemberList,
        }} 
      />
      <TeamDiary 
        props={{
          isManager: isManager, 
          teamProfileData: teamProfileData
        }} 
       />
    </Container>
  );
};

export default Team;

const Container = styled.div`
  flex: 1;
  display: flex;
  background-color: #222222;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const BannerContainer = styled.div`
  width: 100%;
  background-color: #434343;

`

import React, { useEffect } from "react";
import { useState } from "react";
import { get } from "../common/api.js";
import { useParams } from "react-router-dom";
import TeamProfile from "../components/team/teamProfile.jsx";
import TeamDiary from "../components/team/teamDiary.jsx";
const Team = () => {
  const [isManager, setIsManager] = useState(true);

  const container = {
    flex: 1,
    display: "flex",
    backgroundColor: "#222222",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  };

  const bannerContainer = {
    width: "100%",
    backgroundColor: "#434343",
  };

  const bannerImgUrl = process.env.PUBLIC_URL + "/team_images/banner.png";
  return (
    <div style={container}>
      <div style={bannerContainer}>
        {bannerImgUrl ? (
          <img src={bannerImgUrl} style={{ width: "100%", height: "280px" }} />
        ) : (
          <div style={{ height: "280px" }}></div>
        )}
      </div>
      <TeamProfile isManager={isManager} />
      <TeamDiary isManager={isManager} />
    </div>
  );
};

export default Team;

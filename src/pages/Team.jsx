import React from "react";
import { useState, useEffect } from "react";
import { memberData } from "./teamDataEx";
import { boardData } from "./teamDataEx";
import BoardCard from "../components/boardCard";

const Team = () => {
  const [teamName, setTeamName] = useState("TEAM NAME");
  const [teamDescription, setTeamDescription] = useState(
    "Information about our team."
  );
  const [memberIndex, setMemberIndex] = useState(0);
  const [categoryList, setCategoryList] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const nextMember = () => {
    if (memberIndex + 3 < memberData.length) {
      setMemberIndex(memberIndex + 3);
    }
  };

  const previousMember = () => {
    if (memberIndex - 3 >= 0) {
      setMemberIndex(memberIndex - 3);
    }
  };

  const addCategory = () => {
    setCategoryList([...categoryList, ""]);
  };

  const handleCategoryChange = (index, value) => {
    const newCategoryList = [...categoryList];
    newCategoryList[index] = value;
    setCategoryList(newCategoryList);
  };

  useEffect(() => {
    setTotalPages(Math.ceil(boardData.length / 6));
  }, [boardData]);

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
  const mainContainer = {
    width: "80vw",
  };

  const topContainer = {
    width: "100%",
  };

  const teamContainer = {
    width: "50%",
  };

  const teamTitle = {
    display: "flex",
    marginTop: "10px",
    color: "#E19E58",
    fontSize: "40px",
    alignItems: "center",
  };

  const teamButtonContainer = {
    width: "30%",
    display: "flex",
    justifyContent: "space-between",
    padding: "0 10%",
  };

  const editButton = {
    backgroundColor: "#222222",
    border: "2px solid #999999",
    borderRadius: "10px",
    color: "#999999",
    padding: "8px",
    fontSize: "16px",
    margin: "20px 0",
  };

  const introduceContainer = {
    display: "flex",
    padding: "20px 0",
    borderBottom: "1px solid #999999",
  };

  const introduceLeft = {
    width: "60%",
    borderRight: "1px solid #999999",
  };
  const introduceRight = {
    width: "40%",
    paddingLeft: "20px",
  };

  const introduceTitle = {
    color: "white",
    fontSize: "30px",
    display: "flex",
    alignItems: "center",
  };

  const introduceDetail = {
    display: "flex",
    alignItems: "center",
    margin: "10px 0",
    color: "white",
    margin: "25px 0",
  };

  const memberContainer = {
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
  };
  const boardContainer = {};
  const categoryContainer = {
    display: "flex",
    margin: "20px 0",
  };
  const category = {
    width: "90px",
    height: "45px",
    borderTopLeftRadius: "10px",
    borderTopRightRadius: "10px",
    backgroundColor: "#2D7295",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "white",
    marginRight: "10px",
    border: "none",
    outline: "none",
    padding: "0",
    textAlign: "center",
    fontSize: "15px",
  };
  const diaryContainer = {
    width: "100%",
    display: "flex",
    flexWrap: "wrap",
    gap: "30px 70px",
    margin: "20px 0",
    justifyContent: "center",
  };

  const pageContainer = {
    display: "flex",
    width: "100%",
    justifyContent: "center",
    margin: "20px 0",
  };

  const pageNum = {
    color: "white",
    fontSize: "20px",
    cursor: "pointer",
    margin: "10px",
  };

  const bannerImgUrl = process.env.PUBLIC_URL + "/team_images/banner.png";
  return (
    <div style={container}>
      {/* banner image */}
      <div style={bannerContainer}>
        {bannerImgUrl ? (
          <img src={bannerImgUrl} style={{ width: "100%", height: "280px" }} />
        ) : (
          <div style={{ height: "280px" }}></div>
        )}
      </div>

      {/* main container */}
      <div style={mainContainer}>
        {/* top container */}
        <div style={topContainer}>
          <div style={teamContainer}>
            <div style={teamTitle}>
              {teamName}
              <div style={teamButtonContainer}>
                <img
                  src={`${process.env.PUBLIC_URL}/team_images/github.png`}
                  style={{ width: "26px", height: "26px" }}
                />
                <img
                  src={`${process.env.PUBLIC_URL}/team_images/discord.png`}
                  style={{ width: "26px", height: "26px" }}
                />
                <img
                  src={`${process.env.PUBLIC_URL}/team_images/linked.png`}
                  style={{ width: "26px", height: "26px" }}
                />
                <img
                  src={`${process.env.PUBLIC_URL}/team_images/instagram.png`}
                  style={{ width: "26px", height: "26px" }}
                />
              </div>
            </div>
            <button style={editButton}>프로필 수정</button>
          </div>
          <div style={introduceContainer}>
            <div style={introduceLeft}>
              <div style={introduceTitle}>팀 소개</div>
              <div style={introduceDetail}>
                <img
                  src={`${process.env.PUBLIC_URL}/team_images/profile.png`}
                  style={{
                    width: "100px",
                    height: "100px",
                    marginRight: "20px",
                  }}
                />
                {teamDescription}
              </div>
            </div>
            <div style={introduceRight}>
              <div style={introduceTitle}>
                구성원
                <img
                  src={`${process.env.PUBLIC_URL}/team_images/member.png`}
                  style={{ marginLeft: "20px" }}
                />
              </div>
              <div style={memberContainer}>
                {memberIndex > 0 ? (
                  <img
                    onClick={previousMember}
                    src={`${process.env.PUBLIC_URL}/team_images/next.png`}
                    style={{
                      transform: "rotate(180deg)",
                      width: "45px",
                      height: "45px",
                      margin: "15px",
                      cursor: "pointer",
                    }}
                  />
                ) : (
                  <div
                    style={{ width: "45px", height: "45px", margin: "15px" }}
                  ></div>
                )}
                {memberData.slice(memberIndex, memberIndex + 3).map((el) => (
                  <div
                    key={el.id}
                    style={{ margin: "15px", textAlign: "center" }}
                  >
                    <img
                      src={el.profileImg}
                      alt={el.userName}
                      style={{ width: "60px", height: "60px" }}
                    />
                    <div style={{ margin: "10px 0", color: "#888888" }}>
                      {el.userName}
                    </div>
                    <div style={{ color: "#888888" }}>{el.role}</div>
                  </div>
                ))}
                {memberIndex + 3 < memberData.length ? (
                  <img
                    onClick={nextMember}
                    src={`${process.env.PUBLIC_URL}/team_images/next.png`}
                    style={{
                      width: "45px",
                      height: "45px",
                      margin: "15px",
                      cursor: "pointer",
                    }}
                  />
                ) : (
                  <div
                    style={{ width: "45px", height: "45px", margin: "15px" }}
                  ></div>
                )}
              </div>
            </div>
          </div>

          {/* board container */}
          <div style={boardContainer}>
            <div style={{ color: "white", fontSize: "30px", margin: "30px 0" }}>
              팀 다이어리
            </div>
            <div style={categoryContainer}>
              <div style={category}>전체</div>
              {categoryList.map((el, index) => (
                <input
                  key={index}
                  type="text"
                  value={el}
                  onChange={(e) => handleCategoryChange(index, e.target.value)}
                  style={category}
                />
              ))}
              <div
                onClick={addCategory}
                style={{
                  ...category,
                  backgroundColor: "gray",
                  fontSize: "30px",
                  cursor: "pointer",
                }}
              >
                +
              </div>
            </div>
            <div style={diaryContainer}>
              {boardData
                .slice((currentPage - 1) * 6, (currentPage - 1) * 6 + 6)
                .map((el) => (
                  <div>
                    <BoardCard key={el.id} data={el} />
                  </div>
                ))}
            </div>
            <div style={pageContainer}>
              {Array.from({ length: totalPages }, (_, index) => (
                <div
                  key={index + 1}
                  style={{
                    ...pageNum,
                    color: currentPage === index + 1 ? "white" : "#888888",
                  }}
                  onClick={() => setCurrentPage(index + 1)}
                >
                  {index + 1}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Team;

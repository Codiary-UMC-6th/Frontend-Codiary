import React from "react";

const BoardCard = ({ data }) => {
  const cardContainer = {
    display: "flex",
    flexDirection: "column",
    width: "360px",
    height: "460px",
  };

  const imgContainer = {
    width: "100%",
    height: "200px",
  };
  return (
    <div style={cardContainer}>
      <img src={data.thumbImg} style={imgContainer} />
      <div
        style={{
          width: "96%",
          height: "260px",
          padding: "2%",
          color: "white",
          backgroundColor: "#434343",
        }}
      >
        <div style={{ fontSize: "25px", margin: "15px 15px 40px" }}>
          {data.title}
        </div>
        <div style={{ fontSize: "20px", margin: "15px" }}>{data.writer}</div>
        <div style={{ fontSize: "16px", margin: "15px", color: "#999999" }}>
          {data.contents}
        </div>
      </div>
    </div>
  );
};

export default BoardCard;

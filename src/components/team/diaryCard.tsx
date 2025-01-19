import React from "react";

interface Diary {
  postId: Number;
  postTitle: string;
  nickname: string;
  postBody: string;
  createdAt: any;
  memberId: string;
  thumbnailImageUrl: string;
}

const DiaryCard = ({ data }: { data: Diary }) => {
  const cardContainer: React.CSSProperties = {
    display: "flex",
    flexDirection: "column",
    width: "360px",
    height: "460px",
  };

  const imgContainer: React.CSSProperties = {
    width: "100%",
    height: "200px",
  };
  return (
    <div style={cardContainer}>
      <img src={data.thumbnailImageUrl} style={imgContainer} />
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
          {data.postTitle}
        </div>
        <div style={{ fontSize: "20px", margin: "15px" }}>{data.nickname}</div>
        <div style={{ fontSize: "16px", margin: "15px", color: "#999999" }}>
          {data.postBody}
        </div>
      </div>
    </div>
  );
};

export default DiaryCard;

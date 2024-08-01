import React from "react";
import "./CalendarLeft.css";

const CalendarLeft = () => {
  return (
    <div className="calendar-left">
      <div className="month-records">
        <button className="nav-button-left">
          {/* 여기에 SVG 아이콘을 삽입하거나 import 해서 사용 */}
        </button>
        <div className="month-title">07월의 기록</div>
        <button className="nav-button-right">
          {/* 여기에 SVG 아이콘을 삽입하거나 import 해서 사용 */}
        </button>
      </div>
      <div className="calendar-grid">
        {Array(31)
          .fill()
          .map((_, i) => (
            <div className="calendar-cell" key={i}>
              <div className="inner-grid">
                <div className="inner-cell"></div>
                <div className="inner-cell"></div>
                <div className="inner-cell"></div>
                <div className="inner-cell"></div>
              </div>
            </div>
          ))}
      </div>
      <div className="diary-count">이번 달 31개의 다이어리 작성</div>
    </div>
  );
};

export default CalendarLeft;

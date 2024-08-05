import React from "react";
import "./CalendarLeft.css";

const CalendarLeft = ({
  currentMonth,
  days,
  selectedDay,
  handlePreviousMonth,
  handleNextMonth,
  handleDayClick,
}) => {
  return (
    <div className="calendar-left">
      <div className="month-records">
        <div className="month-title">{currentMonth}월의 기록</div>
      </div>
      <div className="calendar-grid">
        {Array(days)
          .fill()
          .map((_, i) => (
            <div
              className={`calendar-cell ${
                selectedDay === i + 1 ? "selected" : ""
              }`}
              key={i}
              onClick={() => handleDayClick(i + 1)}
            >
              <div className="inner-grid">
                <div className="inner-cell"></div>
                <div className="inner-cell"></div>
                <div className="inner-cell"></div>
                <div className="inner-cell"></div>
              </div>
            </div>
          ))}
      </div>
      <div className="diary-count">이번 달 {days}개의 다이어리 작성</div>
    </div>
  );
};

export default CalendarLeft;

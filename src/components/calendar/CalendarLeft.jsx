import React from "react";
import "./CalendarLeft.css";

const CalendarLeft = ({
  currentMonth,
  days,
  selectedDay,
  handlePreviousMonth,
  handleNextMonth,
  handleDayClick,
  projectsForDays, // 추가: projectsForDays를 props로 받음
  coloredCellsCount, // 추가: coloredCellsCount를 props로 받음
}) => {
  return (
    <div className="calendar-left">
      <div className="month-records">
        <button className="nav-button-left" onClick={handlePreviousMonth}>
          &lt; {/* 이전 달로 이동하는 버튼 */}
        </button>
        <div className="month-title">{currentMonth}월의 기록</div>
        <button className="nav-button-right" onClick={handleNextMonth}>
          &gt; {/* 다음 달로 이동하는 버튼 */}
        </button>
      </div>
      <div className="calendar-grid">
        {Array.from({ length: days }).map((_, i) => (
          <div
            className={`calendar-cell ${
              selectedDay === i + 1 ? "selected" : ""
            }`}
            key={i}
            onClick={() => handleDayClick(i + 1)}
          >
            <div className="inner-grid">
              {projectsForDays &&
              projectsForDays[i] &&
              projectsForDays[i].length > 0
                ? projectsForDays[i].slice(0, 4).map((project, index) => (
                    <div
                      key={index}
                      className="inner-cell"
                      style={{ backgroundColor: project.color }} // 각 프로젝트 색상을 inner-cell에 적용
                    ></div>
                  ))
                : Array.from({ length: 4 }).map((_, index) => (
                    <div key={index} className="inner-cell"></div>
                  ))}
            </div>
          </div>
        ))}
      </div>
      <div className="diary-count">
        이번 달 {coloredCellsCount}개의 다이어리 작성
      </div>
    </div>
  );
};

export default CalendarLeft;

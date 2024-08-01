import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../components/calendar/Calendar.css";

import { ReactComponent as BackArrow } from "../assets/calendar/BackArrow.svg";
import { ReactComponent as NextArrow } from "../assets/calendar/NextArrow.svg";

const daysInMonth = (month, year) => {
  return new Date(year, month, 0).getDate();
};

const Calendar = () => {
  const navigate = useNavigate();
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth() + 1); // 현재 월 (0부터 시작하므로 +1)
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear()); // 현재 연도
  const [days, setDays] = useState(daysInMonth(currentMonth, currentYear)); // 현재 월의 일수
  const [selectedDay, setSelectedDay] = useState(1); // 선택된 날짜 상태
  const [selectedMonth, setSelectedMonth] = useState(currentMonth); // 선택된 월 상태

  useEffect(() => {
    setDays(daysInMonth(currentMonth, currentYear)); // 월과 연도가 변경될 때마다 일수를 계산
  }, [currentMonth, currentYear]);

  const handleDayClick = (day) => {
    setSelectedDay(day); // 선택된 날짜 업데이트
    setSelectedMonth(currentMonth); // 선택된 월 업데이트
  };

  const handlePreviousMonth = () => {
    if (currentMonth === 1) {
      setCurrentMonth(12);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 12) {
      setCurrentMonth(1);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  const projectColors = [
    { color: "#2D7295", name: "프로젝트1" },
    { color: "#AE5257", name: "프로젝트2" },
    { color: "#E19E58", name: "프로젝트3" },
    { color: "#83A67B", name: "프로젝트4" },
    { color: "#EAB3CE", name: "프로젝트5" },
  ];

  const projectOrder = [
    projectColors[0],
    projectColors[4],
    projectColors[3],
    projectColors[2],
  ];

  return (
    <div className="calendar-container">
      <div className="calendar-header">
        <button className="back-button" onClick={() => navigate(-1)}>
          <BackArrow />
        </button>
        <button className="header-text" onClick={() => navigate(-1)}>
          캘린더
        </button>
      </div>
      <div className="calendar-content">
        <div className="calendar-left">
          <div className="month-records">
            <button className="nav-button-left" onClick={handlePreviousMonth}>
              <BackArrow />
            </button>
            <div className="month-title">{currentMonth}월의 기록</div>
            <button className="nav-button-right" onClick={handleNextMonth}>
              <NextArrow />
            </button>
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
        <div className="calendar-right">
          <div className="diary-list-header">
            <div className="diary-list-title">
              {selectedMonth}월 {selectedDay}일의 다이어리
            </div>
          </div>
          <div className="diary-list-grid">
            {projectOrder.map((project, i) => (
              <div className="diary-card" key={i}>
                <div className="diary-project">
                  <div
                    className="color-box"
                    style={{ backgroundColor: project.color }}
                  ></div>
                  <div className="diary-project-name">{project.name}</div>
                </div>
                <div className="diary-title">내용</div>
                <div className="diary-writer">작성자</div>
              </div>
            ))}
          </div>
          <div className="project-colors">
            {projectColors.map((project, index) => (
              <div className="project-color" key={index}>
                <div
                  className="color-box"
                  style={{ backgroundColor: project.color }}
                ></div>
                <div className="project-name">{project.name}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calendar;

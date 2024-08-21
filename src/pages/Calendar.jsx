import React, { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import "../components/calendar/Calendar.css";
import CalendarLeft from "../components/calendar/CalendarLeft";

import { ReactComponent as BackArrow } from "../assets/calendar/BackArrow.svg";
import { ReactComponent as NextArrow } from "../assets/calendar/NextArrow.svg";

const daysInMonth = (month, year) => {
  return new Date(year, month, 0).getDate();
};

const getRandomProjectsForDay = (projectColors) => {
  const numberOfProjects = Math.floor(Math.random() * 5); // 0부터 4개의 프로젝트
  const shuffledColors = [...projectColors].sort(() => 0.5 - Math.random());
  return shuffledColors.slice(0, numberOfProjects);
};

const generateProjectsForDays = (days, projectColors) => {
  return Array.from({ length: days }, () =>
    getRandomProjectsForDay(projectColors)
  );
};

const Calendar = () => {
  const navigate = useNavigate();
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth() + 1); // 현재 월 (0부터 시작하므로 +1)
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear()); // 현재 연도
  const [selectedDay, setSelectedDay] = useState(1); // 선택된 날짜 상태

  const projectColors = [
    { color: "#2D7295", name: "프로젝트1" },
    { color: "#AE5257", name: "프로젝트2" },
    { color: "#E19E58", name: "프로젝트3" },
    { color: "#83A67B", name: "프로젝트4" },
    { color: "#EAB3CE", name: "프로젝트5" },
  ];

  const days = daysInMonth(currentMonth, currentYear);

  // 랜덤 프로젝트 데이터를 한 번만 생성하여 고정
  const [projectsForDays, setProjectsForDays] = useState(() =>
    generateProjectsForDays(days, projectColors)
  );

  useEffect(() => {
    // 월이 변경될 때마다 projectsForDays의 길이가 올바르게 조정되도록 함
    if (projectsForDays.length !== days) {
      setProjectsForDays(generateProjectsForDays(days, projectColors));
    }
  }, [days, projectsForDays.length]);

  const handleDayClick = (day) => {
    setSelectedDay(day); // 선택된 날짜 업데이트
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

  // 이번 달의 색칠된 셀의 개수 계산
  const coloredCellsCount = useMemo(() => {
    return projectsForDays.reduce((count, dayProjects) => {
      return (
        count +
        dayProjects.reduce(
          (innerCount, project) => innerCount + (project.color ? 1 : 0),
          0
        )
      );
    }, 0);
  }, [projectsForDays]);

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
        <CalendarLeft
          currentMonth={currentMonth}
          days={days}
          selectedDay={selectedDay}
          handlePreviousMonth={handlePreviousMonth}
          handleNextMonth={handleNextMonth}
          handleDayClick={handleDayClick}
          projectsForDays={projectsForDays} // props 전달
          coloredCellsCount={coloredCellsCount} // 추가된 props 전달
        />
        <div className="calendar-right">
          <div className="diary-list-header">
            <div className="diary-list-title">
              {currentMonth}월 {selectedDay}일의 다이어리
            </div>
          </div>
          <div className="diary-list-grid">
            {projectsForDays[selectedDay - 1]?.map((project, i) => (
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
        </div>
      </div>
    </div>
  );
};

export default Calendar;

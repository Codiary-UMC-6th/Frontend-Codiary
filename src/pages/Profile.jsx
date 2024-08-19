import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";

import * as Color from "../common/Color";
import { get, post } from "../common/api";

import UserInfo from "../components/profile/UserInfo";
import MyDiary from "../components/profile/MyDiary";
import CalendarLeft from "../components/calendar/CalendarLeft";

import { AddModal } from "../components/modal/AddModal";

const Container = styled.div`
  background-color: ${Color.background};
  display: flex;
  flex-direction: column;
  padding: 60px 130px;
`;

const Top = styled.div`
  display: flex;
`;

const CalendarWrapper = styled.div`
  background-color: var(--Gray-900, #222);
  height: 100%;
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer; /* 클릭 가능한 커서 */
`;

const Profile = () => {
  // load member info
  const { memberId } = useParams();
  const [userInfoData, setUserInfoData] = useState({});

  const [isAddProjectModalOpen, setIsAddProjectModalOpen] = useState(false);

  const openAddProjectModal = () => setIsAddProjectModalOpen(true);
  const closeAddProjectModal = () => setIsAddProjectModalOpen(false);


  const [isTechStackModalOpen, setIsTechStackModalOpen] = useState(false);

  const openTechStackModal = () => setIsTechStackModalOpen(true);
  const closeTechStackModal = () => setIsTechStackModalOpen(false);

  useEffect(() => {
    async function getUserInfo() {
      try {
        const result = await get(`/members/profile/${memberId}`);
        //console.log('GET 요청 결과:', result);
        setUserInfoData(result.result);
      } catch (error) {
        console.error('GET 요청 실패:', error);
      }
    }
    getUserInfo();
  }, [memberId]);

  // Calendar
  const navigate = useNavigate();

  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth() + 1);
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [days, setDays] = useState(
    new Date(currentYear, currentMonth, 0).getDate()
  );
  const [selectedDay, setSelectedDay] = useState(1);

  useEffect(() => {
    setDays(new Date(currentYear, currentMonth, 0).getDate());
  }, [currentMonth, currentYear]);

  const handleDayClick = (day) => setSelectedDay(day);

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

  const postAddTechStack = async (value) => {
    try {
      const response = await post(`/members/techstack/${value}`);
      alert(`TECH STACK '${value}' 추가를 성공했습니다.`);
      console.log(response);
    } catch (error) {
      alert('TECH STACK 추가를 실패했습니다.');
      console.error(error);
    }
  };

  const postAddProject = async (value) => {
    try {
      const response = await post(`/members/project/${value}`);
      alert(`프로젝트 '${value}' 추가를 성공했습니다.`);
      console.log(response);
    } catch (error) {
      alert('프로젝트 추가를 실패했습니다.');
      console.error(error);
    }
  };

  return (
    <>
      <Container>
        <Top>
          <UserInfo userInfoData={userInfoData} onClick={openTechStackModal} />
          <CalendarWrapper onClick={() => navigate("/calendar")}>
            <CalendarLeft
              currentMonth={currentMonth}
              days={days}
              selectedDay={selectedDay}
              handlePreviousMonth={handlePreviousMonth}
              handleNextMonth={handleNextMonth}
              handleDayClick={handleDayClick}
            />
          </CalendarWrapper>
        </Top>
        <MyDiary memberId={memberId} onClick={openAddProjectModal} />
      </Container>
      {isAddProjectModalOpen &&
        <AddModal
          title='프로젝트 추가하기'
          placeholder='input name = "project"'
          onAdd={postAddProject}
          onClose={closeAddProjectModal}
        />
      }
      {isTechStackModalOpen &&
        <AddModal
          title='TECH STACK 추가하기'
          placeholder='input name = "tech_stack"'
          onAdd={postAddTechStack}
          onClose={closeTechStackModal}
        />
      }
    </>
  );
};

export default Profile;

import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";

import * as Color from "../common/Color";

import UserInfo from "../components/profile/UserInfo";
import MyDiary from "../components/profile/MyDiary";
import CalendarLeft from "../components/calendar/CalendarLeft";

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
  const [ userInfoData, setUserInfoData ] = useState({});

  useEffect(() => {
    axios.get('/members/profile/1',{
      headers: {
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ6eGM1MzRAbmF2ZXIuY29tIiwiYXV0aCI6IlJPTEVfVVNFUiIsIm1lbWJlcklkIjoxLCJleHAiOjE3MjMyOTYzMTl9.uYN3kL521eiM26kRJF2NlQHLuIzHMgfoGaaOi8XhEuE'
      }
    })
      .then((Response) => {
        //console.log(Response.data.result);
        setUserInfoData(Response.data.result);
      }) 
      .catch((Error) => {console.log(Error)})
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

  return (
    <Container>
      <Top>
        <UserInfo userInfoData={userInfoData}/>
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
      <MyDiary memberId={memberId}/>
    </Container>
  );
};

export default Profile;

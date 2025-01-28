import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";

import * as Color from "../common/Color";
import { get, post } from "../common/api";

import UserInfo from "../components/profile/UserInfo";
import MyDiary from "../components/profile/MyDiary";
import CanlendarPreview from "../components/profile/CalendarPreview";

import { AddModal } from "../components/modal/AddModal";
import NextSVG from "../assets/profile/calendar_icon_next.svg";

import { getMemberProfile, patchTeckstackData } from "@/shared/api/profile";
import { memberProfile } from "@/shared/api/profile/type";

const Profile = () => {
  // load member info
  const { memberId } = useParams<string>();
  const [memberProfileData, setMemberProfileData] = useState<memberProfile>();
  const [techstackList, setTechstackList] = useState<string[]>([]);
  const [teamList, setTeamList] = useState([]);

  const [isAddProjectModalOpen, setIsAddProjectModalOpen] = useState(false);

  const openAddProjectModal = () => setIsAddProjectModalOpen(true);
  const closeAddProjectModal = () => setIsAddProjectModalOpen(false);

  const [isTechstackModalOpen, setIsTechstackModalOpen] = useState(false);

  const openTechstackModal = () => setIsTechstackModalOpen(true);
  const closeTechstackModal = () => setIsTechstackModalOpen(false);

  const loadProfile = async () => {
    const response = await getMemberProfile(memberId);
    console.log(response);
    setMemberProfileData(response);
    setTechstackList(response.tech_stacks_list);
  };

  useEffect(() => {
    loadProfile();
  }, []);
  /*
    useEffect(() => {
    async function getUserInfo() {
      try {
        const result = await get(`/members/profile/${memberId}`);
        console.log('GET 요청 결과:', result);
        setUserInfoData(result.result);
        setTechStackList(result.result.techStacksList);
        setTeamList(result.result.teamList);
        console.log(techStackList);
      } catch (error) {
        console.error('GET 요청 실패:', error);
      }
    }
    getUserInfo();
  }, [memberId]);
  */

  // Calendar
  const navigate = useNavigate();

  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth() + 1);
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [days, setDays] = useState(
    new Date(currentYear, currentMonth, 0).getDate()
  );
  const [selectedDay, setSelectedDay] = useState<number>(1);

  useEffect(() => {
    setDays(new Date(currentYear, currentMonth, 0).getDate());
  }, [currentMonth, currentYear]);

  const handleDayClick = (day: number) => setSelectedDay(day);

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

  const postAddTechStack = async (value: string) => {
    try {
      const response = await patchTeckstackData(value);
      alert(`TECH STACK '${value}' 추가를 성공했습니다.`);
      console.log(response);
      closeTechstackModal();
      window.location.reload();
    } catch (error) {
      //if (error.response.status === 400) {
      //  alert('TECH STACK은 JAVA, SPRING, JAVA_SCRIPT, REACT, CSS, HTML, NODE_JS만 입력 가능합니다.')
      //} else {
      //  alert('TECH STACK 추가를 실패했습니다.');
      //  console.error(error.response);
      //}
    }
  };

  const postAddProject = async (value: string) => {
    try {
      const response = await post(`/members/project/${value}`);
      alert(`프로젝트 '${value}' 추가를 성공했습니다.`);
      console.log(response);
      closeAddProjectModal();
    } catch (error) {
      alert("프로젝트 추가를 실패했습니다.");
      console.error(error);
    }
  };

  return (
    <>
      <Container>
        <Top>
          <UserInfo
            props={{
              memberProfileData: memberProfileData,
              onClick: openTechstackModal,
              techstackList: techstackList,
              teamList: teamList,
            }}
          />
          <CalendarWrapper onClick={() => navigate("/calendar")}>
            <CalendarTop>
              캘린더<NextIcon src={NextSVG}></NextIcon>
            </CalendarTop>
            <CanlendarPreview></CanlendarPreview>
          </CalendarWrapper>
        </Top>
        <MyDiary memberId={memberId} onClick={openAddProjectModal} />
      </Container>
      {isAddProjectModalOpen && (
        <AddModal
          title="프로젝트 추가하기"
          placeholder='input name = "project"'
          onAdd={postAddProject}
          onClose={closeAddProjectModal}
        />
      )}
      {isTechstackModalOpen && (
        <AddModal
          title="TECH STACK 추가하기"
          placeholder='input name = "tech_stack"'
          onAdd={postAddTechStack}
          onClose={closeTechstackModal}
        />
      )}
    </>
  );
};

const Container = styled.div`
  background-color: ${Color.background};
  display: flex;
  flex-direction: column;
  padding: 60px 130px;
`;

const Top = styled.div`
  display: flex;
  color: ${Color.text1};
  font-family: Pretendard;
  font-size: 32px;
  font-style: normal;
  font-weight: 600;
  line-height: 48px;
`;

const CalendarWrapper = styled.div`
  margin-top: 80px;
  height: 400px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  cursor: pointer; /* 클릭 가능한 커서 */
`;

const CalendarTop = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`;

const NextIcon = styled.img`
  margin-left: 4px;
  width: 32px;
  height: 32px;
`;

export default Profile;

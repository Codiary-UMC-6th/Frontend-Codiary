import { BrowserRouter, Route, Routes } from "react-router-dom";
import React, { useState } from "react";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Main from "./pages/Main";
import Profile from "./pages/Profile";
import Team from "./pages/Team";

import Calendar from "./pages/Calendar";
import Diary from "./pages/Diary";
import DiaryDetails from "./pages/DiaryDetails";
import DiaryRegister from "./components/diary/diary-register";
import { LoginModal } from "./components/login/LoginModal";
import "./App.css";
import { useState } from "react";

import { get, post, put, del } from "./common/api";
import TeamAdd from "./components/team/teamAdd";

function App() {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  const openLoginModal = () => setIsLoginModalOpen(true);
  const closeLoginModal = () => setIsLoginModalOpen(false);

  const handleClick = async () => {
    const data = {
      email: "zxc534@naver.com",
      password: "qwer1234",
    };

    try {
      const result = await post("/members/login", data);
      console.log("POST 요청 결과:", result);
    } catch (error) {
      console.error("POST 요청 실패:", error);
    }
  };

  return (
    <BrowserRouter>
      <Navbar />
      <div id="main-content">
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/profile/:memberId" element={<Profile />} />
          <Route path="/team" element={<Team />} />
          <Route path="/teamAdd" element={<TeamAdd />} />
          <Route path="/calendar" element={<Calendar />} />
          <Route path="/diary" element={<Diary />} />
          <Route path="/DiaryDetails/:id" element={<DiaryDetails />} />
          <Route path="/diary-register" element={<DiaryRegister />} />
          <Route path="*" element={"404 not found"} />
        </Routes>
        <button onClick={openLoginModal}>Login</button>
        {isLoginModalOpen && <LoginModal onClose={closeLoginModal} />}
      </div>
      <Footer />
    </BrowserRouter>
  );
}

export default App;

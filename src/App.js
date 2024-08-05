import React, { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Main from "./pages/Main";
import Profile from "./pages/Profile";
import Team from "./pages/Team";
import { LoginModal } from "./components/login/LoginModal";

import "./App.css";

import { get, post, put, del } from './common/api'; 

function App() {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  const openLoginModal = () => setIsLoginModalOpen(true);
  const closeLoginModal = () => setIsLoginModalOpen(false);

  const handleClick = async () => {
    const data = {
      email: "zxc534@naver.com",
      password: "qwer1234"
    };
  
    try {
      const result = await post('/members/login', data);
      console.log('POST 요청 결과:', result);
    } catch (error) {
      console.error('POST 요청 실패:', error);
    }
  }  

  return (
    <BrowserRouter>
      <Navbar />
      <div id="main-content">
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/team" element={<Team />} />
          <Route path="*" element={"404 not found"} />
        </Routes>
        <button onClick={openLoginModal}>Login</button>
        {isLoginModalOpen && <LoginModal onClose={closeLoginModal} />}
        <button onClick={handleClick}>테스트 버튼</button>
      </div>
      <Footer />
    </BrowserRouter>
  );
}

export default App;

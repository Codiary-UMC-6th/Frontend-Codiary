import React, { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Main from "./pages/Main";
import Profile from "./pages/Profile";
import Team from "./pages/Team";
import Calendar from "./pages/Calendar";
import Diary from "./pages/Diary";
import DiaryRegister from "./components/diary/diary-register";
import { LoginModal } from "./components/login/LoginModal";

import "./App.css";

function App() {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  const openLoginModal = () => setIsLoginModalOpen(true);
  const closeLoginModal = () => setIsLoginModalOpen(false);

  return (
    <BrowserRouter>
      <Navbar />
      <div id="main-content">
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/team" element={<Team />} />
          <Route path="/calendar" element={<Calendar />} />
          <Route path="/diary" element={<Diary />} />
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

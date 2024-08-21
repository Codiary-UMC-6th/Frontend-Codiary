import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useState } from "react";

import Navbar from "./components/navbar/Navbar";
import Footer from "./components/Footer";
import Main from "./pages/Main";
import Profile from "./pages/Profile";
import Team from "./pages/Team";

import Calendar from "./pages/Calendar";
import Diary from "./pages/Diary";
import DiaryDetails from "./pages/DiaryDetails";
import DiaryRegister from "./components/diary/diary-register";
import { SignUp } from "./components/signup/SignUp";
import { ModifyProfile } from "./components/profile/ModifyProfile.jsx";

import "./App.css";

import TeamAdd from "./components/team/teamAdd";
import TeamEdit from "./components/team/teamEdit";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <div id="main-content">
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/profile/:memberId" element={<Profile />} />
          <Route path="/team/:teamId" element={<Team />} />
          <Route path="/teamAdd" element={<TeamAdd />} />
          <Route path="teamEdit/:teamId" element={<TeamEdit />} />
          <Route path="/calendar" element={<Calendar />} />
          <Route path="/diary" element={<Diary />} />
          <Route path="/DiaryDetails/:postId" element={<DiaryDetails />} />
          <Route path="/diary-register" element={<DiaryRegister />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/modify-profile" element={<ModifyProfile />} />
          <Route path="*" element={"404 not found"} />
        </Routes>
      </div>
      <Footer />
    </BrowserRouter>
  );
}

export default App;

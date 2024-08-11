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

import "./App.css";

import TeamAdd from "./components/team/teamAdd";

function App() {

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
      </div>
      <Footer />
    </BrowserRouter>
  );
}

export default App;

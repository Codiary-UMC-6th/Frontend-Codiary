import { BrowserRouter, Route, Routes } from "react-router-dom";

import Navbar from "./components/navbar/Navbar.tsx";
import Footer from "./components/Footer.jsx";
import Main from "./pages/Main.jsx";
import Profile from "./pages/Profile.jsx";
import Team from "./pages/Team.jsx";

import Calendar from "./pages/Calendar.jsx";
import Diary from "./pages/Diary.jsx";
import DiaryDetails from "./pages/DiaryDetails.tsx";
import DiaryRegister from "./components/diary/diary-register.jsx";
import { SignUp } from "./components/signup/SignUp.tsx";
import { ModifyProfile } from "./components/profile/ModifyProfile.jsx";
import KakaoCallback from "@/components/login/component/KakaoCallback.tsx";

import Example from "./pages/Example.jsx";

import "./App.css";

import TeamAdd from "./components/team/teamAdd.jsx";
import TeamEdit from "./components/team/teamEdit.jsx";

function App() {
  // 인증 코드가 있는지 확인
  const isKakaoCallback = new URLSearchParams(window.location.search).has(
    "code"
  );

  return (
    <BrowserRouter>
      <Navbar />
      <div id="main-content">
        <Routes>
          <Route
            path="/"
            element={
              new URLSearchParams(window.location.search).has("code") ? (
                <KakaoCallback />
              ) : (
                <Main />
              )
            }
          />
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
          <Route path="/oauth/callback" element={<KakaoCallback />} />
          <Route path="*" element={"404 not found"} />

          <Route path="/example" element={<Example />} />
        </Routes>
      </div>
      <Footer />
    </BrowserRouter>
  );
}

export default App;

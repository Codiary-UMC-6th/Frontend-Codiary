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
import { useLoginStore } from "@/store/LoginStore";
import { useEffect } from "react";

function App() {
  const initializeLoginState = useLoginStore(
    (state) => state.initializeLoginState
  );
  const isLoading = useLoginStore((state) => state.isLoading);
  const isLogin = useLoginStore((state) => state.isLogin);

  useEffect(() => {
    initializeLoginState();
  }, [initializeLoginState]);

  if (isLoading) {
    return <div>로딩 중...</div>;
  }

  return (
    <BrowserRouter>
      <Navbar isLogin={isLogin} />
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

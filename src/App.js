import { BrowserRouter, Route, Routes } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Main from "./pages/Main";
import Profile from "./pages/Profile";
import Team from "./pages/Team";

import "./App.css";

function App() {
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
      </div>
      <Footer />
    </BrowserRouter>
  );
}

export default App;

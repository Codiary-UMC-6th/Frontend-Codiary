import { BrowserRouter, Route, Routes } from "react-router-dom";

import Navbar from './components/Navbar'
import Main from './pages/Main';
import Profile from './pages/Profile';
import Team from './pages/Team';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <div id="main-content">
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/team" element={<Team />} />
        
        <Route path="*" element={"404 not found"}/>
      </Routes>
      </div>
      
    </BrowserRouter>
  );
}

export default App;

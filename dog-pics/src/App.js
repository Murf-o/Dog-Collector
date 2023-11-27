import logo from './logo.svg';
import './App.css';
import MyPage from './components/MyPage';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from './components/LoginPage';
import CollectedDogsPage from './components/CollectedDogsPage';
function App() {
  return (
    
    <BrowserRouter>
      <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/get-dogs/:username" element={<MyPage />} />
          <Route path="/user-dogs/:username" element={<CollectedDogsPage />} />
      </Routes>
    </BrowserRouter>
   
  );
}

export default App;
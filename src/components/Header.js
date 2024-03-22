import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AppBar from './AppBar';
import LoginBox from './LoginBox';
import InputBox from './InputBox';
import Home from './Home';

function Header() {
  return (
    <Router>
        <AppBar />
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/login" element={<LoginBox />} />
        <Route path="/register" element={<InputBox />} />
      </Routes>
    </Router>
  );
}

export default Header;

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginBox from './LoginBox';
import InputBox from './InputBox';
import Home from './Home';
import Donor from './Donor';

function Header() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/login" element={<LoginBox />} />
        <Route path="/register" element={<InputBox />} />
        <Route path="/donor" element={<Donor/>} />
      </Routes>
    </Router>
  );
}

export default Header;

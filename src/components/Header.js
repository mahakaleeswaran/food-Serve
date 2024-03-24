import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginBox from './LoginBox';
import InputBox from './InputBox';
import Home from './Home';
import Donor from './Donor';
import Reciever from './Reciever';
import RecieverAccepted from './RecieverAccepted';


function Header() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/login" element={<LoginBox />} />
        <Route path="/register" element={<InputBox />} />
        <Route path="/donor/:userId" element={<Donor/>} />
        <Route path="/reciever/:userId" element={<Reciever/>} />
        <Route path="/reciever/:userId/accepted" element={<RecieverAccepted/>} />
      </Routes>
    </Router>
  );
}

export default Header;

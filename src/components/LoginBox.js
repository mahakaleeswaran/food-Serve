import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { buttonStyles } from './sharedStyles';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import {ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AppBar from './AppBar';
import { useNavigate } from 'react-router-dom';


export default function LoginBox() {

  const [users,setUsers] =  useState({});
  const navigate = useNavigate();


  useEffect(()=>{
    fetch("http://localhost:8084/admin/get").then((response)=>response.json()).then((json)=>{
        setUsers(json)
    })
  },[])


  const[username,setUsername] =  useState();
  const[password,setPassword] = useState();
  const[userRole,setUserRole]= useState();


  const handleLogin = (e) => {
    const isLoginSuccessful = users.some(user => user.username === username && user.confirmPassword === password && user.userRole === userRole);
    if (isLoginSuccessful) {
        toast.success("Login successful");
        const loginObject = {
            "userRole": userRole,
            "username": username
        };
        fetch("http://localhost:8084/admin/getUserId", {
            method: "POST",
            body: JSON.stringify(loginObject),
            headers: {
                "Content-Type": "application/json; charset=UTF-8"
            }
        }).then((response) => response.json())
        .then((json) => {
            if (userRole === 'donor' && json.userId) {
                navigate(`/donor/${json.userId}`);
            } else if (userRole === 'receiver' && json.userId) {
                navigate(`/reciever/${json.userId}`);
            } else {
                console.error("User ID not found in response");
            }
        })
        .catch((error) => {
            console.error("Error fetching user ID:", error);
        });
    } else {
        toast.error("Invalid credentials");
    }
    e.preventDefault();
};



return (
  <>
      <AppBar />
      <Box
          component="form"
          sx={{
            width: '90%',
            maxWidth: '500px',
            border: '2px solid #E0E0E0',
            padding: '17px',
            borderRadius: '10px',
            display: 'flex',
            height:'250px',
            flexDirection: 'column',
            margin: '10px auto',
            bgcolor: '#F9F9F9',
          }}
          noValidate
          autoComplete="off"
      >
          <Select
              onChange={(e) => {
                  setUserRole(e.target.value);
              }}
              variant="outlined"
              sx={{ height: '40px', margin: '10px' }}
          >
              <MenuItem value="donor">Donor</MenuItem>
              <MenuItem value="receiver">Receiver</MenuItem>
          </Select>
          <TextField
              onChange={(e) => {
                  setUsername(e.target.value);
              }}
              label="Username"
              name="username"
              variant="outlined"
              sx={{ height: '40px', margin: '12px' }}
          />
          <TextField
              label="Password"
              type="password"
              onChange={(e) => {
                  setPassword(e.target.value);
              }}
              name="password"
              variant="outlined"
              sx={{ height: '40px', margin: '12px' }}
          />
          <button style={buttonStyles} onClick={handleLogin}>Submit</button>
          <ToastContainer position="top-center" autoClose={3000} />
      </Box>
  </>
);
}

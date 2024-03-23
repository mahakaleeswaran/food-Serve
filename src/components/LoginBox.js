import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { buttonStyles } from './sharedStyles';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import {ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AppBar from './AppBar';


export default function LoginBox() {

  const [users,setUsers] =  useState({});


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
    } else {
      toast.error("Invalid credentials");
    }
    e.preventDefault();
  };



  return (
    <>
    <AppBar/>
    <Box
      component="form"
      sx={{
        width: '100%',
        maxWidth: '500px',
        border: '2px solid #E0E0E0',
        padding: '10px',
        borderRadius: '10px',
        display: 'flex',
        flexDirection: 'column',
        gap: '5px',
        margin: '40px auto',
        bgcolor: '#F9F9F9',
      }}
      noValidate
      autoComplete="off"
    >
      <Select
        onChange={(e)=>{
          setUserRole(e.target.value)
        }}
        variant="outlined"
        sx={{ '& .MuiSelect-select': { backgroundColor: '#F5F5F5', color: '#333', borderRadius: '5px' }, height: '40px', margin: '17px' }}
      >
        <MenuItem value="donor">Donor</MenuItem>
        <MenuItem value="receiver">Receiver</MenuItem>
        <MenuItem value="admin">Admin</MenuItem>
      </Select>
      <TextField 
  onChange={(e) => {
      setUsername(e.target.value);
  }} 
  label="Username" 
  name="username" 
  variant="outlined" 
  sx={{ '& .MuiInputBase-input': { backgroundColor: '#F5F5F5', color: '#333', borderRadius: '5px' }, height: '25px', margin: '17px' }} 
/>
      <TextField label="Password" type="password"  onChange={(e)=>{
        setPassword(e.target.value)
      }}  name="password" variant="outlined" sx={{ '& .MuiInputBase-input': { backgroundColor: '#F5F5F5', color: '#333', borderRadius: '5px' }, height: '25px', margin: '17px' }} />
    <button style={buttonStyles} onClick={handleLogin}>Submit</button>
    <ToastContainer position="top-center" autoClose={3000} />
    </Box>
    </>
  );
}

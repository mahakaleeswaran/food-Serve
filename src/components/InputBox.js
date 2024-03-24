import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { buttonStyles } from './sharedStyles';
import {ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AppBar from './AppBar';

export default function InputBox() {
    const [registerObject, setRegisterObject] = useState({});
    const [showWarning, setShowWarning] = useState(false);
    const [credentials, setCredentials] = useState({});
    const [password, setPassword] = useState("");
    const [user,setUser]=useState("");
    const[isUsernameExists,setUerNameExists] = useState(false);
    const [users,setUsers] =  useState({});


    useEffect(()=>{
        fetch("http://localhost:8084/admin/get").then((response)=>response.json()).then((json)=>{
            setUsers(json)
            console.log(json)
        })
      },[])

    useEffect(() => {
        setCredentials(prev => ({
            ...prev,
            "userRole": user
        }));
    }, [user]);

    useEffect(() => {
        const checkPassword = () => {
            if (password !== credentials.confirmPassword) {
                setShowWarning(true);
            } else {
                setShowWarning(false);
            }
        };
    
        checkPassword();
    }, [password, credentials.confirmPassword, user]);

    function handleRegister(e) {
        e.preventDefault();
        console.log(credentials);
        postCredentials();
        postInDatabase();
    }

    function postCredentials() {
        setCredentials(prev => ({
            ...prev,
            "userRole": user
        }));
    
        fetch("http://localhost:8084/admin/register", {
            method: "POST",
            body: JSON.stringify(credentials),
            headers: {
                "Content-Type": "application/json; charset=UTF-8"
            }
        })
        .then(data => {
                toast.success("Credentials Registration successful");
        })
        .catch(error => {
            toast.error("Credentials Registration Failed");
        });
    }
    


    function postInDatabase() {
        if (registerObject) {
            if(user==='donor'){
                fetch("http://localhost:8084/donor/register", {
                method: "POST",
                body: JSON.stringify(registerObject),
                headers: {
                    "Content-Type": "application/json; charset=UTF-8 "
                }
            })
            .then(response => response.json())
            .then(data => {
                toast.success("Account creation successful")
            })
            .catch(e => {
                toast.error("Account creation failed");
            });
            }else if(user==='receiver'){
                fetch("http://localhost:8084/reciever/register", {
                method: "POST",
                body: JSON.stringify(registerObject),
                headers: {
                    "Content-Type": "application/json; charset=UTF-8 "
                }
            })
            .then(response => response.json())
            .then(data => {
                toast.success("Account creation successful")
            })
            .catch(e => {
                toast.error("Account creation failed");
            });
            }
        } else {
            console.log("object is empty");
        }
    }



    return (
        <>
        <AppBar />
        <Box
            component="form"
            sx={{
                width: '100%',
                maxWidth: '500px',
                border: '2px solid #E0E0E0',
                padding: '10px',
                borderRadius: '10px',
                display: 'flex',
                height:'700px',
                flexDirection: 'column',
                margin: '10px auto',
                bgcolor: '#F9F9F9',
            }}
            noValidate
            autoComplete="off"
        >
            <Select
    variant="outlined"
    value={user}
    onChange={(e) => setUser(e.target.value)}
    sx={{ '& .MuiSelect-select': { backgroundColor: '#F5F5F5', color: '#333', borderRadius: '5px' }, height: '40px', marginLeft: '20px',marginRight: '20px',marginTop:'10px' }}
>
    <MenuItem value="donor">Donor</MenuItem>
    <MenuItem value="receiver">Receiver</MenuItem>
</Select>
            <TextField
                label="Username"
                variant="outlined"
                onChange={(e) => {
                    const isUsernameExists = users.some(user => user.username === e.target.value);
                    if (isUsernameExists) {
                         setUerNameExists(true);
                    } else {
                      setUerNameExists(false);
                      setRegisterObject((previousState)=>({
                        ...previousState,
                        username: e.target.value
                    }));
                    setCredentials((previousState) => ({
                        ...previousState,
                        username: e.target.value
                    }));
                    }
                }}
                sx={{ '& .MuiInputBase-input': { backgroundColor: '#F5F5F5', color: '#333', borderRadius: '5px' }, height: '20px', margin: '22px' }}
            />
            {isUsernameExists && (
<div style={{ display: 'flex', alignItems: 'center', marginTop: '15px', marginLeft: '25px' }}>
  <span style={{ color: 'red' }}>Username already exists</span>
</div>
)}
            <TextField
                label="Password"
                type="password"
                variant="outlined"
                onChange={(e) => {
                    setPassword(e.target.value);
                }}
                sx={{ '& .MuiInputBase-input': { backgroundColor: '#F5F5F5', color: '#333', borderRadius: '5px' }, height: '20px', margin: '22px' }}
            />
           <TextField
    label="Confirm Password"
    type="password"
    variant="outlined"
    onChange={(e) => {
        setCredentials((previousState) => ({
            ...previousState,
            confirmPassword: e.target.value 
        }));
    }}
    sx={{ '& .MuiInputBase-input': { backgroundColor: '#F5F5F5', color: '#333', borderRadius: '5px' }, height: '20px', margin: '22px' }}
/>
{showWarning && password !== credentials.confirmPassword && password && (
    <div style={{ display: 'flex', alignItems: 'center', marginTop: '15px',marginLeft:'25px' }}>
        <span style={{ color: 'red' }}>Passwords do not match</span>
    </div>
)}
            {[...Array(5)].map((_, index) => (
                <TextField
                    onChange={(e) => {
                       

            setRegisterObject((previousState) => ({
                ...previousState,
                [e.target.name]: e.target.value
            }));
        }}
        key={index}
        name={
            index === 0 ? 'name' : 
            index === 1 ? 'organization' : 
            index === 2 ? 'email' : 
            index === 3 ? 'phoneNumber' : 
            'address'
        }
        label={
            index === 0 ? 'Name' : 
            index === 1 ? 'Organization' : 
            index === 2 ? 'Email' : 
            index === 3 ? 'Phone Number' : 
            'Address'
        }
        variant="outlined"
        sx={{ '& .MuiInputBase-input': { backgroundColor: '#F5F5F5', color: '#333', borderRadius: '5px' }, height: '20px', margin: '22px' }}
    />
))}
<h5 style={{ fontSize: '12px', color: '#888', marginTop: '17px', marginBottom: '5px' }}>Expected format: DoorNo, Street, Area, City, District, State, ZipCode</h5>
      <button style={buttonStyles} disabled={showWarning || isUsernameExists} onClick={handleRegister}>Submit</button>
      <ToastContainer position="top-center" autoClose={3000} />
    </Box>
    </>
  );
}







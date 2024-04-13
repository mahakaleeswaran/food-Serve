import React, { useEffect, useState } from "react";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import {ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";
import {useParams} from 'react-router-dom';



const buttonStyles = {
    fontFamily: "'Times New Roman', Serif",
    width: '100px',
    height:'30px',
    border: '1px solid black',
    background: 'white',
    cursor: 'pointer',
    padding: '5px',
    margin: '5px',
    borderRadius: '5px',
    fontWeight: 'bold',
    color: 'black',
  };


  
  function RecieverAppBar() {

    const navigate = useNavigate()
    let { userId } = useParams();

    const[userProfile,setUserProfile] = useState({})

    useEffect(()=>{
        fetch(`http://localhost:8084/reciever/${userId}`).then((response)=>response.json()).then((json)=>{
            setUserProfile(()=>json)
        })
      },[])


      function handleChange(value, key) {
        setUserProfile((previousState) => {
            return {
                ...previousState,
                [key]: value
            };
        });
    }


    function handleUpdate(){
        fetch(`http://localhost:8084/reciever/${userId}/updateDetails`, {
            method: "PUT",
            body: JSON.stringify(userProfile),
            headers: {
                "Content-Type": "application/json; charset=UTF-8"
            }
        })
        .then(data => {
                toast.success("Profile Updation successful");
                setOpen(false)
        })
        .catch(error => {
            toast.error("Profile Updation Failed");
        });
    }

    function handleDelete(){
        fetch(`http://localhost:8084/reciever/${userId}/delete`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json; charset=UTF-8"
            }
        })
        .then(data => {
                toast.error("Profile Deleted");
        })
        .catch(error => {
            toast.error("Profile Updation Failed");
        });
    }



    const [open, setOpen] = React.useState(false);

    const toggleDialog = () => {
        setOpen(!open);
    };


    function handleAccepted(){
        navigate(`/reciever/${userId}/accepted`)
    }

    function handleLogout(){
        navigate("/")
    }




    return (
        <>
        <Box
            sx={{
                bgcolor: '#282828',
                height: '50px',
                width: '100%',
                padding: '0 20px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                boxSizing: 'border-box',
                '@media (max-width: 700px)': {
                    flexDirection: 'column',
                    height: 'auto',
                },
            }}
        >
            <h3 style={{ color: 'white', padding: '2px', cursor: 'pointer' }}>Food Serve</h3>
            <Box sx={{ display: 'flex' }}>
               <div>
               <Dialog open={open} onClose={toggleDialog}>
                    <DialogTitle style={{fontFamily: "'Times New Roman', Serif", fontWeight: 'bold',}}>Profile</DialogTitle>
                    <div></div>
                    <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: '10px', padding: '20px'}}>
                    <TextField id="name" label="Name" onChange={(e) => handleChange(e.target.value, "name")} value={userProfile.name} variant="outlined" sx={{ width: '100%' }} />
                    <TextField id="email" label="Email" onChange={(e) => handleChange(e.target.value, "email")} value={userProfile.email} variant="outlined" sx={{ width: '100%' }} />
                    <TextField id="organization" label="Organization" onChange={(e) => handleChange(e.target.value, "organization")} value={userProfile.organization} variant="outlined" sx={{ width: '100%' }} />
                    <TextField id="phoneNumber" label="Phone Number" onChange={(e) => handleChange(e.target.value, "phoneNumber")} value={userProfile.phoneNumber} variant="outlined" sx={{ width: '100%' }} />
                    <TextField id="address" label="Address" onChange={(e) => handleChange(e.target.value, "address")} value={userProfile.address} variant="outlined" sx={{ width: '100%' }} />
                    <h5 style={{ fontSize: '12px', color: '#888', marginTop: '17px', marginBottom: '5px', marginLeft:"10px"}}>Expected format: DoorNo, Street, Area, City, District, State, ZipCode</h5>
                    </DialogContent>
                        <button variant="contained" onClick={handleUpdate} style={{ backgroundColor: '#4CAF50', color: 'white',width:"91%",margin:'5px 19px',height:"50px",fontWeight: 'bold',fontFamily: "'Times New Roman', Serif",border:null}}>Update Details</button>
                        <button variant="contained" onClick={handleDelete} style={{ backgroundColor: 'red', color: 'white' ,width:"91%",margin:'5px 19px',marginBottom:'10px',height:"50px",fontWeight: 'bold',fontFamily: "'Times New Roman', Serif",border:null}}>Delete Account</button>
                </Dialog>
               </div>
                <button onClick={handleAccepted} style={buttonStyles}>Accepted</button>
                <button style={buttonStyles} onClick={toggleDialog}>Profile</button>
                <button onClick={handleLogout} style={buttonStyles}>Logout</button>
            </Box>
        </Box>
       
        <ToastContainer position="top-center" autoClose={3000} />
        </>
    );
}

export default RecieverAppBar;

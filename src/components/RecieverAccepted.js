import React,{useEffect, useState} from "react";
import Box from '@mui/material/Box';
import { useNavigate } from "react-router-dom";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
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


function RecieverAccepted(){
    const navigate = useNavigate()
    const [posts,setPosts] = useState([])
    let { userId } = useParams();


    useEffect(()=>{
        fetch(`http://localhost:8084/reciever/${userId}/getAcceptedPosts`).then((response)=>response.json()).then(json =>setPosts(json))
    })

    function handleBack(){
        navigate(`/reciever/${userId}`)
    }

    function handleLogout(){
        navigate("/")
    }
    return <>
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
            <h3 style={{ color: 'white', margin: 0, cursor: 'pointer' }}>Food Serve</h3>
            <Box sx={{ display: 'flex' }}>
                <button onClick={handleBack}  style={buttonStyles}>Back</button>
                <button onClick={handleLogout} style={buttonStyles}>Logout</button>
            </Box>
        </Box>
        <Grid container spacing={2} justifyContent="center">
                {posts.slice().reverse().map((post, index) => (
                    <Grid item key={index} xs={12} sm={6} md={4} lg={3}>
                        <div>
                        <Card style={{ borderRadius: '10px', height: '100%', margin: '20px', padding: '10px' }}>
                            <h5 style={{ fontSize: '14px', marginTop: '10px', marginBottom: '5px', marginLeft: "15px", textAlign: "left",color:'red'}}>Address</h5>
                            <h5 style={{ fontSize: '14px', marginTop: '10px', marginBottom: '5px', marginLeft: "15px", textAlign: "left" }}>{post.location}</h5>
                            <h5 style={{ fontSize: '14px', marginTop: '10px', marginBottom: '5px', marginLeft: "15px", textAlign: "left",color:'red'}}>Donor Details</h5>
                            <h5 style={{ fontSize: '14px', marginTop: '5px', marginBottom: '5px', marginLeft: "15px", textAlign: "left" }}>{post.donorName}</h5>
                            <h5 style={{ fontSize: '14px', marginTop: '5px', marginBottom: '5px', marginLeft: "15px", textAlign: "left" }}>{post.donorPhoneNumber}</h5>
                            <h5 style={{ fontSize: '14px', marginTop: '5px', marginBottom: '5px', marginLeft: "15px", textAlign: "left" }}>{post.donorEmail}</h5>
                            <CardContent>
                                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                                    <thead>
                                        <tr style={{ background: '#f2f2f2' }}>
                                            <th style={{ padding: '8px', backgroundColor: "#4CAF50", color: "white" }}>Food item</th>
                                            <th style={{ padding: '8px', backgroundColor: "#4CAF50", color: "white" }}>Quantity</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {post.posts.map((food, foodIndex) => (
                                            <tr key={foodIndex} style={{ background: foodIndex % 2 === 0 ? '#f9f9f9' : 'white' }}>
                                                <td style={{ padding: '8px', border: '1px solid #ddd' }}>{food.foodName}</td>
                                                <td style={{ padding: '8px', border: '1px solid #ddd' }}>{food.quantity}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </CardContent>
                        </Card>
                        </div>
                    </Grid>
                ))}
            </Grid>
    </>

}

export default RecieverAccepted;
import DonorAppBar from './DonorAppBar';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import React, { useEffect, useState} from "react";
import {useParams} from 'react-router-dom';

function Donor() {
    const [userProfile, setUserProfile] = useState({});
    let { userId } = useParams();


    useEffect(() => {
        if (userId) {
          fetch(`http://localhost:8084/donor/${userId}`)
            .then((response) => response.json())
            .then((json) => {
              setUserProfile(json);
            });
        }
      }, [])


    const reverseDateFormat = (dateString) => {
        const parts = dateString.split("-");
        return `${parts[2]} / ${parts[1]} / ${parts[0]}`;
    };

    return (
        <>
            <DonorAppBar />
            <Grid container spacing={2} justifyContent="center">
                {userProfile.posts && userProfile.posts.slice().reverse().map((post, index) => (
                    <Grid item key={index} xs={12} sm={6} md={4} lg={3}>
                        <Card style={{ borderRadius: '10px',margin:'20px' ,height:'fit-content',padding:'10px' }}>
                            <h5 style={{ fontSize: '14px', marginTop: '10px', marginBottom: '5px', marginLeft: "15px",textAlign:"left" }}>{post.location}</h5>
                            <h5 style={{ fontSize: '12px', marginTop: '10px', marginBottom: '5px', marginLeft: "15px",textAlign:"left"  }}>{reverseDateFormat(post.createdDate.split("T")[0])}</h5>
                            <h5 style={{ 
                                        fontSize: '12px', 
                                        marginTop: '10px', 
                                        marginBottom: '5px', 
                                        marginLeft: "15px", 
                                        textAlign:"left" ,
                                        color: post.served ? 'blue' : 'red' 
                                    }}>
                                        {post.served ? 'SERVED' : 'PENDING'}
                                    </h5>
                            <h5 style={{ fontSize: '14px', marginTop: '10px', marginBottom: '5px', marginLeft: "15px", textAlign: "left",color:'red'}}>{post.served ? 'Reciever Details' : ''}</h5>
                            <h5 style={{ fontSize: '14px', marginTop: '5px', marginBottom: '5px', marginLeft: "15px", textAlign: "left" }}>{post.receiverName}</h5>
                            <h5 style={{ fontSize: '14px', marginTop: '5px', marginBottom: '5px', marginLeft: "15px", textAlign: "left" }}>{post.receiverPhoneNumber}</h5>
                            <h5 style={{ fontSize: '14px', marginTop: '5px', marginBottom: '5px', marginLeft: "15px", textAlign: "left" }}>{post.receiverEmail}</h5>
                            <CardContent>
                                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                                    <thead>
                                        <tr style={{ background: '#f2f2f2' }}>
                                            <th style={{ padding: '8px', backgroundColor:"#4CAF50",color:"white" }}>Food item</th>
                                            <th style={{ padding: '8px',backgroundColor:"#4CAF50",color:"white" }}>Quantity</th>
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
                    </Grid>
                ))}
            </Grid>
        </>
    );
}

export default Donor;

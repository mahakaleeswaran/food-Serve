import React, { useEffect, useState } from "react";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import 'react-toastify/dist/ReactToastify.css';
import RecieverAppBar from './RecieverAppBar';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import {useParams} from 'react-router-dom';
import Drawer from '@mui/material/Drawer';


function Reciever() {
    const [position, setPosition] = useState({ latitude: null, longitude: null });
    const [locationObject,setLocationObject] =useState({})
    const [posts,setPosts] = useState([])
    const [drawerOpen, setDrawerOpen] = useState(false);
    let { userId } = useParams();

    const toggleDrawer = () => {
        setDrawerOpen(!drawerOpen);
    };


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


    const getUserLocation = () => {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(function (position) {
                setPosition({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                });
            });
        } else {
            console.log("Geolocation is not available in your browser.");
        }
    };

    useEffect(() => {
        getUserLocation();
    }, []);

    function handleMapLocation() {
        fetch(`https://geocode.maps.co/reverse?lat=${position.latitude}&lon=${position.longitude}&api_key=65f92c210cf3b398078161omp63589e`)
            .then((response) => response.json())
            .then((json) => {
                const locationArray = json.display_name.split(", ").slice(1, 8)
                setLocationObject((previousState) => ({
                    ...previousState,
                    doorNo: locationArray[0],
                    street: locationArray[1],
                    area: locationArray[2],
                    city: locationArray[3],
                    district: locationArray[4],
                    state: locationArray[5],
                    zipcode: locationArray[6]
                }));
            });
    }
    
    function updateLocation(key,value){
        setLocationObject((previousState)=>{
            return {
              ...previousState,
                 [key]:value,
            }
        })
     }


     function handleFilter() {
        let updatedLocationObject = { ...locationObject };
    
        for (let key in updatedLocationObject) {
            if (updatedLocationObject[key] === "") {
                updatedLocationObject[key] = null;
            }
        }
    
        fetch(`http://localhost:8084/reciever/${userId}/getPostsBasedOnLocation`, {
            method: "POST",
            body: JSON.stringify(updatedLocationObject),
            headers: {
                "Content-Type": "application/json; charset=UTF-8"
            }
        })
        .then((response) => response.json())
        .then((data) => {
            setPosts(data)
        })
        .catch((error) => {
            console.log(error);
        });
        setDrawerOpen(false)
    }


    function handleAccept(id) {
        const updatedPosts = posts.map(post => {
            if (post.id === id) {
                return { ...post, accepted: true };
            }
            return post;
        });

        fetch(`http://localhost:8084/reciever/${userId}/${id}/accept`)
            .then((response) => response.json())
            .then((data) => {
                setPosts(updatedPosts);
            })
            .catch((error) => {
                console.log(error);
            });
    }
 

    return (
        <div>
            <RecieverAppBar/>
            <div style={{backgroundColor:'white'}}>
            <button variant="contained" onClick={toggleDrawer} style={{...buttonStyles,border:null,backgroundColor:'black',color:'white'}}>
                Filter
            </button>
            </div>
            <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer}>
                <div style={{ padding: '20px',marginRight:'20px',width:'200px' }}>
                <TextField
                    value={locationObject.doorNo || ""}
                    onChange={(e) => updateLocation("doorNo", e.target.value)}
                    variant="outlined"
                    name="doorNo"
                    label="Door No"
                    sx={{ width: '100%', margin: '10px', }}
                />
                <TextField
                    value={locationObject.street || ""}
                    onChange={(e) => updateLocation("street", e.target.value)}
                    variant="outlined"
                    name="street"
                    label="Street"
                    sx={{ width: '100%', margin: '10px' }}
                />
                 <TextField
                    value={locationObject.area || ""}
                    onChange={(e) => updateLocation("area", e.target.value)}
                    variant="outlined"
                    name="area"
                    label="Area"
                    sx={{ width: '100%', margin: '10px' }}
                />
                 <TextField
                    value={locationObject.zipcode || ""}
                    onChange={(e) => updateLocation("zipcode", e.target.value)}
                    variant="outlined"
                    name="zipcode"
                    label="Zip Code"
                    sx={{ width: '100%', margin: '10px' }}
                />
                 <TextField
                    value={locationObject.city || ""}
                    onChange={(e) => updateLocation("city", e.target.value)}
                    variant="outlined"
                    name="city"
                    label="City"
                    sx={{ width: '100%', margin: '10px' }}
                />
                 <TextField
                    value={locationObject.district || ""}
                    onChange={(e) => updateLocation("district", e.target.value)}
                    variant="outlined"
                    name="district"
                    label="District"
                    sx={{ width: '100%', margin: '10px' }}
                />
                <TextField
                    value={locationObject.state || ""}
                    onChange={(e) => updateLocation("state", e.target.value)}
                    variant="outlined"
                    name="state"
                    label="State"
                    sx={{ width: '100%', margin: '10px' }}
                />
                       <button variant="contained" onClick={handleMapLocation} style={{ backgroundColor: 'red', color: 'white' ,width:"100%",margin: '10px',height:"55px",fontWeight: 'bold',fontFamily: "'Times New Roman', Serif"}}>Map Location</button>
    <button variant="contained" onClick={handleFilter} style={{ backgroundColor: '#4CAF50', color: 'white' ,width:"100%",margin: '0px',margin:'10px',height:"55px",fontWeight: 'bold',fontFamily: "'Times New Roman', Serif"}}>Filter</button>
                </div>
            </Drawer>
        <Grid container spacing={5} justifyContent="center">
                {posts.map((post, index) => (
                    <Grid item key={index} xs={12} sm={6} md={5} lg={3}>
                        <Card style={{ borderRadius: '10px', height: '100%', margin: '20px', padding: '10px' }}>
                            <h5 style={{ fontSize: '14px', marginTop: '10px', marginBottom: '5px', marginLeft: "15px", textAlign: "left",color:'red'}}>Address</h5>
                            <h5 style={{ fontSize: '14px', marginTop: '10px', marginBottom: '5px', marginLeft: "15px", textAlign: "left" }}>{post.location.split(",").slice(0,4).join(",")}</h5>
                            <h6 style={{ fontSize: '14px', marginTop: '10px', marginBottom: '5px', marginLeft: "15px", textAlign: "left" }}>{post.location.split(",").slice(4,7).join(",")}</h6>
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
                            <button
                                variant="contained"
                                onClick={() => handleAccept(post.id)}
                                style={{
                                    backgroundColor: post.accepted ? 'white' : 'orange',
                                    color: post.accepted ? 'black' : 'white',
                                    width: "200px",
                                    height: "35px",
                                    fontWeight: 'bold',
                                    fontFamily: "'Times New Roman', Serif"
                                }}
                                disabled={post.accepted}
                            >
                                {post.accepted ? 'Accepted' : 'Accept'}
                            </button>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </div>
    );
}

export default Reciever;


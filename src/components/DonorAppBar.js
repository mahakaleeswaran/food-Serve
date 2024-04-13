import React, { useEffect, useState } from "react";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useNavigate } from "react-router-dom";
import {ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Drawer from '@mui/material/Drawer';
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


  
  function DonorAppBar() {
    const [dropen, setDrOpen] = React.useState(false);
    const [position, setPosition] = useState({ latitude: null, longitude: null });
    const [location,setLocation] = useState("")
    let { userId } = useParams();
    const [getPosition, setGetPosition] = useState({ latitude: null, longitude: null });

    const toggleDrawer = (newOpen) => {
        setDrOpen(newOpen);
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

    useEffect(() => {
        if(location && location.split(",").length == 7){
        const encodedAddress = encodeURIComponent(location.split(",").slice(3, 7).join(","));
        const apiKey = "65f92c210cf3b398078161omp63589e";
        const url = `https://geocode.maps.co/search?q=${encodedAddress}&api_key=${apiKey}`;
        
        fetch(url)
            .then((response) => response.json())
            .then((json) => {
                if (json.length > 0) {
                    const latitude = json[0].lat;
                    const longitude = json[0].lon;
                    setGetPosition({
                        latitude: latitude,
                        longitude: longitude
                    });
                    console.log("Latitude: ", latitude);
                    console.log("Longitude: ", longitude);
                } else {
                    toast.error("No geolocation data found for the entered address.");
                }
            })
            .catch((error) => {
                console.error("Error fetching geolocation data:", error);
            });
        }
    }, [location, setGetPosition]);
    

    function handleMapLocation() {
        fetch(`https://geocode.maps.co/reverse?lat=${position.latitude}&lon=${position.longitude}&api_key=65f92c210cf3b398078161omp63589e`)
            .then((response) => response.json())
            .then((json) => {
                setLocation(json.display_name.split(", ").slice(1, 8).join(","));
         });
    }


    function handleDefaultLocation(){
        setLocation(userProfile.address)
    }


    const [foodItems, setFoodItems] = useState([{ foodName: '', quantity: '' }]);

    const handleAddFoodItem = () => {
        const newFoodItems = [...foodItems, { foodName: '', quantity: '' }];
        setFoodItems(newFoodItems);
    };

    const handleFoodItemChange = (index, type, value) => {
        const updatedFoodItems = [...foodItems];
        updatedFoodItems[index][type] = value;
        setFoodItems(updatedFoodItems);
    };

    function handleCreatePost() {
        if (getPosition.latitude && getPosition.longitude) {
            let foodItems_filter = foodItems.filter((fooditem) => fooditem.foodName !== '' && fooditem.quantity !== null)
            if (foodItems_filter.length > 0) {
                const postObject = {
                    "location": location,
                    "latitude":getPosition.latitude,
                    "longitude":getPosition.longitude,
                    "posts": foodItems_filter
                };
                fetch(`http://localhost:8084/donor/${userId}/post`, {
                    method: "POST",
                    body: JSON.stringify(postObject),
                    headers: {
                        "Content-Type": "application/json; charset=UTF-8"
                    }
                })
                .then((response) => response.json())
                .then((json) => {
                    console.log(json)
                });
                toast.success("Posted successfully");
            } else {
                toast.error("Food item details are incomplete");
            }
        } else {
            toast.error("Location is empty");
        }
        setFoodItems([]);
        setDrOpen(false)
        window.location.reload();
    }
    



    const DrawerList = (
        <Box sx={{ 
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '10px',
            padding: '20px',
            margin:'10px',
            width: 250,
        }} role="presentation" onClick={() => toggleDrawer(false)}>
            <TextField
                id="location"
                onChange={(e) => {
                    setLocation(e.target.value);
                }}
                label="Address"
                value={location}
                variant="outlined"
                height='20px'
                sx={{ width: '100%' }}
                onClick={(e) => e.stopPropagation()}
            />
            <h6 style={{ fontSize: '12px', color: '#888', marginTop: '17px', marginBottom: '5px', marginLeft:"10px"}}>Expected: DoorNo, Street, Area, City, District, State, ZipCode</h6>
            <Box sx={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
                <button onClick={(e) => {
                    handleMapLocation();
                    e.stopPropagation();
                }} style={{ backgroundColor: 'red', fontFamily: "'Times New Roman', Serif", color: 'white', width: '100%', border: 'none', height: '50px', fontWeight: 'bold' }}>Map Location</button>
                <button onClick={(e) => {
                    handleDefaultLocation();
                    e.stopPropagation();
                }} style={{ backgroundColor: 'red', fontFamily: "'Times New Roman', Serif", color: 'white', width: '100%', border: 'none', height: '50px', fontWeight: 'bold' }}>Default Location</button>
            </Box>
            <h4>Enter Food item details</h4>
            <div>
                {foodItems.map((item, index) => (
                    <Box key={index} sx={{ display: 'flex', justifyContent: 'center', gap: '10px',marginTop: '10px' }}>
                        <TextField
                            id={`food-item-${index}`}
                            label="FoodName"
                            variant="outlined"
                            height='20px'
                            sx={{ width: '100%' }}
                            onClick={(e) => {
                                e.stopPropagation();
                            }}
                            onChange={(e) => handleFoodItemChange(index, 'foodName', e.target.value)}
                        />
                        <TextField
                            id={`quantity-${index}`}
                            label="Quantity"
                            variant="outlined"
                            height='20px'
                            sx={{ width: '100%' }}
                            onClick={(e) => {
                                e.stopPropagation();
                            }}
                            onChange={(e) => handleFoodItemChange(index, 'quantity', e.target.value)}
                        />
                    </Box>
                ))}
            </div>
            <Box sx={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
                <button  onClick={(e) => {
                                handleAddFoodItem()
                                e.stopPropagation();
                            }} style={{ backgroundColor: 'red', fontFamily: "'Times New Roman', Serif", color: 'white', width: '170px', border: 'none', height: '35px', fontWeight: 'bold' }}>Add Food Item</button>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
                <button onClick={handleCreatePost} style={{ ...buttonStyles, backgroundColor: '#4CAF50', color: 'white', width: '280px',height:'40px',border: 'none' }}>Create Post</button>
            </Box>
            <ToastContainer position="top-center" autoClose={3000} />
        </Box>
    );
    

    const[userProfile,setUserProfile] = useState({})

    useEffect(()=>{
        fetch(`http://localhost:8084/donor/${userId}`).then((response)=>response.json()).then((json)=>{
            setUserProfile(()=>json)
        })
      },[userId])


      function handleChange(value, key) {
        setUserProfile((previousState) => {
            return {
                ...previousState,
                [key]: value
            };
        });
    }


    function handleUpdate(){
        fetch(`http://localhost:8084/donor/${userId}/updateDetails`, {
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
        fetch(`http://localhost:8084/donor/${userId}/delete`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json; charset=UTF-8"
            }
        })
        .then(data => {
                toast.error("Profile Deleted");
                navigate("/")
        })
        .catch(error => {
            toast.error("Profile Updation Failed");
        });
    }



    const [open, setOpen] = React.useState(false);

    const toggleDialog = () => {
        setOpen(!open);
    };

    const navigate = useNavigate();

    const handleHomeClick = () => {
        navigate("/");
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
            <h3 style={{ color: 'white', margin: 0, cursor: 'pointer' }}>Food Serve</h3>
            <Box sx={{ display: 'flex' }}>
               <div>
               <Dialog open={open} onClose={toggleDialog}>
                   <DialogTitle style={{ fontFamily: "'Times New Roman', Serif", fontWeight: 'bold' }}>Profile</DialogTitle>
                    <div></div>
                    <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: '10px', padding: '20px' }}>
                    <TextField id="name" label="Name" onChange={(e) => handleChange(e.target.value, "name")} value={userProfile.name} variant="outlined" sx={{ width: '100%' }} />
                    <TextField id="email" label="Email" onChange={(e) => handleChange(e.target.value, "email")} value={userProfile.email} variant="outlined" sx={{ width: '100%' }} />
                    <TextField id="organization" label="Organization" onChange={(e) => handleChange(e.target.value, "organization")} value={userProfile.organization} variant="outlined" sx={{ width: '100%' }} />
                    <TextField id="phoneNumber" label="Phone Number" onChange={(e) => handleChange(e.target.value, "phoneNumber")} value={userProfile.phoneNumber} variant="outlined" sx={{ width: '100%' }} />
                    <TextField id="address" label="Address" onChange={(e) => handleChange(e.target.value, "address")} value={userProfile.address} variant="outlined" sx={{ width: '100%' }} />
                    <h5 style={{ fontSize: '12px', color: '#888', marginTop: '17px', marginBottom: '5px', marginLeft:"10px"}}>Expected format: DoorNo, Street, Area, City, District, State, ZipCode</h5>
                    </DialogContent>
                        <button variant="contained" onClick={handleUpdate} style={{ backgroundColor: '#4CAF50', color: 'white',width:"91%",margin:'5px 19px',height:"50px",fontWeight: 'bold',fontFamily: "'Times New Roman', Serif",}}>Update Details</button>
                        <button variant="contained" onClick={handleDelete} style={{ backgroundColor: 'red', color: 'white' ,width:"91%",margin:'5px 19px',marginBottom:'10px',height:"50px",fontWeight: 'bold',fontFamily: "'Times New Roman', Serif",}}>Delete Account</button>
                </Dialog>
               </div>
                <button style={buttonStyles} onClick={() => toggleDrawer(true)}>Post</button>
                <button style={buttonStyles} onClick={toggleDialog}>Profile</button>
                <button onClick={handleHomeClick} style={buttonStyles}>Logout</button>
            </Box>
            <Drawer open={dropen} onClose={() => toggleDrawer(false)}>
            {DrawerList}
        </Drawer>
        </Box>
        <ToastContainer position="top-center" autoClose={3000} />
        </>
    );
}

export default DonorAppBar;

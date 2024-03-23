import React, { useState,useEffect } from "react";
import { buttonStyles } from './sharedStyles';
import {ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AppBar from "./AppBar";


function Home() {

  const[counts,setCounts] = useState({});
  const[feedback,setFeedBack]=useState({});
  const[feedbacks,setFeedBacks]=useState([]);
  

  useEffect(() => {
    fetch("http://localhost:8084/admin/getAllCounts")
        .then((response) => response.json())
        .then((json) => {
            setCounts(json);
        });
}, []);


useEffect(() => {
  fetch("http://localhost:8084/admin/getAllfeedBacks")
      .then((response) => response.json())
      .then((json) => {
          setFeedBacks(()=>json);
      });
}, []);




  function handleFeedBack(){
    fetch("http://localhost:8084/admin/feedBack", {
            method: "POST",
            body: JSON.stringify(feedback),
            headers: {
                "Content-Type": "application/json; charset=UTF-8"
            }
        })
        .then(data => {
           toast.success("FeedBack posted");
        })
        .catch(error => {
            toast.error("FeedBack Failed posting");
        });
  }



  return (
    <>
     <AppBar />
    <div className="home-container">
      <div className="description">
      </div>
      <div className="container">
        <div className="text-field">{counts.donorsCount}</div>
        <div className="text-field smaller">+</div>
        <div className="text-field smaller"> Donors</div>
      </div>
      <div className="container">
        <div className="text-field">{counts.recieversCount}</div>
        <div className="text-field smaller">+</div>
        <div className="text-field smaller"> Receivers</div>
      </div>
      <div className="container">
      <div className="text-field">{counts.foodCount}</div>
      <div className="text-field smaller">Kgs</div>
        <div className="text-field smaller">Food served</div>
      </div>
      <div className="vertical-line">
    <p className="text-field1">
        Welcome to our surplus food redistribution platform. Our platform connects donors with surplus food to receivers in need, helping to reduce food waste and support those facing food insecurity.
    </p>
    </div>
    <div className="vertical-line">
    <p className="text-field1">
        By donating excess food, you can make a positive impact in your community and contribute to a more sustainable and equitable food system.
    </p>
</div>

    </div>
    <div>
    <div className="feedback-list">
    {feedbacks.slice(-11).map((item, index) => (
    <div key={index} className="feedback-item">
        {item.feedBack}
    </div>
))}

     </div>
    <div className="feedback-section">
          <div className="contact-info">
            <p className="plainText">Contact Us:</p>
            <p className="plainText"> Email: Mahakaleeswaran@gmail.com</p>
          </div>
          <div className="feedback-form">
            <textarea onChange={(e)=>{
              setFeedBack({ feedBack: e.target.value });
            }} placeholder="Enter anonymous feedback" rows="4" cols="50"></textarea>
            <button onClick={handleFeedBack} style={buttonStyles}>Submit</button>
          </div>
        </div>
        <ToastContainer position="bottom-right" autoClose={3000} />
        </div>
    </>
  );
}

export default Home;

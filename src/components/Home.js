import React from "react";
import { buttonStyles } from './sharedStyles';


function Home() {
  return (
    <>
    <div className="home-container">
      <div className="description">
      </div>
      <div className="container">
        <div className="text-field">50 </div>
        <div className="text-field smaller">+</div>
        <div className="text-field smaller"> Donors</div>
      </div>
      <div className="container">
        <div className="text-field">100 </div>
        <div className="text-field smaller">+</div>
        <div className="text-field smaller"> Receivers</div>
      </div>
      <div className="container">
        <div className="text-field">10K kilos </div>
        <div className="text-field smaller"> Food served</div>
      </div>
      <p className="text-field1">
     Welcome to our surplus food redistribution platform. Our platform connects donors with surplus food to receivers in need, helping to reduce food waste and support those facing food insecurity.
        </p>
        <p className="text-field1">
          By donating excess food, you can make a positive impact in your community and contribute to a more sustainable and equitable food system.
        </p>
    </div>
    <div className="feedback-section">
          <div className="contact-info">
            <p className="plainText">Contact Us:</p>
            <p className="plainText"> Email: Mahakaleeswaran@gmail.com</p>
          </div>
          <div className="feedback-form">
            <textarea placeholder="Enter anonymous feedback" rows="4" cols="50"></textarea>
            <button style={buttonStyles}>Submit</button>
          </div>
        </div>
    </>
  );
}

export default Home;

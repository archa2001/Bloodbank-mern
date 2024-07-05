import React from 'react'
import Navbar from './Navbar';
import { useContext } from 'react';
import '../CSS/Home.css'
import motivation from '../Images/motivation.mp4';
import {  useNavigate } from 'react-router-dom';
import { mycontx } from './Context';
import Footer from './Footer';


function Home() {
  const { logUser } = useContext(mycontx);
  console.log("logUser",logUser.email);
  const nav=useNavigate()
  const handleDonateClick = () => {
    if (logUser.email) {
      nav('/Donate');
    } else {
      alert('Please log in to donate.');
    }
  
  };
  function handleRequestClick(){
    nav("/Request")
  }
  return (
    <div>
      <Navbar />
      <div className='head'>
        <h2 className='main'>Donate Blood Save LIVES!!</h2>
        <h4 className='submain'>Be a Lifesaver: "Your blood donation can be a lifeline for someone in an emergency, <br></br>
          undergoing surgery, or battling a severe illness. Become a <b className='hero'>HERO</b> in someone’s life by
          donating blood today</h4></div>
      <div className="video-container">

        <video src={motivation} autoPlay muted loop alt='vdo' />
      </div>
      <section className="cards-section">
          <div className="card">
            <h2>Donate Blood</h2>
            <p>Your blood donation can save lives. Join our community of donors.</p>
            <button onClick={handleDonateClick}>Donate</button>
          </div>
          <div className="card">
            <h2>Request Blood</h2>
            <p>Need blood? Submit a request and get help from our network.</p>
            <button onClick={handleRequestClick}>Request</button>
          </div>
        </section>
        <div>
        <Footer/>
        </div>


    </div>
  )
}

export default Home
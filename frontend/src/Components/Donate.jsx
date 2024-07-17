

// import React, { useState } from 'react';
// import axios from 'axios';
// import '../CSS/Donate.css';
// import Navbar from './Navbar';
// import { useNavigate } from 'react-router-dom';
// import Footer from './Footer';

// export default function Donation() {
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     bloodGroup: '',
//     quantity: '',
//     diseases: '',
//     dateofbirth: '',
//     weight: '',
//     height: '',
//     dateofdonation: ''
//   });


//   const nav=useNavigate()

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post('http://localhost:8000/user/donate', formData);
//       alert(response.data.message);
//       nav("/")
//     } catch (error) {
//       console.error(error.response ? error.response.data : error.message);
//       alert('Error in Donating: ' + (error.response ? error.response.data.message : error.message));
//       nav("/")
//     }
//   };

//   return (
//     <div>
//       <Navbar/>
//       <h2 className='caption-hero'>Be a Hero for Those in Need</h2>
//       <div className="donation-container">
//         <form onSubmit={handleSubmit} className="donation-form">
//           <div className="form-group">
//             <label>Name</label>
//             <input type="text" name="name" value={formData.name} onChange={handleChange} required className="donation-input" />
//           </div>
//           <div className="form-group">
//             <label>Email</label>
//             <input type="email" name="email" value={formData.email} onChange={handleChange} required className="donation-input" />
//           </div>
//           <div className="form-group">
//             <label>Blood Group</label>
//             <select name="bloodGroup" value={formData.bloodGroup} onChange={handleChange} required className="donation-input">
//               <option value="">Select Blood Group</option>
//               <option value="A+">A+</option>
//               <option value="A-">A-</option>
//               <option value="B+">B+</option>
//               <option value="B-">B-</option>
//               <option value="AB+">AB+</option>
//               <option value="AB-">AB-</option>
//               <option value="O+">O+</option>
//               <option value="O-">O-</option>
//             </select>
//           </div>
//           <div className="form-group">
//             <label>Quantity (in ml)</label>
//             <input type="number" name="quantity" value={formData.quantity} onChange={handleChange} required className="donation-input" />
//           </div>
//           <div className="form-group">
//             <label>Diseases</label>
//             <input type="text" name="diseases" value={formData.diseases} onChange={handleChange} className="donation-input" />
//           </div>
//           <div className="form-group">
//             <label>Date of Birth</label>
//             <input type="date" name="dateofbirth" value={formData.dateofbirth} onChange={handleChange} required className="donation-input" />
//           </div>
//           <div className="form-group">
//             <label>Weight</label>
//             <input type="number" name="weight" value={formData.weight} onChange={handleChange} required className="donation-input" />
//           </div>
//           <div className="form-group">
//             <label>Height</label>
//             <input type="number" name="height" value={formData.height} onChange={handleChange} required className="donation-input" />
//           </div>
//           <div className="form-group">
//             <label>Date of Donation</label>
//             <input type="date" name="dateofdonation" value={formData.dateofdonation} onChange={handleChange} required className="donation-input" />
//           </div>
//           <button type="submit" className="submit-button">Donate Blood</button>
//         </form>
//       </div>
//       <Footer/>
//     </div>
//   );
// }
import React, { useState } from 'react';
import axios from 'axios';
import '../CSS/Donate.css';
import Navbar from './Navbar';
import { useNavigate } from 'react-router-dom';
import Footer from './Footer';

export default function Donation() {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    bloodGroup: '',
    quantity: '',
    diseases: '',
    dateofbirth: '',
    weight: '',
    height: '',
    dateofdonation: ''
  });

  const nav = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/user/donate', formData);
      alert(response.data.message);
      nav("/")
    } catch (error) {
      console.error(error.response ? error.response.data : error.message);
      alert('Error in Donating: ' + (error.response ? error.response.data.message : error.message));
      nav("/")
    }
  };

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  const renderStep = () => {
    switch(step) {
      case 0:
        return (
          <div className="donation-step">
            <h3>Step 1: Personal Information</h3>
            <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} required />
            <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
            <label>DOB</label>
            <input type="date" name="dateofbirth" placeholder="Date of Birth" value={formData.dateofbirth} onChange={handleChange} required />
            <button onClick={nextStep}>Next</button>
          </div>
        );
      case 1:
        return (
          <div className="donation-step">
            <h3>Step 2: Physical Details</h3>
            <input type="number" name="weight" placeholder="Weight" value={formData.weight} onChange={handleChange} required />
            <input type="number" name="height" placeholder="Height" value={formData.height} onChange={handleChange} required />
            <select name="bloodGroup" value={formData.bloodGroup} onChange={handleChange} required>
              <option value="">Select Blood Group</option>
              <option value="A+">A+</option>
              <option value="A-">A-</option>
              <option value="B+">B+</option>
              <option value="B-">B-</option>
              <option value="AB+">AB+</option>
              <option value="AB-">AB-</option>
              <option value="O+">O+</option>
              <option value="O-">O-</option>
            </select>
            <button onClick={prevStep}>Back</button>
            <button onClick={nextStep}>Next</button>
          </div>
        );
      case 2:
        return (
          <div className="donation-step">
            <h3>Step 3: Donation Details</h3>
            <input type="number" name="quantity" placeholder="Quantity (in ml)" value={formData.quantity} onChange={handleChange} required />
            <input type="text" name="diseases" placeholder="Any diseases?" value={formData.diseases} onChange={handleChange} />
            <label>Date of Donation</label>
            <input type="date" name="dateofdonation" placeholder="Date of Donation" value={formData.dateofdonation} onChange={handleChange} required />
            <button onClick={prevStep}>Back</button>
            <button onClick={handleSubmit}>Submit Donation</button>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div>
      <Navbar/>
      <div className="donation-container">
        <h2 className='caption-hero'>Be a Hero: Your Donation Journey</h2>
        <div className="donation-progress">
          <div className={`progress-step ${step >= 0 ? 'active' : ''}`}>1</div>
          <div className={`progress-step ${step >= 1 ? 'active' : ''}`}>2</div>
          <div className={`progress-step ${step >= 2 ? 'active' : ''}`}>3</div>
        </div>
        {renderStep()}
      </div>
      <Footer/>
    </div>
  );
}
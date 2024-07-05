
// import React, { useState } from 'react';
// import axios from 'axios';
// import '../CSS/Request.css'; 
// import Navbar from './Navbar';
// import { useNavigate } from 'react-router-dom';

// export default function Request() {
//   const [formData, setFormData] = useState({
//     email: '',
//     requiredbloodgroup: '',
//     Age: '',
//     reason: ''
//   });

//   const nav = useNavigate();

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post('http://localhost:8000/user/request', formData);
//       alert(response.data.message);
//       nav("/");
//     } catch (error) {
//       console.error(error.response ? error.response.data : error.message);
//       alert('Error in submitting request: ' + (error.response ? error.response.data.message : error.message));
//       nav("/");
//     }
//   };

//   return (
//     <div>
//       <Navbar />
//       <h2 className='heading'>Request Blood</h2>
//       <div className="request-container">
//         <form onSubmit={handleSubmit} className="request-form">
//           <div className="form-group">
//             <label>Email</label>
//             <input type="email" name="email" value={formData.email} onChange={handleChange} required className="request-input" />
//           </div>
//           <div className="form-group">
//             <label>Required Blood Group</label>
//             <select name="requiredbloodgroup" value={formData.requiredbloodgroup} onChange={handleChange} required className="request-input">
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
//             <label>Age</label>
//             <input type="number" name="Age" value={formData.Age} onChange={handleChange} required className="request-input" />
//           </div>
//           <div className="form-group">
//             <label>Reason</label>
//             <textarea name="reason" value={formData.reason} onChange={handleChange} required className="request-input" />
//           </div>
//           <button type="submit" className="submit-button">Submit Request</button>
//         </form>
//       </div>
//     </div>
//   );
// }
import React, { useState } from 'react';
import axios from 'axios';
import '../CSS/Request.css'; 
import Navbar from './Navbar';
import { useNavigate } from 'react-router-dom';
import Footer from './Footer';

export default function Request() {
  const [formData, setFormData] = useState({
    email: '',
    requiredbloodgroup: '',
    Age: '',
    reason: ''
  });
  const [currentStep, setCurrentStep] = useState(0);
  const [isTyping, setIsTyping] = useState(false);

  const nav = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post('http://localhost:8000/user/request', formData);
      alert(response.data.message);
      nav("/");
    } catch (error) {
      console.error(error.response ? error.response.data : error.message);
      alert('Error in submitting request: ' + (error.response ? error.response.data.message : error.message));
      nav("/");
    }
  };

  const questions = [
    { question: "What's your email address?", field: "email", type: "email" },
    { question: "Which blood group do you need?", field: "requiredbloodgroup", type: "select" },
    { question: "How old is the patient?", field: "Age", type: "number" },
    { question: "Can you briefly explain the reason for the request?", field: "reason", type: "textarea" }
  ];

  const nextStep = () => {
    if (currentStep < questions.length - 1) {
      setIsTyping(true);
      setTimeout(() => {
        setCurrentStep(currentStep + 1);
        setIsTyping(false);
      }, 1000);
    } else {
      handleSubmit();
    }
  };

  return (
    <div>
      <Navbar />
      <div className="chat-container">
        <div className="chat-header">
          <h2>Blood Request Assistant</h2>
        </div>
        <div className="chat-messages">
          {questions.slice(0, currentStep + 1).map((q, index) => (
            <div key={index}>
              <div className="chat-bubble assistant">
                {q.question}
              </div>
              {index < currentStep && (
                <div className="chat-bubble user">
                  {formData[q.field]}
                </div>
              )}
            </div>
          ))}
          {isTyping && <div className="chat-bubble assistant typing">Typing...</div>}
        </div>
        <div className="chat-input">
          {currentStep < questions.length && (
            <>
              {questions[currentStep].type === 'select' ? (
                <select 
                  name={questions[currentStep].field} 
                  value={formData[questions[currentStep].field]} 
                  onChange={handleChange}
                  className="chat-select"
                >
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
              ) : questions[currentStep].type === 'textarea' ? (
                <textarea
                  name={questions[currentStep].field}
                  value={formData[questions[currentStep].field]}
                  onChange={handleChange}
                  className="chat-textarea"
                />
              ) : (
                <input 
                  type={questions[currentStep].type}
                  name={questions[currentStep].field}
                  value={formData[questions[currentStep].field]}
                  onChange={handleChange}
                  className="chat-input-field"
                />
              )}
              <button onClick={nextStep} className="chat-send-btn">
                {currentStep === questions.length - 1 ? 'Submit' : 'Next'}
              </button>
            </>
          )}
        </div>
      </div>
      <Footer/>
    </div>
  );
}
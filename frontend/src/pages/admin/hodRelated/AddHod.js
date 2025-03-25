import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const AddHod = () => {


  const navigate = useNavigate();

  const [input, setInput] = useState({
      name: "",
      email: '',
    
      password: '',
      
  });

  const handleInput = (e) => {
      let name = e.target.name;
      let value = e.target.value;

      setInput({
          ...input,
          [name]: value,
      });
  };

  const handleSubmit = async (e) => {
      e.preventDefault();

      try {
          const { data } = await axios.post('http://localhost:5000/hod/hod-register', input);
          if (data?.success) {
              setInput({ name: "", email: "", password: "", });
              console.log('HOD Registration Successful!');
              toast.success("HOD Registration Successful");
              navigate("/login")
          } else {
              toast.error(data?.message);
          }
      } catch (error) {
          console.log(error);
          toast.error(error.response?.data?.message || 'An error occurred');
      }
  };









  return (
    <div 
      className="d-flex align-items-center justify-content-center" 
      style={{ height: '100vh' }}
    >
      <div className="card" style={{ width: '30rem', boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2)' }}>
        <div className="card-body">
          <h3 className="card-title text-center">HOD Registration</h3>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="hodName" className="form-label">Name</label>
              <input type="text" className="form-control" name='name' id="hodName" placeholder="Enter name"  value={input.name} onChange={handleInput}/>
            </div>
            <div className="mb-3">
              <label htmlFor="hodEmail" className="form-label">Email</label>
              <input type="email" className="form-control" id="hodEmail" placeholder="Enter email" name='email'  value={input.email} onChange={handleInput} />
            </div>
            <div className="mb-3">
              <label htmlFor="hodPassword" className="form-label">Password</label>
              <input type="password" className="form-control" id="hodPassword" placeholder="Enter password" name='password'  value={input.password} onChange={handleInput}/>
            </div>
            <div className="d-grid">
              <button type="submit" className="btn btn-primary">Register</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddHod;

import React, { useState } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';


const HodLogin = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [input, setInput] = useState({
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
      const { data } = await axios.post('http://localhost:5000/hod/hod-login', input);
      console.log(data);
      if (data?.success) {
        setInput({ email: '', password: '' });
        console.log('Login Successful!');
        toast.success('Login Successful');
        navigate(location.state || '/hod-dashboard');
      } else {
        toast.error(data?.message);
        toast.error('Invalid Email or Password');
      }
    } catch (error) {
      console.log(error);
      toast.error('Invalid email or password');
    }
  };

  return (
    <div className='d-flex justify-content-center align-items-center vh-100' style={{ backgroundColor: '#f0f2f5' }}>
      <div className='card p-4' style={{ width: '100%', maxWidth: '400px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', borderRadius: '10px' }}>
        <h2 className='card-title text-center mb-4'>HOD LOGIN</h2>
        <form onSubmit={handleSubmit} className='card-body'>
          <div className='form-group mb-3'>
            <label htmlFor='email'>Email</label>
            <input
              type='email'
              className='form-control'
              id='email'
              placeholder='example@gmail.com'
              name='email'
              value={input.email}
              onChange={handleInput}
              required
            />
          </div>
          <div className='form-group mb-4'>
            <label htmlFor='password'>Password</label>
            <input
              type='password'
              className='form-control'
              id='password'
              placeholder='Password'
              name='password'
              value={input.password}
              onChange={handleInput}
              required
            />
          </div>
          <button type='submit' className='btn btn-primary btn-block'>
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default HodLogin;

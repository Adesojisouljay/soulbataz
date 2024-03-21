import React, { useState } from 'react';
import { registerUser } from '../api/soulbataz';
import './register.css';
import { useNavigate } from 'react-router-dom';

export const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    phoneNumber: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState("")

  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(formData.password !== formData.confirmPassword){
      setError("passwords do not match")
      return;
    }
    try {
      const response = await registerUser(formData);
      if(response.success){
        navigate("/login")
        console.log(response); 
      }
    } catch (error) {
      console.log('Error registering user:', error);
      setError(error.response.data.message)
    }
  };

  return (
    <div className="register">
        <div className="register-container">
        <h2>Register</h2>
          {error && <span className='error'>{error}</span>}
        <div className="register-form-wrapper">
            <form onSubmit={handleSubmit} className='register-form'>
                <div className="form-group">
                <label htmlFor="username">Username</label>
                <input
                    type="text"
                    id="username"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    className="login-input"
                />
                </div>
                <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="login-input"
                />
                </div>
                <div className="form-group">
                <label htmlFor="phoneNumber">Phone Number</label>
                <input
                    type="tel"
                    id="phoneNumber"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    className="login-input"
                />
                </div>
                <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="login-input"
                />
                </div>
                <div className="form-group">
                <label htmlFor="password">Confirm password</label>
                <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="login-input"
                />
                </div>
                <button className='register-botton'>register</button>
            </form>
        </div>
        </div>
    </div>
  );
};

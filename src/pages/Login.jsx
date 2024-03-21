import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { loginStart, loginSuccess, loginFailure, logout } from '../redux/userSlice';
import { userLogin } from '../api/soulbataz';
import './login.css';
import { useNavigate } from 'react-router-dom';

export const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    emailOrPhoneOrUsername: '',
    password: ''
  });
  const [error, setError] = useState()

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    dispatch(loginStart())
    console.log(formData);
    try {
      const data = await userLogin(formData);
      console.log(data);
      if (!data.error) {
        dispatch(loginSuccess(data))
        localStorage.setItem('token', data.accessToken);
        navigate('/products');
      }
    } catch (error) {
      console.error('Login failed:', error);
      dispatch(loginFailure())
      setError(error.response.data.message)
    }
  };  

  return (
    <div className="login">
      <div className="login-container">
        <h2>Login</h2>
        {error && <span className='error'>{error}</span>}
        <div className="login-form-wrapper">
          <form onSubmit={handleLogin} className='login-form'>
            <div className="form-group">
              <label htmlFor="emailOrPhoneOrUsername">Username/Email/Phone Number</label>
              <input
                type="text"
                id="emailOrPhoneOrUsername"
                name="emailOrPhoneOrUsername"
                value={formData.emailOrPhoneOrUsername}
                onChange={handleChange}
                className='login-input'
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
                className='login-input'
              />
            </div>
            <button type='submit' className='login-button'>Login</button>
          </form>
        </div>
      </div>
    </div>
  );
};

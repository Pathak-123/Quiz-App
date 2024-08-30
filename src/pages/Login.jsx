import React, { useState } from 'react'
import '../App.css';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';

import { useNavigate } from "react-router-dom";
import Formfield from '../components/FormField';
import '../style/FormStyle.css'
import { loginUser, registerUser } from '../services/userService';


function Login() {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [signUpFormData, setSignUpFormData] = useState({
    email: '',
    password: '',
    name: '',
    confirmPassword: '',
  });
  const [loginFormData, setLoginFormData] = useState({
    email: '',
    password: '',

  });
  const [errors, setErrors] = useState({});
  const handleToggle = () => {
    setIsLogin(!isLogin)
    if (isLogin) {
      setLoginFormData({ email: '', password: '' });
    } else {
      setSignUpFormData({ email: '', password: '', name: '', confirmPassword: '' });
    }
    setErrors({});
  }
  const handleLoginFormChange = (e) => {
    const { name, value } = e.target;
    setLoginFormData({ ...loginFormData, [name]: value });
  };
  const handleSignupFormChange = (e) => {
    const { name, value } = e.target;
    setSignUpFormData({ ...signUpFormData, [name]: value });
  };
  const handleFieldFocus = (fieldName) => {
    setErrors((prevErrors) => ({ ...prevErrors, [fieldName]: '' }));
  };

  const validateLoginForm = () => {
    const newErrors = {};
    if (!loginFormData.email) {
      newErrors.email = 'Email is required';
    }
    if (!loginFormData.password) {
      newErrors.password = 'Password is required';
    }
    return newErrors;
  };

  const validateSignUpForm = () => {
    const newErrors = {};
    if (!signUpFormData.name) {
      newErrors.name = 'Name is required';
    }
    if (!signUpFormData.email) {
      newErrors.email = 'Email is required';
    }
    if (!signUpFormData.password) {
      newErrors.password = 'Password is required';
    }
    if (signUpFormData.password !== signUpFormData.confirmPassword) {
      newErrors.confirmPassword = 'Password do not match';
    }
    return newErrors;
  };

  const loginFormSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateLoginForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});
    try {
      const response = await loginUser(loginFormData);
      localStorage.setItem('token', response.token);
      toast.success('Login successful!');
      navigate('/dashboard');
    } catch (error) {
      toast.error(error);
    }

  };

  const signUpFormSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateSignUpForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});

    try {
      const response = await registerUser(signUpFormData);
      toast.success('Signup successful! Please login.');
      setIsLogin(true);
      setSignUpFormData({ email: '', password: '', name: '', confirmPassword: '' });
    } catch (error) {
      toast.error(error);
    }

  };
  return (
    <div className="center-container">
      <div className="login-popup-box">
        <h1 className='title'>QUIZZIE</h1>
        <div className='auth-toggle'>
          <p
            onClick={handleToggle}
            className={`toggle-button ${!isLogin ? 'active' : ''}`}
          >
            Signup
          </p>
          <p
            onClick={handleToggle}
            className={`toggle-button ${isLogin ? 'active' : ''}`}
          >
            Login
          </p>
        </div>
        {isLogin ?

          <form onSubmit={loginFormSubmit} className="form-container" >

            <Formfield
              label="Email"
              type="email"
              name="email"
              value={loginFormData.email}
              onChange={handleLoginFormChange}
              onFocus={() => handleFieldFocus('email')}
              error={errors.email}
            />
            <Formfield
              label="Password"
              type="password"
              name="password"

              value={loginFormData.password}
              onChange={handleLoginFormChange}
              onFocus={() => handleFieldFocus('password')}
              error={errors.password}
            />
            <button type="submit" className='button'>Login</button>

          </form>

          :
          <form onSubmit={signUpFormSubmit} className="form-container">
            <Formfield
              label="Name"
              type="text"
              name="name"

              value={signUpFormData.name}
              onChange={handleSignupFormChange}
              onFocus={() => handleFieldFocus('name')}
              error={errors.name}
            />
            <Formfield
              label="Email"
              type="email"
              name="email"

              value={signUpFormData.email}
              onChange={handleSignupFormChange}
              onFocus={() => handleFieldFocus('email')}
              error={errors.email}
            />
            <Formfield
              label="Password"
              type="password"
              name="password"

              value={signUpFormData.password}
              onChange={handleSignupFormChange}
              onFocus={() => handleFieldFocus('password')}
              error={errors.password}
            />
            <Formfield
              label="Confirm Password"
              type="password"
              name="confirmPassword"

              value={signUpFormData.confirmPassword}
              onChange={handleSignupFormChange}
              error={errors.confirmPassword}
            />
            <button type="submit" className='button' >Sign-Up</button>

          </form>

        }
      </div>
    </div>
  )
}

export default Login
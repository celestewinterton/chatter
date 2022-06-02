import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { signUp } from '../../../store/session';
import { io } from 'socket.io-client'
import DemoUser from '../DemoUser/DemoUser';
import chatter from '../../../images/chatter.png'


let socket;
const SignUpForm = () => {
  const [errors, setErrors] = useState([]);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [image, setImage] = useState(null);
  const [imageLoading, setImageLoading] = useState(false);
  const user = useSelector(state => state.session.user);
  const emailRegex = /\S+@\S+\.\S+/;
  const dispatch = useDispatch();
  const history = useHistory()
  const emailValidator = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/

  const onSignUp = async (e) => {
    e.preventDefault();
    if (password === repeatPassword) {
      const formData = new FormData()
      formData.append('username', username)
      formData.append('email', email)
      formData.append('password', password)
      if (image) {
        formData.append('image', image)
        setImageLoading(true);
      }
      const data = await dispatch(signUp(formData));
      if (data) {
        setErrors(data)
        return
      }
    } if (password !== repeatPassword) {
      setErrors(['password: Password doesn\'t match'])
    } else {
      history.push('/')
    }
  };
  const updateImage = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  const updateUsername = (e) => {
    setUsername(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };

  if (user) {
    history.push('/')
  }

  return (
    <div className='signup-form-container'>
      <form onSubmit={onSignUp}>
        <div className='signup-form-logo-container' href='/#'>
          <img className='signup-form-logo' alt='signup form logo' src={chatter}></img>
          <p className='signup-form-name'>chatter</p>
        </div>
        <h2 className='signup-header1'>Sign up for Chatter </h2>
        <div className='error-container'>
          {errors.length > 0 && (
            <div className='signup-form-error-container'>
              <span className="error-title">The following errors occured:</span>
              {errors.length && errors.map((error, ind) => (
                <li className='error-list' key={ind}>{error}</li>
              ))}
            </div>
          )}
        </div>
        <div className='signup-form-user'>
          <input
            type='text'
            name='username'
            onChange={updateUsername}
            value={username}
            placeholder='First/Last Name'
          />
        </div>
        <div className='signup-form-email'>
          { /* <label>Email</label> */}
          <input
            type='text'
            name='email'
            onChange={updateEmail}
            value={email}
            placeholder='name@work-email.com'
          />
        </div>
        <div className='signup-form-pass'>
          {/* <label>Password</label> */}
          <input
            type='password'
            name='password'
            onChange={updatePassword}
            value={password}
            placeholder='Password'
          />
        </div>
        <div className='signup-form-confirmpass'>
          {/* <label>Confirm Password</label> */}
          <input
            type='password'
            name='confirm_password'
            onChange={updateRepeatPassword}
            value={repeatPassword}
            required={true}
            placeholder='Confirm Password'
          />
        </div>
        <div className="add-image">
          <input className='image-upload'
            id="file-upload"
            type="file"
            accept="image/*"
            onChange={updateImage}
          />
          <div className="preview-container-site">
            {image && (
              <img
                alt="preview"
                src={URL.createObjectURL(image)}
                className="preview-image site"
              ></img>
            )}
          </div>
          <label htmlFor="file-upload">
            {imageLoading ?
              <i className="fas fa-spinner fa-pulse"></i>
              :
              <i className="fas fa-image"></i>
            }
          </label>
        </div>
        <div className='signup-form-buttons'>
          <button className='signup-button' type='submit'>Sign Up</button>
          {/* <DemoUser /> */}
        </div>
      </form>
    </div>
  );
};

export default SignUpForm;

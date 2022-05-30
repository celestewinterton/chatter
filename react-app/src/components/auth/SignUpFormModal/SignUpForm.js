import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect } from 'react-router-dom';
import { signUp } from '../../../store/session';
import DemoUser from '../DemoUser/DemoUser';

const SignUpForm = () => {
  const [errors, setErrors] = useState([]);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [image, setImage] = useState(null);
  const [imageLoading, setImageLoading] = useState(false);
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onSignUp = async (e) => {
    e.preventDefault();
    if (password === repeatPassword) {
      const formData = new FormData()
      formData.append('email', email)
      formData.append('username', username)
      formData.append('password', password)
      formData.append('image', image)
      setImageLoading(true);
      const data = await dispatch(signUp(formData));
      if (data) {
        setErrors(data)
      }
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
    return <Redirect to='/' />;
  }

  return (
    <>
      <form onSubmit={onSignUp}>
        <div>
          {errors.map((error, ind) => (
            <div key={ind}>{error}</div>
          ))}
        </div>
        <div>
          <div className='signup-form-container'>
            {/* <label>User Name</label> */}
            <input
              type='text'
              name='username'
              onChange={updateUsername}
              value={username}
              placeholder='First/Last Name'
              ></input>
          </div>
          <div>
            {/* <label>Email</label> */}
            <input
              type='text'
              name='email'
              onChange={updateEmail}
              value={email}
              placeholder='Email Address'
              ></input>
          </div>
          <div>
            {/* <label>Password</label> */}
            <input
              type='password'
              name='password'
              onChange={updatePassword}
              value={password}
              placeholder='Password'
            ></input>
          </div>
          <div>
            {/* <label>Confirm Password</label> */}
            <input
              type='password'
              name='confirm_password'
              onChange={updateRepeatPassword}
              value={repeatPassword}
              required={true}
              placeholder='Confirm Password'
              ></input>
          </div>
          <div className="add-image">
            <input
              id="file-upload"
              type="file"
              accept="image/*"
              onChange={updateImage}
              ></input>
            <div className="preview-container site">
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
        </div>
        <button type='submit'>Sign Up</button>
      </form>
      <DemoUser />
    </>
  );
};

export default SignUpForm;

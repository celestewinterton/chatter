import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { login } from '../../../store/session';
import DemoUser from '../DemoUser/DemoUser';
import { NavLink } from 'react-router-dom';
import chatter from '../../../images/chatter.png'
import { useHistory } from 'react-router-dom';
import './LoginForm.css'

const LoginForm = () => {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();
  const history = useHistory()

  const onLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    } else {
      history.push('/')
    }
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  if (user) {
    history.push('/')
    // return <Redirect to='/'/>;
  }

  return (
    <div className='login-form-container'>
      <form onSubmit={onLogin}>
        <div className='signin-form-headers'>
          <div className='signin-form-logo-container' href='/#'>
            <img className='signin-form-logo' alt='sign up form logo' src={chatter}></img>
            <p className='signin-form-name'>chatter</p>
          </div>
          <h2 className='signin-header1'> Sign in to Chatter</h2>
          {/* <h4 className='signin-header2'>New to Chatter?</h4> */}
        </div>
        <div className='error-container'>
          {errors.length > 0 && (
            <div className='signin-form-error-container'>
              <span className="error-title">The following errors occured:</span>
              {/* <ul className='signin-form-errors'> */}
              {errors.map((error, ind) => (
                <li className='error-list' key={ind}>{error}</li>
              ))}
              {/* </ul> */}
            </div>
          )}
        </div>
        {/* </div> */}
        <div className='signin-form-email'>
          {/* <NavLink>Create an account</NavLink> */}
          {/* <label htmlFor='email'>Email</label> */}
          <input
            name='email'
            type='text'
            placeholder='Email'
            value={email}
            onChange={updateEmail}
          />
        </div>
        <div className='signin-form-password'>
          {/* <label htmlFor='password'>Password</label> */}
          <input
            name='password'
            type='password'
            placeholder='Password'
            value={password}
            onChange={updatePassword}
          />
        </div>
        <div className='signin-form-buttons'>
          <button className='signin-button' type='submit'>Login</button>
          <DemoUser />
        </div>
      </form>
    </div>
  );
};

export default LoginForm;

import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect, useHistory } from 'react-router-dom';
import { signUp, demoLogin } from '../../store/session';
import "./SignUpForm.css"

const SignUpForm = () => {
  const [errors, setErrors] = useState([]);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [profile_pic, setProfile_pic] = useState('');
  const [bio, setBio] = useState('');

  const [repeatPassword, setRepeatPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();
  const history = useHistory()

  const onSignUp = async (e) => {
    e.preventDefault();
    if (password === repeatPassword) {
      const data = await dispatch(signUp(username, email, password, profile_pic, bio));
      if (data) {
        setErrors(data)
      }
    } else setErrors(["Passwords are not the same"])
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

  const updateProfilePic = (e) => {
    setProfile_pic(e.target.valur)
  }

  const updateBio = (e) => {
    setBio(e.target.value)
  }

  const goToLogin = (e) => {
    history.push("/login");
  };

  if (user) {
    return <Redirect to='/' />;
  }

  return (
    <form onSubmit={onSignUp} className="signup-form">
      <div className='errors'>
        {errors.map((error, ind) => (
          <div key={ind}>{error}</div>
        ))}
      </div>
      <div className='username'>
        {/* <label>User Name</label> */}
        <input
        className='input-username'
          type='text'
          name='username'
          onChange={updateUsername}
          value={username}
          placeholder="Username"
        ></input>
      </div>
      <div>
        {/* <label>Email</label> */}
        <input
          className='input-email'
          type='text'
          name='email'
          onChange={updateEmail}
          value={email}
          placeholder="E-mail"
        ></input>
      </div>
      {/* <div>
        <label>Profile Pic</label>
        <input
          type='text'
          name='profile_pic'
          onChange={updateProfilePic}
          value={profile_pic}
        ></input>
      </div>
      <div>
        <label>Bio</label>
        <input
          type='text'
          name='bio'
          onChange={updateBio}
          value={bio}
        ></input>
      </div> */}
      <div>
        {/* <label>Password</label> */}
        <input
          className='input-password'
          type='password'
          name='password'
          onChange={updatePassword}
          value={password}
          placeholder="Password"
        ></input>
      </div>
      <div>
        {/* <label>Repeat Password</label> */}
        <input
          className='input-repeat-password'
          type='password'
          name='repeat_password'
          onChange={updateRepeatPassword}
          value={repeatPassword}
          required={true}
          placeholder="Repeat Password"
        ></input>
      </div>
      <button type='submit'>Sign Up</button>
    </form>
  );
};

export default SignUpForm;

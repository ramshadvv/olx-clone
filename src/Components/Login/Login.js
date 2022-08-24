import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Contexts/AuthContext';
import { signInWithEmailAndPassword } from "firebase/auth"
import { auth } from '../../config/firebase'

import Logo from '../../olx-logo.png';
import './Login.css';

function Login() {
  const [userEmail, setUserEmail] = useState('');
  const [userPwd, setUserPwd] = useState('');
  const [err, setErr] = useState('');
  const navigate = useNavigate();
  const { setCurrentUser } = useContext(AuthContext);
  
  async function handleLogin(e) {
    setErr('');
    try {
      e.preventDefault();
      const result = await signInWithEmailAndPassword(auth, userEmail, userPwd);
      console.log(result._tokenResponse.localId);
      setCurrentUser({ name: result._tokenResponse.displayName, uid: result._tokenResponse.localId});
      navigate('/');
    }
    catch (error) {
      if (error.code === 'auth/wrong-password') {
        setErr('Please check the Password');
      }
      if (error.code === 'auth/user-not-found') {
        setErr('Please check the Email');
      }
    }
  }
  
  return (

    <div>
      <div className="loginParentDiv">
        <img width="200px" height="200px" src={Logo} alt="logo"></img>
        <form>
          <p className='error'>{err}</p>
          <label htmlFor="fname">Email</label>
          <br />
          <input
            className="input"
            type="email"
            id="fname"
            name="email"
            onChange={((e) => {
              setUserEmail(e.target.value);
            })}
          />
          <br />
          <label htmlFor="lname">Password</label>
          <br />
          <input
            className="input"
            type="password"
            id="lname"
            name="password"
            onChange={((e) => {
              setUserPwd(e.target.value);
            })}
          />
          <br />
          <br />
          <button disabled={userEmail === '' || userPwd === '' ? true : false} onClick={(e)=>handleLogin(e)}>Login</button>
        </form>
        <Link to='/signup'>Signup</Link>
        <Link to='/'>Back to Home</Link>

      </div>
    </div>
  );
}

export default Login;

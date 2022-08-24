import React, { useState,useContext } from 'react';
import { Link } from 'react-router-dom';
import { createUserWithEmailAndPassword, updateProfile, getAuth } from 'firebase/auth'
import {app,db} from '../../config/firebase'
import Logo from '../../olx-logo.png';
import './Signup.css';
import { addDoc, collection} from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import {AuthContext} from '../../Contexts/AuthContext';


export default function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [emailErr, setEmailErr] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [passwordErr, setPasswordErr] = useState('');
  const [err, setErr] = useState('');
  const [load,setLoad]=useState('');
  const {setCurrentUser}=useContext(AuthContext);
  
  const navigate=useNavigate();
  const auth = getAuth(app);

  function registerUser(e){
    e.preventDefault();
    async function registerWithEmailAndPassword(){
      try {
        setLoad('Loading...');
        const {user} = await createUserWithEmailAndPassword(auth,email, password);
        // sessionStorage.setItem('Auth Token', user._tokenResponse.refreshToken);
       await updateProfile(user,{displayName:name});
     await addDoc(collection(db,'users'),{
        uid:user.uid,
        name,
        email,
        phone
       });
       setCurrentUser({name,uid:user.uid});
        navigate('/');
       
      } catch (err) {
        setLoad('');
        console.error(err.message);
        switch (err.code) {
          case "auth/invalid-email":
            setEmailErr('Invalid email Address');
            break;
          case "auth/weak-password":
            setPasswordErr('Weak Password');
            break;
          case "auth/email-already-in-use":
            setErr('Email already exists');
            break;
          default:setErr(err.message)
        }
      }
    };
    return registerWithEmailAndPassword();

  }
  return (
    <div>
      <div className="signupParentDiv">
        <img width="200px" height="200px" src={Logo} alt="logo"></img>
        <form>
          <p>{load}</p>
          <p className='error'>{err}</p>
          <label htmlFor="fname">Username</label>
          <br />
          <input
            className="input"
            type="text"
            id="fname"
            name="name"
            onChange={(e)=>{
              setName(e.target.value)
            }}
            defaultValue=""
          />
          <br />
          <p className='error'>{emailErr}</p>

          <label htmlFor="fname">Email</label>
          <br />
          <input
            onChange={(e) => {
              setEmail(e.target.value)
            }}
            className="input"
            type="email"
            id="email"
            name="email"
            defaultValue=""
          />
          <br />
          <label htmlFor="lname">Phone</label>
          <br />
          <input
            onChange={(e) => {
              setPhone(e.target.value)
            }}
            className="input"
            type="number"
            id="lname"
            name="phone"
            defaultValue=""
          />
          <br />
          <label htmlFor="lname">Password</label>
          <p className='error'>{passwordErr}</p>

          <br />
          <input
            onChange={(e) => {
              setPassword(e.target.value)
            }}
            className="input"
            type="password"
            id="password"
            name="password"
            defaultValue=""
          />
          <br />
          <br />
          
          
          <button disabled={name === "" || email === "" || phone === "" || password === ""?true: false} onClick={(e)=>registerUser(e)}>Signup</button>
          
        </form>
        <Link to='/login'>Login</Link>
        <Link to='/'>Back to Home</Link>

      </div>
    </div>
  );
}

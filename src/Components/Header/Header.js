import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { getAuth } from "firebase/auth"
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Contexts/AuthContext'


import './Header.css';
import OlxLogo from '../../assets/OlxLogo';
import Search from '../../assets/Search';
import Arrow from '../../assets/Arrow';
import SellButton from '../../assets/SellButton';
import SellButtonPlus from '../../assets/SellButtonPlus';


function Header() {
  const navigate = useNavigate();
  const { currentUser, setCurrentUser } = useContext(AuthContext);
  function handleLogOut() {
    console.log('logout')
    const auth = getAuth();
    auth.signOut();
    setCurrentUser({});
    navigate('/');
    console.log('end of logout');

  }

  return (
    <div className="headerParentDiv">
      <div className="headerChildDiv">
        <div onClick={() => { navigate('/') } }className="brandName">

          <OlxLogo ></OlxLogo>
        </div>
        <div className="placeSearch">
          <Search></Search>
          <input type="text" />
          <Arrow></Arrow>
        </div>
        <div className="productSearch">
          <div className="input">
            <input
              type="text"
              placeholder="Find car,mobile phone and more..."
            />
          </div>
          <div className="searchAction">
            <Search color="#ffffff"></Search>
          </div>
        </div>
        <div className="language">
          <span> ENGLISH </span>
          <Arrow></Arrow>
        </div>
        <div className="loginPage">
          {
            currentUser.name ? <span>{currentUser.name}</span> : <Link to='/login'>Login</Link>
          }
          <hr />
        </div>
        <div className="loginPage">
          {
            currentUser.name ? <button onClick={handleLogOut}> Logout</button> : ''
          }
          <hr />
        </div>

        <div className="sellMenu" onClick={()=>{
          currentUser.name ? navigate('/create'):navigate('/login')
        }}>
          <SellButton></SellButton>
          <div className="sellMenuContent">
            <SellButtonPlus></SellButtonPlus>

            SELL
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;

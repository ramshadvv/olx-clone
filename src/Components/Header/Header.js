import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { getAuth } from "firebase/auth"
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Contexts/AuthContext'
import { Modal,Box,Button,Typography} from '@mui/material';
import './Header.css';
import OlxLogo from '../../assets/OlxLogo';
import Search from '../../assets/Search';
import Arrow from '../../assets/Arrow';
import SellButton from '../../assets/SellButton';
import SellButtonPlus from '../../assets/SellButtonPlus';


function Header() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
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
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };
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
            currentUser.name ? <Button onClick={handleOpen}>
              Logout
            </Button> : ''
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
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title"
            variant="h6" component="h2">
            Are you sure you want to Logout
          </Typography>
          <Typography id="modal-modal-description"
            sx={{ mt: 2 }}>
            <Button color="success" variant="contained" onClick={handleClose}>
              No
            </Button>
            <Button variant="contained" sx={{ ml: 2 }} color="error" onClick={()=>{handleClose();
              handleLogOut();}}  >
              Yes
            </Button >
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}

export default Header;

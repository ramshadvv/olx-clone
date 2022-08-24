import React, { useContext, useState } from 'react';
import './Create.css';
import Header from '../Header/Header';
import { db, storage } from '../../config/firebase';
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { addDoc, collection } from 'firebase/firestore';
import { AuthContext } from '../../Contexts/AuthContext';
import { useNavigate } from 'react-router-dom';


const Create = () => {
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const [img, setImg] = useState('');
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();


  function handleSubmit(e) {
    const date=new Date();
    e.preventDefault();
    (async () => {
console.log(currentUser.uid);
      const imageRef = ref(storage, `images/${img.name}`);
      uploadBytes(imageRef, img).then((snapshot) => {
        getDownloadURL(snapshot.ref).then((url) => 
        addDoc(collection(db, 'products'), {
          userId:currentUser.uid ,
          name,
          category,
          price,
          url,
          createdAt:`${date.getDate()}-${date.getMonth()}-${date.getFullYear()}`
        }));
    }).catch(err => console.log(err)).finally(()=>navigate('/'))
    })();
  }
  return (
    <>
      <Header />
      <card>
        <div className="centerDiv">
          <form>
            <label htmlFor="fname">Name</label>
            <br />
            <input
              className="input"
              type="text"
              id="fname"
              name="Name"
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
            <br />
            <label htmlFor="fname">Category</label>
            <br />
            <input
              className="input"
              type="text"
              id="fname"
              name="category"
              onChange={(e) => {
                setCategory(e.target.value);
              }}
            />
            <br />
            <label htmlFor="fname">Price</label>
            <br />
            <input className="input" type="number" id="fname" name="Price" onChange={(e) => {
              setPrice(e.target.value);
            }} />
            <br />
          </form>
          <br />
          <img alt='posts' width="200px" height="200px" src={img ? URL.createObjectURL(img) : ''}></img>
          <form>
            <br />
            <input type="file" onChange={(e) => {
              setImg(e.target.files[0]);
            }} />
            <br />
            <button disabled={name === '' || category === '' || price === '' || img === '' ? true : false} className="uploadBtn" onClick={(e) => handleSubmit(e)}>upload and Submit</button>
          </form>
        </div>
      </card>
    </>
  );
};

export default Create;

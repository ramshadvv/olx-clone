import React, { useContext,useState,useEffect } from 'react';
import { getDocs, collection } from 'firebase/firestore';
import { db } from '../../config/firebase';
import { PostContext } from '../../Contexts/PostContext';


import './View.css';

function View() {
  const {postDetails} = useContext(PostContext);
  const [userDetails,setUserDetails]=useState({});
useEffect(()=>{
  async function getUser() {
    // const result=await db.collection('users').doc('fK3ddutEpD2qQqRMXNW5').get();
    // console.log(result);
    const colRef = collection(db, 'users');
    const snapshots = await getDocs(colRef);
    const docs = snapshots.docs.map((doc) => doc.data());
    const result = docs.filter((doc) => { return (doc.uid===postDetails.userId) });
    setUserDetails(...result);
  }
  getUser();
},[])
  return (
    <div className="viewParentDiv">
      <div className="imageShowDiv">
        <img
          src={postDetails.url}
          alt=""
        />
      </div>
      <div className="rightSection">
        <div className="productDetails">
          <p>&#x20B9;{postDetails.price} </p>
          <span>{postDetails.name}</span>
          <p>{postDetails.category}</p>
          <span>{postDetails.createdAt}</span>
        </div>
        <div className="contactDetails">
          <p>Seller details</p>
          <p>{userDetails.name ? userDetails.name:''}</p>
          <p>{userDetails.phone ? userDetails.phone:' '}</p>
        </div>
      </div>
    </div>
  );
}
export default View;

import React, { useContext, useEffect, useState } from 'react';
import Heart from '../../assets/Heart';
import './Post.css';
import { getDocs, collection } from 'firebase/firestore';
import { db } from '../../config/firebase';
import { PostContext } from '../../Contexts/PostContext';
import { useNavigate } from 'react-router-dom';


function Posts() {
  const [posts, setPosts] = useState([]);
  const { setPostDetails } = useContext(PostContext);


  useEffect(() => {
    async function getProducts() {
      const colRef = collection(db, 'products');
      const snapshots = await getDocs(colRef);
      const docs = snapshots.docs.map((doc) => doc.data());
      const result = docs.map((doc) => { return { ...doc } });
      console.log(result);
      setPosts(result);
    }
    getProducts();

  }, [])

const navigate=useNavigate();
  return (
    <div className="postParentDiv">
      <div className="moreView">
        <div className="heading">
          <span>Quick Menu</span>
          <span>View more</span>
        </div>
        <div className="cards">
          {
            posts.map((obj,i) => {
              return (
                <div className="card" key={i} onClick={()=>{
                  setPostDetails(obj);
                  navigate('/viewpost')
                  }}>

                  <div className="favorite">
                    <Heart></Heart>
                  </div>
                  <div className="image">
                    <img src={obj.url} alt="" />
                  </div>
                  <div className="content">
                    <p className="rate">&#x20B9;{obj.price}</p>
                    <span className="kilometer">{obj.category}</span>
                    <p className="name"> {obj.name}</p>
                  </div>
                  <div className="date">
                    <span>{obj.createdAt}</span>
                  </div>
                </div>
              )
            })
          }
        </div>

      </div>
      <div className="recommendations">
        <div className="heading">
          <span>Fresh recommendations</span>
        </div>
        <div className="cards">
          <div className="card">
            <div className="favorite">
              <Heart></Heart>
            </div>
            <div className="image">
              <img src="../../../public/Images/R15V3.jpg" alt="" />
            </div>
            <div className="content">
              <p className="rate">&#x20B9; 250000</p>
              <span className="kilometer">Two Wheeler</span>
              <p className="name"> YAMAHA R15V3</p>
            </div>
            <div className="date">
              <span>10/5/2021</span>
            </div>
          </div>
        </div>
      </div>
    </div >
  );
}

export default Posts;

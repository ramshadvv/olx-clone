import React from 'react';

import './Banner.css';
import Arrow from '../../assets/Arrow'
function Banner() {
  return (
    <div className="bannerParentDiv">
      <div className="bannerChildDiv">
        <div className="menuBar">
          <div className="categoryMenu">
            <span>ALL CATEGORIES</span>
            <Arrow></Arrow> 
          </div>
          <div className="otherQuickOptions">
            <span>Cars</span>
            <span>Motorcy...</span>
            <span>Mobile Ph...</span>
            <span>For Sale:Houses & Apart...</span>
            <span>Scoot...</span>
            <span>Commercial & Other Ve...</span>
            <span>For Rent: House & Apart...</span>
          </div>
        </div>
        <div className="banner">
          <img
            src="https://firebasestorage.googleapis.com/v0/b/olx-clone-8f349.appspot.com/o/images%2Fbannercopy.png?alt=media&token=50a11960-bc9c-4650-9036-2908411f9fdf"
            alt=""
          />
        </div>
      </div>
      
    </div>
  );
}

export default Banner;

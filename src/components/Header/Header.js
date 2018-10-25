import React from 'react';
import Logoimg from '../../assets/images/lia-logo.png';

const Header = () => {
  return (
    <div>
      <header className="headersize">
        <ul>
          <li>
            <img src={Logoimg} alt="fireSpot" className="imgsize" />
          </li>
          <li>
            <span id="header_cob">
              <span>HEALTHCARE</span>
              <span>COB Solution</span>
            </span>
          </li>
          <li>
            <span>Recovery Estimator</span>
          </li>
        </ul>
      </header>
    </div>
  );
};

export default Header;

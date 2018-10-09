import React from 'react';
import Logoimg from "./HeaderLia.JPG"

const Header = () => {
  return (
    <div>
    <header className="headersize">

    <img  src={Logoimg}  alt="fireSpot" className="imgsize"/>

    </header>
    </div>
  );
};

export default Header;


import React from 'react';
import {Link} from 'react-router-dom'

const Footer = () => {
  return <footer>
    <p>copyright &copy; 2022 </p>
    <Link to='/about'>About us</Link>
  </footer>;
};

export default Footer;


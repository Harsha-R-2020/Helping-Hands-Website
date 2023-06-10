import React from 'react';
import { Link } from 'react-router-dom';
import './home.css';
import NavbarL from './navbar';
const HomeL = () => {
  return (
    <div>
      <NavbarL/>
    <div className="background">
      <div className="content">
        <h1>Help Us Make a Difference</h1>
        <p>We are a non-profit organization that strives to make a positive impact in our community. Join us in our mission to create a better world for all.</p>
        <Link to="/donate" className="btn btn-primary">Donate Now</Link>
      </div>
    </div>
    </div>
  );
}

export default HomeL;


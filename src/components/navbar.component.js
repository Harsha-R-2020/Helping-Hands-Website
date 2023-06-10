import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Navbar extends Component {

  render() {
    return (
      <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
        <img src="logo.png" alt="logo" width="30px" height="30px"></img>
        <Link to="/" className="navbar-brand">Helping Hand</Link>
        <div className="collpase navbar-collapse">
        <ul className="navbar-nav mr-auto">
          <li className="navbar-item">
            <Link to="/login" className="nav-link">Log in</Link>
          </li>
          <li className="navbar-item">
            <Link to="/register" className="nav-link">Sign Up</Link>
          </li>
        </ul>
        </div>
      </nav>
    );
  }
}
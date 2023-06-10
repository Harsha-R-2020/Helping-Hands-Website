import React, { Component } from 'react';
import { Link } from 'react-router-dom';
export default class NavbarL extends Component {
    render() {
    return (
      <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
         <img src="logo.png" alt="logo" width="30px" height="30px"></img>
        <Link to="/homel" className="navbar-brand">Helping Hand</Link>
        <div className="collpase navbar-collapse">
        <ul className="navbar-nav mr-auto">
          <li className="navbar-item">
            <Link to="/donate" className="nav-link">Donate</Link>
          </li>
          <li className="navbar-item">
            <Link to="/view-all" className="nav-link">All Donations</Link>
          </li>
          <li className="navbar-item">
            <Link to="/view" className="nav-link">My Donations</Link>
          </li>
          <li className="navbar-item">
          <Link to="/logout" className="nav-link">Logout</Link>
          </li>
        </ul>
        </div>
      </nav>
    );
  }
}
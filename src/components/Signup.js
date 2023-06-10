import React, { Component } from 'react';
import axios from 'axios';
import './Signup.css';
import Navbar from './navbar.component';

export default class CreateUser extends Component {
  constructor(props) {
    super(props);

    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onChangeMail = this.onChangeMail.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      username: '',
      mail:'',
      password: '',
    }
  }
  onChangeUsername(e) {
    this.setState({
      username: e.target.value
    })
  }
  onChangeMail(e) {
    this.setState({
      mail: e.target.value
    })
  }
  onChangePassword(e) {
    this.setState({
      password: e.target.value
    })
  }
  onSubmit(e) {
    e.preventDefault();

    const user = {
      username: this.state.username,
      mail:this.state.mail,
      password: this.state.password,
    }

   // console.log(user);

    axios.post('http://localhost:5000/users/add', user)
    .then(res => {
      alert(res.data.message);
      this.setState({
        username: '',
        mail:'',
        password: '',
      });
      window.location='/login';
    })
    .catch(err => {
      alert(err.response.data.error);
      this.setState({
        username: '',
        mail:'',
        password: '',
      });
    });
  }
  render() {
    return (
      <div>
        <Navbar/>
      <div class="background"> 
        <div className="container">
        <h5>SIGN UP</h5>
        <form onSubmit={this.onSubmit}>
          <div className="form-group"> 
            <label>Name: </label>
            <input  type="text"
                className="form-control"
                value={this.state.username}
                onChange={this.onChangeUsername}
                />
          </div>
          <div className="form-group"> 
            <label>Mail ID: </label>
            <input  type="text"
                className="form-control"
                value={this.state.mail}
                onChange={this.onChangeMail}
                />
          </div>
          <div className="form-group"> 
            <label>Password: </label>
            <input  type="password"
                className="form-control"
                value={this.state.password}
                onChange={this.onChangePassword}
                />
          </div>
          <div className="form-group">
            <input type="submit" value="Sign Up" className="btn btn-primary" />
          </div>
        </form>
        </div>
      </div>
      </div>
    )
  }
}
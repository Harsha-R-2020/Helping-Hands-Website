import React, { Component } from 'react';
import axios from 'axios';
import './Login.css';
import Navbar from './navbar.component';
export default class Change extends Component {
  constructor(props) {
    super(props);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onChangeOtp = this.onChangeOtp.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.state = {
      password: '',
      otp:'',
    };
  }
  onChangePassword(e) {
    this.setState({
      password: e.target.value
    })
  }
  onChangeOtp(e) {
    this.setState({
      otp: e.target.value
    })
  }
  onSubmit(e) {
    e.preventDefault();
    const mail=sessionStorage.getItem('mail');
    const user = {
        mail:mail,
        password: this.state.password,
        otp:this.state.otp,
    }
    axios.post('http://localhost:5000/users/change', user)
    .then(res => {
        alert(res.data.message);
      this.setState({
        password: '',
        otp:'',
      });
      window.location='/login';
      sessionStorage.setItem('mail', '');
    }
  )
    .catch(err => {
      alert(err.response.data.error);
      this.setState({
        password: '',
        otp:'',
      });
      if(err.response.data.redirect){
        window.location=err.response.data.redirect;
        sessionStorage.setItem('mail', '');
      }
      window.location='/change';
      sessionStorage.setItem('mail', '');
    });
  }
  render() {
    return (
      <div>
        <Navbar />
      <div class="background">
        <div className="container">
        <h5>Change Password</h5>
        <form onSubmit={this.onSubmit}>
          <div className="form-group"> 
            <label>New Password: </label>
            <input  type="password"
                className="form-control"
                value={this.state.password}
                onChange={this.onChangePassword}
                />
          </div>
          <div className="form-group"> 
            <label>Enter OTP: </label>
            <input  type="text"
                className="form-control"
                value={this.state.otp}
                onChange={this.onChangeOtp}
                />
          </div>
          <div className="form-group">
            <input type="submit" value="Change Password" className="btn btn-primary" />
          </div>
        </form>
        </div>
      </div>
      </div>
    )
  }
}

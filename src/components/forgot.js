import React, { Component } from 'react';
import axios from 'axios';
import './Login.css';
import Navbar from './navbar.component';
export default class Forgot extends Component {
  constructor(props) {
    super(props);
    this.onChangeMail = this.onChangeMail.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.state = {
      mail: ''
    };
  }

  onChangeMail(e) {
    this.setState({
      mail: e.target.value
    })
  }
  onSubmit(e) {
    e.preventDefault();

    const user = {
      mail:this.state.mail
    }
    axios.post('http://localhost:5000/users/forgot', user)
    .then(res => {
      alert(res.data.message)
      this.setState({
        mail:'',
      });
      sessionStorage.setItem('mail',res.data.mail);
      window.location='/forgot';
    }
  )
    .catch(err => {
      alert(err.response.data.error);
      this.setState({
        mail:'',
      });
    });
  }
  render() {
    return (
      <div>
        <Navbar />
      <div class="background">
        <div className="container">
        <h5>CHANGE PASSWORD</h5>
        <form onSubmit={this.onSubmit}>
          <div className="form-group"> 
            <label>Mail ID: </label>
            <input  type="text"
                className="form-control"
                value={this.state.mail}
                onChange={this.onChangeMail}
                />
          </div>
          <div className="form-group">
            <input type="submit" value="Send OTP" className="btn btn-primary" />
          </div>
          <div className="form-group"> 
            <a href="/login">Back to Login</a>
          </div>
        </form>
        </div>
      </div>
      </div>
    )
  }
}

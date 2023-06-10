import React, { Component } from 'react';
import axios from 'axios';
import './Login.css';
import Navbar from './navbar.component';
export default class Login extends Component {
  constructor(props) {
    super(props);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onChangeMail = this.onChangeMail.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.state = {
      mail: '',
      password: '',
    };
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
      mail:this.state.mail,
      password: this.state.password,
    }

   console.log(user);
    axios.post('http://localhost:5000/users/search', user)
    .then(res => {
      this.setState({
        mail:'',
        password: '',
      });
      window.location='/homel';
      sessionStorage.setItem('name', res.data.name);
    }
  )
    .catch(err => {
      alert(err.response.data.error);
      this.setState({
        mail:'',
        password: '',
      });
    });
  }
  render() {
    return (
      <div>
        <Navbar />
      <div class="background">
        <div className="container">
        <h5>LOGIN</h5>
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
            <label>Password: </label>
            <input  type="password"
                className="form-control"
                value={this.state.password}
                onChange={this.onChangePassword}
                />
          </div>
          <div className="form-group">
            <input type="submit" value="Log in" className="btn btn-primary" />
          </div>
          <div className="form-group"> 
            <a href="/change">Forgot Password?</a>
          </div>
        </form>
        </div>
      </div>
      </div>
    )
  }
}

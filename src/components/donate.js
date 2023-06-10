import React, { Component } from 'react';
import axios from 'axios';
import './donate.css';
import NavbarL from './navbar';
export default class Donate extends Component {
  constructor(props) {
    super(props);

    this.onChangePname = this.onChangePname.bind(this);
    this.onChangequant = this.onChangequant.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      pname: '',
      quant:'',
      description: '',
    }
  }
  onChangePname(e) {
    this.setState({
      pname: e.target.value
    })
  }
  onChangequant(e) {
    this.setState({
      quant: e.target.value
    })
  }
  onChangeDescription(e) {
    this.setState({
      description: e.target.value
    })
  }
  onSubmit(e) {
    e.preventDefault();
    const name = sessionStorage.getItem('name');
    const donate = {
      name:name,
      pname: this.state.pname,
      quant:this.state.quant,
      description: this.state.description,
    }

    axios.post('http://localhost:5000/donates/donate', donate)
    .then(res => {
      alert(res.data.message);
      this.setState({
        pname: '',
        quant:'',
        description: '',
      });
    })
    .catch(err => {
      if(err.response.data.error=='/login'){
        window.location=err.response.data.error;
      }
      else{
      alert(err.response.data.error);
      this.setState({
        pname: '',
        quant:'',
        description: '',
      });}
    });
  }
  render() {
    return (
      <div>
        <NavbarL/>
        <h5>DONATE FOR A REASON</h5>
        <form onSubmit={this.onSubmit}>
          <div className="form-page"> 
            <label>Product Name</label>
            <input  type="text"
                className="form-control"
                value={this.state.pname}
                onChange={this.onChangePname}
                />
          </div>
          <div className="form-page"> 
            <label>Quantity</label>
            <input  type="text"
                className="form-control"
                value={this.state.quant}
                onChange={this.onChangequant}
                />
          </div>
          <div className="form-page"> 
            <label>Description</label>
            <input  type="text"
                className="form-control"
                value={this.state.description}
                onChange={this.onChangeDescription}
                />
          </div>
          <div className="form-page">
            <input type="submit" value="Donate" className="btn btn-primary" />
          </div>
        </form>
        </div>
    )
  }
}
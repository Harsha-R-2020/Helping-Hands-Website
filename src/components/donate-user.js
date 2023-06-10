import React, { Component } from 'react';
import axios from 'axios';
import NavbarL from './navbar';
import {Link} from 'react-router-dom';
import './donate-list.css'
const DonateL = props => (
  <tr>
    <td>{props.donate.pname}</td>
    <td>{props.donate.quant}</td>
    <td>{props.donate.description}</td>
    <td><a href="#" onClick={() => { props.deleteDonate(props.donate._id) }}>Delete</a></td>
  </tr>
)

export default class DonationListL extends Component {
  constructor(props) {
    super(props);
    this.state = {donatess: []};
    this.deleteDonate = this.deleteDonate.bind(this);
  }

  componentDidMount() {
    const name = sessionStorage.getItem('name');
    axios.get('http://localhost:5000/donates/view',{ params: { name } })
      .then(response => {
        this.setState({donatess: response.data })
      })
      .catch((err) => {
        if(err.response.data.error=='/login'){
            window.location=err.response.data.error;
          }
          else{
          alert(err.response.data.error);
          }
      })
  }
  deleteDonate(id) {
    axios.delete('http://localhost:5000/donates/delete',{ params: { id } })
      .then(response => { 
        this.setState({
          donatess: this.state.donatess.filter(el => el._id !== id)
        });
      alert(response.data)})
      .catch((err) => {
       alert(err.response.data);

      })
  }
  donateList() {
    if(this.state.donatess.length==0){
      return (
        <tr>
          <td colSpan="3" className="text-center">No results found</td>
        </tr>
      );
    }
    return this.state.donatess.map(currentdonate=> {
      return <DonateL donate={currentdonate} deleteDonate={this.deleteDonate} key={currentdonate._id}/>;
    })
  }

  render() {
    return (
      <div>
        <NavbarL/>
        <h5>DONATIONS</h5>
        <table className="table">
          <thead className="thead-dark">
            <tr>
              <th>Product Name</th>
              <th>Quantity(No/Weight in Kg)</th>
              <th>Description</th>
              <th>Updates</th>
            </tr>
          </thead>
          <tbody>
            { this.donateList() }
          </tbody>
        </table>
      </div>
    )
  }
}
import React, { Component } from 'react';
import axios from 'axios';
import NavbarL from './navbar';
import './donate-list.css';
const Donate = props => (
  <tr>
    <td>{props.donate.pname}</td>
    <td>{props.donate.quant}</td>
    <td>{props.donate.description}</td>
    <td>
    <div className="form-page">
    <input
          type="submit"
          value="Contact by Mail"
          className="btn btn-primary"
          onClick={() => {
            window.location.href = `mailto:${props.donate.name}?subject=Contacting you through helping Hand`;
          }}
        />
          </div>
    </td>
  </tr>
)

export default class DonationList extends Component {
  constructor(props) {
    super(props);
    this.state = {donates: []};
  }

  componentDidMount() {
    const name = sessionStorage.getItem('name');
    axios.get('http://localhost:5000/donates/v',{ params: { name } })
      .then(response => {
        this.setState({ donates: response.data })
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
  donateList() {
    if(this.state.donates.length==0){
      return (
        <tr>
          <td colSpan="3" className="text-center">No results found</td>
        </tr>
      );
    }
    return this.state.donates.map(currentdonate=> {
      return <Donate donate={currentdonate}/>;
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
              <th>Mail ID</th>
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
import { Component } from 'react';

export default class Logout extends Component {
  constructor(props) {
    super(props);
    sessionStorage.setItem('name', '');
    localStorage.removeItem('token');
  }

  componentDidMount() {
    window.onpageshow = function(event) {
      if (event.persisted) {
        window.location.reload();
      }
    };
    this.handleLogout();
  }

  handleLogout = () => {
    window.history.go();
    window.location = "/login";
  }

  render() {
    return null;
  }
}

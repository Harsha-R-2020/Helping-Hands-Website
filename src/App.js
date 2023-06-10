import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route,Routes} from "react-router-dom";
import CreateUser from "./components/Signup";
import Login from "./components/Login";
import Home from "./components/home";
import HomeL from './components/home-login';
import Logout from './components/Logout';
import Donate from './components/donate';
import DonationList from './components/donate-list';
import DonationListL from './components/donate-user';
import Forgot from './components/forgot';
import Change from './components/change-pass';
function App() {
  return (
        <Router>
          <Routes>
            <Route exact path="/" element={<Home/>} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<CreateUser />} />
            <Route path="/homel" element={<HomeL />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/donate" element={<Donate/>} />
            <Route path="/view-all" element={<DonationList/>} />
            <Route path="/view" element={<DonationListL/>} />
            <Route path="/change" element={<Forgot/>} />
            <Route path="/forgot" element={<Change/>} />
          </Routes>
        </Router>
  );
}
export default App;

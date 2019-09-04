import React from "react";
import "./css/App.css";
import { Route } from "react-router-dom";
import LoginRegForm from "./components/LoginRegForm";
import DashBoard from "./components/DashBoard";
import Profile from "./components/Profile";
import "semantic-ui-css/semantic.min.css";

function App() {
  return (
    <div className="App">
      <Route exact path="/" render={props => <LoginRegForm {...props} />} />
      <Route path="/dashboard" render={props => <DashBoard {...props} />} />
      <Route path="/profile" render={props => <Profile {...props} />} />
    </div>
  );
}

export default App;

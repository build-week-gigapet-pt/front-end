import React from "react";
import "./css/App.css";
import { Route } from "react-router-dom";
// import GetCreds from "./components/GetCreds";
import LoginRegForm from "./components/LoginRegForm";
import "semantic-ui-css/semantic.min.css";

function App() {
  return (
    <div className="App">
      <Route
        exact
        path="/login"
        render={props => <LoginRegForm {...props} />}
      />
    </div>
  );
}

export default App;

import React from "react";
import "./css/App.css";
import LoginRegForm from "./components/LoginRegForm";
import { Container } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";

function App() {
  return (
    <div className="App">
      <Container className="loginreg-form-container">
        <LoginRegForm />
      </Container>
    </div>
  );
}

export default App;

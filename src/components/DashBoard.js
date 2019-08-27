import React from "react";
import { NavLink } from "react-router-dom";
import { axiosWithAuth } from "./axiosAuth";
import { Container, Image, Header, Icon } from "semantic-ui-react";
import logo from "../imgs/gigapet-logo.png";

const DashBoard = props => {
  return (
    <Container className="main-container">
      <Container className="main-dashboard-inner">
        <Header>
          <Image className="header-logo" src={logo} alt="GigaPet Logo Small" />
          <div className="header-menu">
            <Icon name="ellipsis vertical"></Icon>
          </div>
        </Header>

        <Container className="nav-menu">
          <div className="close-container">
            <Icon className="close" name="close"></Icon>
          </div>
          <ul>
            <li>
              {" "}
              <NavLink to="/profile">
                Profile <Icon name="user" />
              </NavLink>
            </li>
            <li>
              <NavLink to="/login">Logout</NavLink>
            </li>
          </ul>
        </Container>
      </Container>
    </Container>
  );
};

export default DashBoard;

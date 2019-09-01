import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { axiosWithAuth } from "./axiosAuth";
import { Container, Image, Header, Icon } from "semantic-ui-react";
import logo from "../imgs/gigapet-logo.png";
import ChildCard from "./ChildCard";

const DashBoard = props => {
  const [active, setActive] = useState("");
  const [parent, setParent] = useState("");

  useEffect(() => {
    axiosWithAuth()
      .get("https://lambda-gigapet2.herokuapp.com/api/parent/1")
      .then(res => {
        //console.log(res.data);
        setParent(res.data);
      })
      .catch(err => console.log(err));
  }, []);

  return (
    parent && (
      <Container className="main-container">
        <Container className="main-dashboard-inner">
          <Header>
            <Image
              className="header-logo"
              src={logo}
              alt="GigaPet Logo Small"
            />
            <div
              className="header-menu"
              onClick={e => {
                e.preventDefault();
                e.stopPropagation();
                active === "" ? setActive("menu-active") : setActive("");
              }}
            ></div>
          </Header>
          <Container className="parent-info">
            <p className="dashboard-title">
              <Icon name="dashboard"></Icon> Dashboard
            </p>
            <p className="welcome-name">Welcome, {parent.name}!</p>
            <p className="children-count">
              You have {parent.childArray.length}
              {parent.childArray.length > 1 || parent.childArray.length === 0
                ? ` active children.`
                : ` active child.`}
            </p>
            <ul>
              {/* <li>
                {" "}
                <NavLink to="/profile">
                  <Icon name="user" />
                  &nbsp;Profile
                </NavLink>
              </li> */}
              <li>
                <NavLink to="/">
                  <Icon name="sign-out" />
                  &nbsp;Logout
                </NavLink>
              </li>
            </ul>
          </Container>
          <Container className="childcard-container">
            {parent.childArray.map((child, i) => {
              return (
                <ChildCard key={i} child={child} history={props.history} />
              );
            })}
          </Container>
        </Container>
      </Container>
    )
  );
};

export default DashBoard;

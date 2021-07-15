import { Navbar, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Styled from "styled-components";
import React from "react";
import { Grid } from "@material-ui/core";

const routes = [
  { path: "/terms", displayname: "Terms and Conditions" },
  { path: "/impressum", displayname: "Impressum" },
  { path: "/emergency", displayname: "Emergency" },
];

class PlainFooter extends React.Component {
  render() {
    return (
      <footer className="footer">
          <Navbar bg="light" expand="lg">
            <Nav className="mr-auto">
              {routes.map((route) => {
                return (
                  <Nav.Item key={route.path}>
                    <Link to={route.path} className="nav-link">
                      {route.displayname}
                    </Link>
                  </Nav.Item>
                );
              })}
            </Nav>
          </Navbar>
      </footer>
    );
  }
}

export const Footer = Styled(PlainFooter)`
    max-height: 35px;
    bottom: 0;
    position: flexible;
    background: white;
    > p {
        text-align: center;
        margin-top: 4px;
    }
`;

import { Navbar, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Styled from "styled-components";
import React from "react";

const routes = [
  { path: "/terms", displayname: "Terms and Conditions" },
  { path: "/impressum", displayname: "Impressum" },
  { path: "/emergency", displayname: "Emergency" },
];

class PlainFooter extends React.Component {
  render() {
    return (
        <div className={this.props.className}>
      <footer>
        <Navbar bg="light" expand="lg">
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              {routes.map((route) => {
                return (
                  <Nav.Item>
                    <Link to={route.path} className="nav-link">
                      {route.displayname}
                    </Link>
                  </Nav.Item>
                );
              })}
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </footer>
      </div>
    );
  }
}

export const Footer = Styled(PlainFooter)`
    max-height: 35px;
    bottom: 0;
    left: 0;
    right: 0;
    position: absolute;
    background: white;
    > p {
        text-align: center;
        margin-top: 4px;
    }
`;

// export default Footer;

// "use strict";

// import React from 'react';
// import Styled from 'styled-components';

// class PlainFooter extends React.Component {

//     constructor(props) {
//         super(props);
//     }

//     render() {
//         return (
//             <div className={this.props.className}>
//                 <hr/>
//                 <p>© {new Date().getFullYear()} sebis. All rights reserved.</p>
//             </div>
//         );
//     }
// }

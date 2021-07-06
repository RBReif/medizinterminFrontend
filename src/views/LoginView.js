// import { Form, Button, Container, Col } from "react-bootstrap";
// import RegisterButton from "../components/Navigation/RegisterButton";
// import Page from "../components/Page";

// const Login = () => {
//   return (
//     <Page>
//       <Container>
//         <Col></Col>
//         <h2>Login for patients</h2>
//         <Col>
//           <Form>
//             <Form.Group className="mb-3" controlId="formBasicEmail">
//               <Form.Label>Email address</Form.Label>
//               <Form.Control type="email" placeholder="Enter email" />
//               <Form.Text className="text-muted">
//                 We'll never share your email with anyone else.
//               </Form.Text>
//             </Form.Group>

//             <Form.Group className="mb-3" controlId="formBasicPassword">
//               <Form.Label>Password</Form.Label>
//               <Form.Control type="password" placeholder="Password" />
//             </Form.Group>
//             <Form.Group className="mb-3" controlId="formBasicCheckbox">
//               <Form.Check type="checkbox" label="Keep me logged in" />
//             </Form.Group>

//             <Button variant="primary" type="submit">
//               Submit
//             </Button>
//             <br />
//             <Form.Text className="text-muted">
//               Not registered yet? Sign up now:
//             </Form.Text>
//             <RegisterButton></RegisterButton>
//           </Form>
//         </Col>
//         <Col></Col>
//       </Container>
//     </Page>
//   );
// };

// export default Login;

"use strict";

import React from 'react';
import { Card } from 'react-md';
import { TextField } from '@material-ui/core';
import { withRouter, Link } from 'react-router-dom';
import { Form, Button, Container, Col } from "react-bootstrap";

import { AlertMessage } from '../components/UI/AlertMessage';
import Page from '../components/Page';


const style = { maxWidth: 500 };


class UserLogin extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            username : '',
            password : ''
        };

        this.handleChangeUsername = this.handleChangeUsername.bind(this);
        this.handleChangePassword = this.handleChangePassword.bind(this);

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChangeUsername(value) {
        this.setState(Object.assign({}, this.state, {username: value}));
    }

    handleChangePassword(value) {
        this.setState(Object.assign({}, this.state, {password: value}));
    }

    handleSubmit(event) {
        event.preventDefault();

        let user = {
            username: this.state.username,
            password: this.state.password
        };

        this.props.onSubmit(user);
    }

    render() {
        return (
            <Page>
              <Container>
         <Col></Col>
         <h2>Login for patients</h2>
        <Col></Col>
        <Col>
                <Card style={style} className="md-block-centered">
                    <form className="md-grid" onSubmit={this.handleSubmit} onReset={() => this.props.history.goBack()}>
                        <p>
                        <TextField
                            label="Login"
                            id="LoginField"
                            type="text"
                            className="md-row"
                            required={true}
                            value={this.state.username} //maybe change to e-mail address
                            onChange={this.handleChangeUsername}
                            errorText="Login is required"/>
                            </p>
                            <p>
                        <TextField
                            label="Password"
                            id="PasswordField"
                            type="password"
                            className="md-row"
                            required={true}
                            value={this.state.password}
                            onChange={this.handleChangePassword}
                            errorText="Password is required"/>
                            </p>
                            <p>
                        <Button id="submit" type="submit"
                                disabled={this.state.username == undefined || this.state.username == '' || this.state.password == undefined || this.state.password == '' ? true : false}
                                raised primary className="md-cell md-cell--2">Login</Button>
                                &nbsp;&nbsp;&nbsp;
                        <Button id="reset" type="reset" raised secondary className="md-cell md-cell--2">Dismiss</Button>
                        </p>
                        <Link to={'/register'} className="md-cell">Not registered yet?</Link>
                        <AlertMessage className="md-row md-full-width" >{this.props.error ? `${this.props.error}` : ''}</AlertMessage>
                    </form>
                </Card>
                </Col>
                <Col></Col>
                </Container>
            </Page>
        );
    }
};

export default withRouter(UserLogin);

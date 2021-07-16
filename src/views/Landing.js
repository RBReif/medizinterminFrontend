import React, {useEffect, useState} from "react";
import { Button } from "@material-ui/core";
import { Theme } from "../components/UI/Theme";
import { ThemeProvider } from "@material-ui/styles";
import "./Landing.scss"
import { Link } from "@material-ui/core";
import {useDispatch, useSelector} from "react-redux";
import {Redirect} from 'react-router-dom'
import UserService from "../services/UserService";
import {setUser} from "../redux/actions";

const Landing = () => {


  return (
      <ThemeProvider theme={Theme}>
        <div className="Landing">
          <div className="Landing-overlay Landing-inner text-light">
            <div className="container">
              <div className="row">
                <div className="col-md-12 text-center Landing-content">
                  <h1>medizintermin</h1>
                  <p >
                    Find the best doctors and your area and book your appointment!
                  </p>
                  <div>
                    <Button style={{marginRight: 5}}
                        color="primary"
                        href="/register-patients"
                    >
                      Sign Up
                    </Button>
                    <Button
                    style={{marginLeft: 5}}
                        color="secondary"
                        href="/login-patients"
                    >
                      Login
                    </Button>
                    <p></p>
                    <p></p>
                    <p></p>
                    <p></p>
                    <p>
                      <Link color="inherit" href="/login-professionals"> I am a medical professional</Link>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </ThemeProvider>
  )
}

export default Landing;

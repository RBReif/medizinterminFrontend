import React from "react";
import { Button } from "@material-ui/core";
import { Theme } from "../components/UI/Theme";
import { ThemeProvider } from "@material-ui/styles";
import { Box } from "@material-ui/core";
import { Grid } from "@material-ui/core";
import "./Landing.scss"

const Landing = () => (
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
                <Button
                  color="primary"
                  href="/register"
                >
                  Sign Up
                </Button>
                &nbsp;&nbsp;&nbsp;
                <Button
                  color="secondary"
                  href="/login"
                >
                  Login
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </ThemeProvider>
);

export default Landing;
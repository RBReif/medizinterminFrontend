import { Button } from "@material-ui/core";
import "bootstrap/dist/css/bootstrap.min.css";
import { ThemeProvider } from "@material-ui/styles";
import { Theme } from "../UI/Theme";


const LogIn = (props) => {
  return (
    <ThemeProvider theme={Theme}>
    <Button
      variant="contained"
      color="secondary"
      menuAlign="right"
      title="Log-In"
      id="dropdown-menu-align-right"
      href="/loginPatient"
    >
     Login
    </Button>
    </ThemeProvider>
  );
};

export default LogIn;

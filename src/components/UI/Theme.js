import { createTheme } from "@material-ui/core";

//THIS IS THE medizintermin THEME. You can import it by importing ThemeProvider and this theme.
//It has our CI colors and some basic props, for some component stylings.
export const Theme = createTheme ({
    palette: {
        primary: {
            main: "#5B84B1FF"
        },
        secondary: {
            main: "#C7D3D4FF"
        }
    },
    typography: {
        fontFamily: [
            '-apple-system',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
          ].join(','),
    },

    shape: {
        borderRadius: 4
    },

    spacing: 8,
    overrides: {
        MuiButton: {
            root: {
                textTransformation: "uppercase"
            }
        }
    },

    props: {
        MuiButton: {
            variant: "contained",
        },
        MuiTextField: {
            variant: "outlined",
            InputLabelProbs: {
                shrink: false
            }
        },
        MuiCard: {
            display: "flex",
        },
        MuiLink: {
            color: "#FFFFFF",     
        }
    }



});
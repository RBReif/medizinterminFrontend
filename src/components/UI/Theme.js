import { createMuiTheme } from "@material-ui/core";

//Create a theme
export const Theme = createMuiTheme ({
    palette: {
        primary: {
            main: "#8bc34a"
        },
        secondary: {
            main: "#ffc107"
        }
    },
    typography: {
        fontFamily: "Inter"
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
        }
    }



});
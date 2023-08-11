import { createTheme, responsiveFontSizes } from "@mui/material/styles"

const fontSizes = [
    {
        name: "tiny",
        value: 10,
    },
    {
        name: "small",
        value: 12
    },
    {
        name: "paragraph",
        value: 14,
    },
    {
        name: "heading6",
        value: 16,
    },
    {
        name: "heading5",
        value: 18
    }
]
const fontWeights = [
    {
        name: "Regular",
        value: 400
    },
    {
        name: "Medium",
        value: 500,
    },
    {
        name: "Semibold",
        value: 600,
    },
    {
        name: "Bold",
        value: 700
    }
]
const typographies = fontSizes.reduce((acc, item) => {
    fontWeights.forEach(fontWeight => {
        acc[`${item.name}${fontWeight.name}`] = {
            fontSize: item.value,
            fontWeight: fontWeight.value
        }
    })
    return acc
}, {})

const theme = responsiveFontSizes(createTheme({
    spacing: (factor) => `${2*factor}px`,
    components: {
        MuiCard: {
            styleOverrides: {
                root: {
                    boxShadow: "0px 15px 25px 0px #0000000D",
                    borderRadius: 18,
                },
            }
        },
        MuiFormControlLabel: {
            styleOverrides: {
                label: {
                    display: "inline-flex"
                }
            }
        },
        MuiContainer: {
            styleOverrides: {
                root: {
                    padding: "0 !important"
                }
            }
        },
        MuiTypography: {
            styleOverrides: {
                root: {
                    color: "#0E0F13"
                }
            },
            defaultProps: {
                as: "div"
            }
        },
        MuiAccordion: {
            styleOverrides: {
                root: {
                    boxShadow: "none",
                    border: "none",
                    "&::before": {
                        display: "none"
                    }
                }
            }
        },
        MuiButton: {
            variants: [
                {
                    props: { variant: "gradient" },
                    style: {
                        background: "linear-gradient(128.39deg, #FD5001 32.56%, #EF1C26 97.08%)",
                        borderRadius: 50,
                        color: "white"
                    }
                },
            ],
            styleOverrides: {
                root: ({ ownerState }) => ({
                    textTransform: "none",
                    ...(ownerState.variant === "text" && {
                        padding: "0 !important",
                        minWidth: 0
                    }),
                    ...(ownerState.variant === "contained" && {
                        color: "white"
                    })
                }),
                endIcon: {
                    position: "absolute",
                    marginRight: 0,
                    right: 8
                }
            }
        },
        MuiDialog: {
            styleOverrides: {
                paper: {
                    boxShadow: "box-shadow: 0px 15px 25px 0px #0000000D",
                    borderRadius: 18
                }
            }
        }
    },
    palette: {
        background: {
            main: "#F9F9F9"
        },
        primary: {
            main: "#FD5001"
        },
        secondary: {
            main: "#EF1C26"
        },
        error: {
            main: "#e74c3c"
        },
        warning: {
            main: "#FEB63B"
        },
        success: {
            main: "#04994C"
        },
        lightGray: {
            main: "#E7E7E7"
        },
        darkGray: {
            main: "#7B7B7B",
        },
        mainGray: {
            main: "#0E0F13"
        },
        textBlack: {
            main: "#0E0F13"
        },
        light: {
            main: "#FFF"
        },
        text: {
            primary: "#0E0F13"
        }
    },
    typography: {
        allVariants: {
            color: "#0E0F13"
        },
        tiny: {
            fontSize: "10px"
        },
        small: {
            fontSize: "12px"
        },
        paragraph: {
            fontSize: "14px"
        },
        allVariants: {
            fontFamily: "Poppins",
        },
        ...typographies,
        bold: {
            fontWeight: 700,
        },
        fontFamily: "Poppins",
    },
}))

theme.typography.h1 = {
    [theme.breakpoints.down("lg")]: {
        fontSize: "2.4rem"
    },
    [theme.breakpoints.down("md")]: {
        fontSize: "2rem"
    },
    fontSize: "2.8rem"
}
theme.typography.h2 = {
    [theme.breakpoints.down("lg")]: {
        fontSize: "2rem"
    },
    [theme.breakpoints.down("md")]: {
        fontSize: "1.8rem"
    },
    fontSize: "2.4rem"
}
theme.typography.h3 = {
    [theme.breakpoints.down("lg")]: {
        fontSize: "1.8rem"
    },
    [theme.breakpoints.down("md")]: {
        fontSize: "1.5rem"
    },
    fontSize: "2rem"
}

export default theme
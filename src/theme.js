import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  fonts: {
    heading: "Poppins, sans-serif",
    body: "Open Sans, sans-serif",
  },
  colors: {
    pink: {
      50: "#F9ECEC",
      100: "#EEC8C8",
      200: "#E3A5A5",
      300: "#D88282",
      400: "#CE5F5F",
      500: "#C33C3C",
      600: "#9C3030",
      700: "#752424",
      800: "#4E1818",
      900: "#270C0C",
    },
    red: {
      50: "#FAEAEA",
      100: "#F2C4C4",
      200: "#EA9F9F",
      300: "#E27979",
      400: "#DA5353",
      500: "#D22D2D",
      600: "#A82424",
      700: "#7E1B1B",
      800: "#541212",
      900: "#2A0909",
    },
    green: {
      50: "#EFF9EC",
      100: "#D1EEC9",
      200: "#B4E3A6",
      300: "#96D883",
      400: "#79CD60",
      500: "#5BC23D",
      600: "#499B31",
      700: "#377524",
      800: "#244E18",
      900: "#12270C",
    },
  },
  styles: {
    global: {
      html: {
        height: "100vh",
      },
      selection: {
        color: "red.500",
        backgroundColor: "transparent",
      },
      body: {
        margin: 0,
        padding: 0,
        background: "black",
        color: "pink.50",
        fontSize: 17,
        lineHeight: 1.6,
      },
      button: {
        _focus: {
          boxShadow: "none !important",
        },
      },
      "&::-webkit-scrollbar": {
        width: "10px",
      },
      "&::-webkit-scrollbar-thumb": {
        backgroundColor: "pink.50",
      },
    },
  },
});

export default theme;

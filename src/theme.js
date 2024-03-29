import { extendTheme } from '@chakra-ui/react';
import { withProse } from '@nikolovlazar/chakra-ui-prose';

const theme = extendTheme(
  {
    fonts: {
      heading: 'Poppins, sans-serif',
      body: 'Open Sans, sans-serif',
    },
    colors: {
      pink: {
        50: '#F9ECEC',
        100: '#EEC8C8',
        200: '#E3A5A5',
        300: '#D88282',
        400: '#CE5F5F',
        500: '#C33C3C',
        600: '#9C3030',
        700: '#752424',
        800: '#4E1818',
        900: '#270C0C',
      },
      brand: {
        50: '#FAEAEA',
        100: '#F2C4C4',
        200: '#EA9F9F',
        300: '#E27979',
        400: '#DA5353',
        500: '#D22D2D',
        600: '#A82424',
        700: '#7E1B1B',
        800: '#541212',
        900: '#2A0909',
      },
      green: {
        50: '#EFF9EC',
        100: '#D1EEC9',
        200: '#B4E3A6',
        300: '#96D883',
        400: '#79CD60',
        500: '#5BC23D',
        600: '#499B31',
        700: '#377524',
        800: '#244E18',
        900: '#12270C',
      },
    },
    styles: {
      global: {
        body: {
          margin: 0,
          padding: 0,
          color: 'black',
          fontSize: 'lg',
          lineHeight: '1.5rem',
        },
      },
    },
  },
  withProse({
    baseStyle: {
      hr: {
        borderColor: 'black',
      },
      a: {
        textDecoration: 'underline',
        color: 'brand.500',
        _hover: {
          fontStyle: 'italic',
        },
      },
    },
  })
);

export default theme;

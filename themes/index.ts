import { extendTheme } from '@chakra-ui/react';
import { color } from 'framer-motion';
const colors = {
  primary: {
    100: '#FFD91A',
  },
  shader: {
    50: '#FFFBE8',
    100: '#FFF7D1',
    200: '#FFF0A3',
    300: '#FFE876',
    400: '#FFE148',
    500: '#FFD91A',
    600: '#CCAE15',
    700: '#998210',
    800: '#66570A',
    900: '#332B05',
  },
  secondary: {
    100: '#FFF734',
    200: '#EF46BA',
    300: '#FF5050',
    400: '#2FD3B5',
    500: '#844CFE',
  },
  body: '#0D0E13',
};
const styles = {
  global: {
    body: {
      background: colors.body,
      color: 'white',
    },
  },
};
const theme = extendTheme({
  colors,
  styles,
});

export default theme;

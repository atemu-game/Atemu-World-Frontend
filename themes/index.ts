import { ComponentStyleConfig, extendTheme } from '@chakra-ui/react';
const colors = {
  primary: {
    100: '#FFD91A',
  },
  divider: {
    100: '#3A3A3C',
  },
  // shader: {
  //   50: '#FFFBE8',
  //   100: '#FFF7D1',
  //   200: '#FFF0A3',
  //   300: '#FFE876',
  //   400: '#FFE148',
  //   500: '#FFD91A',
  //   600: '#CCAE15',
  //   700: '#998210',
  //   800: '#66570A',
  //   900: '#332B05',
  // },
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

const Button: ComponentStyleConfig = {
  variants: {
    primary: {
      color: 'white',
      border: '1px solid',
      borderColor: 'divider.100',
      borderRadius: '0',
      fontsize: 'lg',
      fontWeight: 700,
      _hover: {
        opacity: 0.8,
      },
    },
  },
};
const Text: ComponentStyleConfig = {
  variants: {
    title: {
      fontSize: '1.5rem',
      fontWeight: 700,
      textTransform: 'uppercase',
    },
    sub_title: {
      fontSize: 'lg',
      fontWeight: 700,
      textTransform: 'uppercase',
    },
  },
};

export const Menu: ComponentStyleConfig = {
  variants: {
    profile: {
      list: {
        padding: 4,
        border: 'none',
        borderRadius: '0',
        bg: 'gray.800',
        // transform: 'translate3d(13px, 26px, 0px)!important',
      },
      item: {
        bg: 'inherit',
        color: 'gray.200',
        px: 2,
        py: 3,
        display: 'flex',
        gap: 4,
        _hover: {
          background: 'gray.700',
        },
      },
      command: {
        opacity: '0.8',
        fontFamily: 'mono',
        fontSize: 'sm',
        letterSpacing: 'tighter',
        pl: '4',
      },
      divider: {
        my: '4',
      },
    },
  },
};

const theme = extendTheme({
  colors,
  styles,
  components: {
    Button,
    Text,
    Menu,
  },
});

export default theme;

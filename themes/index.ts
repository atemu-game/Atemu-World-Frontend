import { convertHex } from '@/utils/convertHex';
import { ComponentStyleConfig, extendTheme } from '@chakra-ui/react';
export const colors = {
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
    600: '#FFCB29',
  },
  body: '#0D0E13',
};
const styles = {
  global: {
    body: {
      background: colors.body,
      color: 'rgba(255, 255, 255, 0.5)',
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
    icon_btn: {
      color: 'white',
      cursor: 'pointer',
      background: convertHex(colors.secondary[400], 0.4),
      _hover: {
        opacity: 0.5,
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
      mb: 4,
      color: 'white',
    },
    sub_title: {
      fontSize: 'lg',
      fontWeight: 700,
      textTransform: 'uppercase',
      color: 'white',
    },
    primary: {
      color: 'white',
      fontWeight: 700,
      textShadow: `0px 0px 12px #FFFFFF80`,
    },

    secondary: {
      color: 'secondary.600',
      fontWeight: 700,

      textShadow: `0px 0px 12px rgba(255, 247, 52, 0.5)`,
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
const Input: ComponentStyleConfig = {
  variants: {
    primary: {
      field: {
        border: '1px solid',
        borderColor: 'divider.100',
        borderRadius: '0',
        bg: 'inherit',
        _placeholder: {
          color: 'rgba(255, 255, 255, 0.5)',
        },
        _hover: {
          borderColor: 'secondary.400',
        },
        _focus: {
          borderColor: 'secondary.400',
        },
      },
    },
  },
};
const Radio: ComponentStyleConfig = {
  variants: {
    primary: {
      control: {
        borderColor: 'primary.100',
        bg: convertHex(colors.primary[100], 0.4),
        height: 6,
        width: 6,
        'data-checked': {
          bg: 'secondary.500',
        },
        _checked: {
          bg: convertHex(colors.secondary[400], 0.4),
          borderColor: 'secondary.400',
          color: 'secondary.400',
          _hover: {
            bg: 'white',
            borderColor: 'secondary.400',
          },
        },

        _hover: {},
      },
      container: {
        height: 6,
        width: 6,
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
    Input,
    Radio,
  },
});

export default theme;

import { convertHex } from '@/utils/convertHex';
import {
  ComponentStyleConfig,
  extendTheme,
  StyleFunctionProps,
} from '@chakra-ui/react';
export const colors = {
  primary: {
    100: '#DFAA6C',
    200: '#12141A',
    300: '#131417',
    400: '#FDD969',
    500: '#B27122',
    600: '#E8B77C',
  },
  divider: {
    100: '#3A3A3C',
  },

  secondary: {
    100: '#FFF734',
    200: '#EF46BA',
    300: '#FF5050',
    400: '#2FD3B5',
    500: '#844CFE',
    600: '#FFCB29',
  },

  body: '#0D0E13',
  gradient: {
    100: 'linear-gradient(90.73deg, #E8B77C -5.34%, #FDD969 56.57%, #B27122 116.05%)',
    200: 'linear-gradient(90deg, #FF9634 -15.67%, #FF5050 118.84%)',
  },
  boxShadow: {
    100: `0px 4px 16px 0px #E8B77C26 inset,
       0px -4px 16px 0px #E8B77C26 inset,
       4px 0px 16px 0px #E8B77C13 inset,
       -4px 0px 16px 0px #E8B77C13 inset`,
    200: `0px 4px 16px 0px #2FD3B5 inset,
       0px -4px 16px 0px ${convertHex('#FFFFFF', 0.75)} inset,
       4px 0px 16px 0px ${convertHex('#2FD3B5', 0.5)} inset,
       -4px 0px 16px 0px ${convertHex('#2FD3B5', 0.05)} inset`,
    300: `0px 4px 16px 0px #FF505026 inset,
    0px -4px 16px 0px #FF505026 inset,
    4px 0px 16px 0px #FF505026 inset,
    -4px 0px 16px 0px #FF505026 inset`,
  },
};

const styles = {
  global: {
    body: {
      background: colors.body,
      color: 'rgba(255, 255, 255, 0.5)',
      fontWeight: 500,
    },
  },
};

const Button: ComponentStyleConfig = {
  variants: {
    primary: {
      background: `url('./assets/arts/bg/bg_button.svg')`,
      overflow: 'hidden',
      backgroundSize: 'contain',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',

      minWidth: '120px',
      height: '48px',
      // borderRadius: '4px',
      // border: '1px solid',
      fontsize: 'lg',
      fontWeight: 700,
      transition: 'all 0.2s',
      color: 'primary.100',
      _hover: {
        background: `url('./assets/arts/bg/bg_button_hover.svg')`,
        backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        color: 'primary.300',
      },
    },
    long_btn: {
      background: `url('./assets/arts/bg/bg_button_long.svg')`,
      overflow: 'hidden',
      backgroundSize: 'contain',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      minWidth: '290px',
      height: '48px',
      // borderRadius: '4px',
      // border: '1px solid',
      fontsize: 'lg',
      fontWeight: 700,
      transition: 'all 0.2s',
      color: 'primary.100',
      _hover: {
        background: `url('./assets/arts/bg/bg_button_long_hover.svg')`,
        backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        color: 'primary.300',
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
    icon_primary: {
      border: '1px solid ',
      borderColor: 'primary.100',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      svg: {
        color: 'primary.100',
      },
    },
    secondary: {
      color: 'primary.300',
      cursor: 'pointer',
      background: 'primary.100',
      borderRadius: '0',
      padding: 2,
      border: '1px solid transparent',
      borderImageSlice: 1,
      borderImageSource: `linear-gradient(90.73deg, #E8B77C -5.34%, #FDD969 51.67%, #B27122 116.05%)`,
    },
  },
};
const Text: ComponentStyleConfig = {
  variants: {
    title: {
      fontSize: { md: '1.5rem', base: '1rem' },
      fontWeight: 800,
      textTransform: 'uppercase',
      color: 'primary.100',
    },
    title_home: {
      background: 'gradient.100',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      fontSize: { lg: '52px', base: '32px' },
      fontWeight: 'semibold',
      textAlign: 'center',
      lineHeight: 'normal',
      textTransform: 'uppercase',
    },
    sub_title: {
      fontSize: 'lg',
      fontWeight: 600,
      textTransform: 'uppercase',
      color: 'primary.100',
    },
    primary: {
      color: 'white',
      textShadow: `0px 0px 12px #FFFFFF80`,
    },

    secondary: {
      color: 'secondary.600',
      textShadow: `0px 0px 12px rgba(255, 247, 52, 0.5)`,
    },
    gradient_text: {
      background: 'gradient.100',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
    },
  },
};

const Menu: ComponentStyleConfig = {
  variants: {
    profile: {
      list: {
        padding: 4,
        border: 'none',
        borderRadius: '0',
        bg: 'primary.300',
        boxShadow: ` 0px 4px 16px 0px #E8B77C40 inset, 0px -4px 16px 0px #E8B77C40 inset,4px 0px 16px 0px #E8B77C26 inset,-4px 0px 16px 0px #E8B77C26 inset`,
      },
      item: {
        bg: 'inherit',
        color: 'rgba(255, 255, 255, 0.5)',
        px: 2,
        py: 3,
        display: 'flex',
        fontWeight: 'bold',
        gap: 4,
        transition: 'all 0.4s',
        // _hover: {
        //   color: 'white',
        // },
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
        border: '2px solid transparent',
        borderColor: 'divider.100',
        borderRadius: '0',
        bg: 'primary.100',
        borderImageSlice: 2,
        borderImageSource: `linear-gradient(90.73deg, #E8B77C -5.34%, #FDD969 51.67%, #B27122 116.05%)`,
        color: 'primary.300',
        fontWeight: 'bold',
        fontSize: 'sm',
        _placeholder: {
          color: 'primary.300',
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
        bg: 'primary.100',
        height: 6,
        width: 6,
        'data-checked': {
          bg: 'primary.100',
        },
        _checked: {
          bg: convertHex(colors.primary[100], 0.4),
          borderColor: 'primary.100',
          color: 'primary.100',

          _hover: {
            bg: 'white',
            borderColor: 'primary.100',
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
const CardBox: ComponentStyleConfig = {
  baseStyle: {
    // width: '100%',
    // height: '100%',
    // padding: () => ({
    //   base: 6,
    //   md: 8,
    // }),
  },
  variants: {
    shadow: () => ({
      background: 'primary.200',
      border: '2px solid transparent',
      borderImageSlice: 2,
      boxShadow: `0px 4px 16px 0px #E8B77C26 inset,
       0px -4px 16px 0px #E8B77C26 inset,
       4px 0px 16px 0px #E8B77C13 inset,
       -4px 0px 16px 0px #E8B77C13 inset`,
      borderImageSource:
        'linear-gradient(90.73deg, rgba(232, 183, 124, 0.075) -5.34%, rgba(253, 217, 105, 0.075) 51.67%, rgba(178, 113, 34, 0.075) 116.05%)',

      // borderImageSource: linear-gradient(90.73deg, rgba(232, 183, 124, 0.15) -5.34%, rgba(253, 217, 105, 0.15) 51.67%, rgba(178, 113, 34, 0.15) 116.05%);
    }),
    content: () => ({
      background: 'primary.100',
      color: 'primary.200',
      px: 4,
      py: 1,
      border: '2px solid transparent',
      borderImageSlice: 2,
      boxShadow: `0px 4px 16px 0px #E8B77C26 inset,
       0px -4px 16px 0px #E8B77C26 inset,
       4px 0px 16px 0px #E8B77C13 inset,
       -4px 0px 16px 0px #E8B77C13 inset`,
      borderImageSource:
        'linear-gradient(90.73deg, #E8B77C -5.34%, #FDD969 51.67%, #B27122 116.05%)',
    }),
    content_secondary: {
      border: '1px solid transparent',
      color: '#FFFFFFBF',
      background: `${convertHex(colors.secondary[400], 0.05)}`,
      borderColor: convertHex(colors.secondary[400], 0.5),
      boxShadow: `0px 4px 16px 0px #2FD3B5 inset,
       0px -4px 16px 0px ${convertHex('#FFFFFF', 0.75)} inset,
       4px 0px 16px 0px ${convertHex('#2FD3B5', 0.5)} inset,
       -4px 0px 16px 0px ${convertHex('#2FD3B5', 0.05)} inset`,
    },
  },
  defaultProps: {
    variant: 'shadow',
  },
};
const Table: ComponentStyleConfig = {
  variants: {
    leaderboard: (props: StyleFunctionProps) => ({
      table: {
        wordBreak: 'break-all',
      },
      thead: {
        background: 'primary.100',
        fontSize: 'lg',
        color: 'primary.300',
      },
      tbody: {
        td: {
          fontWeight: '700',
          color: 'primary.100',
        },
      },
    }),
  },
};
const Modal: ComponentStyleConfig = {
  variants: {
    primary: {
      overlay: {
        background: 'rgba(0, 0, 0, 0.5)',
      },
      dialog: {
        background: 'primary.300',
        padding: 4,
        borderRadius: '0',
        boxShadow: ` 0px 4px 16px 0px #E8B77C40 inset, 0px -4px 16px 0px #E8B77C40 inset,4px 0px 16px 0px #E8B77C26 inset,-4px 0px 16px 0px #E8B77C26 inset`,
      },
      body: {
        background: 'primary.300',
        px: 5,
        py: 8,
        border: '2px solid transparent',
        borderImageSlice: 2,
        borderImageSource:
          'linear-gradient(90.73deg, rgba(232, 183, 124, 0.5) -5.34%, rgba(253, 217, 105, 0.5) 51.67%, rgba(178, 113, 34, 0.5) 116.05%)',
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
    CardBox,
    Table,
    Modal,
  },
});

export default theme;

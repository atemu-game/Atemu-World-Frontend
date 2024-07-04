import { convertHex } from '@/utils/convertHex';
import { ComponentStyleConfig, extendTheme } from '@chakra-ui/react';
export const colors = {
  primary: {
    100: '#DFAA6C',
    200: '#12141A',
    300: '#131417',
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
      background: `url('./assets/arts/bg_button.svg')`,
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
        background: `url('./assets/arts/bg_button_hover.svg')`,
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
  },
};
const Text: ComponentStyleConfig = {
  variants: {
    title: {
      fontSize: '1.5rem',
      fontWeight: 600,
      textTransform: 'uppercase',
      mb: 4,
      color: 'primary.100',
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

export const Menu: ComponentStyleConfig = {
  variants: {
    profile: {
      list: {
        padding: 4,
        border: 'none',
        borderRadius: '0',
        bg: 'primary.300',
        // transform: 'translate3d(13px, 26px, 0px)!important',
      },
      item: {
        bg: 'inherit',

        px: 2,
        py: 3,
        display: 'flex',
        gap: 4,
        _hover: {
          background: '[gray].700',
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
export const CardBox: ComponentStyleConfig = {
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
    }),
    content: () => ({
      background: 'primary.100',
      color: 'primary.200',
      px: 4,
      py: 2,
      border: '2px solid transparent',
      borderImageSlice: 2,

      boxShadow: `0px 4px 16px 0px #E8B77C26 inset,
       0px -4px 16px 0px #E8B77C26 inset,
       4px 0px 16px 0px #E8B77C13 inset,
       -4px 0px 16px 0px #E8B77C13 inset`,
      borderImageSource:
        'linear-gradient(90.73deg, #E8B77C -5.34%, #FDD969 51.67%, #B27122 116.05%)',
    }),
  },
  defaultProps: {
    variant: 'shadow',
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
  },
});

export default theme;

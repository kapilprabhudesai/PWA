

const Button= {
  baseStyle: {
    // fontWeight: "bold",
    textTransform: "capitalize",
    borderRadius: "0",
    outLine: "0",
    _focus: {
      boxShadow: "none",
      outline: "0",
    },
    _disabled: {
      opacity: 0.4,
      cursor: "not-allowed",
    },
  },
  sizes: {
    sm:{
      fontSize: "14px",
      px: "10px",
      py: "5px",
    },
    md: {
      fontSize: "base",
      h: "50px",
      px: "16px",
      py: "16px",
    },
    lg: {
      fontSize: "18px",
      fontWeight: "bold",
      h: "52px",
      px: "16px",
      py: "16px",
      minW: "160px",
    },
    xl: {
      fontSize: "20px",
      fontWeight: "bold",
      h: "68px",
      px: "40px",
      py: "20px",
      minW: "160px",
      display: "inline-block",
    },
  },
  variants: {
    primary: {
      bg: "primary",
      border: "1px solid primary",
      borderColor: "primary",
      color: "white",
      _hover: {
        bg: "primary",
        color: "black",
        borderColor: 'primary',
        _disabled: {
          bg: "primary",
        },
      },
    },
    logout: {
      bg: "#33434C",
      border: "1px solid #33434C",
      borderColor: "#33434C",
      color: "white",
      _hover: {
        bg: "primary",
        color: "black",
        borderColor: 'primary',
        _disabled: {
          bg: "primary",
        },
      },
    },
    outline: {
      bg: "transparent",
      border: "1px",
      borderColor: "secondary",
      color: "secondary",
      // py: "16px",
      // px: "36px",
      transition: "border .2s ease-in",
      _hover: {
        color: "white",
        bg: "secondary",
        borderColor: "secondary",
      },
      _active: {
        color: "white",
        bg: "secondary",
        borderColor: "secondary",
      },
    },
    outlineLight: {
      bg: "transparent",
      border: "1px",
      borderColor: "white",
      color: "white",
      py: "16px",
      px: "36px",
      transition: "border .2s ease-in",
      _hover: {
        color: "primary",
        bg: "transparent",
        borderColor: "primary",
      },
      _active: {
        color: "primary",
        bg: "transparent",
        borderColor: "primary",
      },
    },
    secondary: {
      bg: "transparent",
      width: "100%",
      border: "1px",
      borderColor: "borderClr",
      color: "textClr",
      py: "16px",
      px: "36px",
      transition: "border .2s ease-in",
      _hover: {
        color: "primary",
        borderColor: "primary",
      },
      _active: {
        borderColor: "primary",
        color: "primary",
      },
    },
    listBtn: {
      bg: "transparent",
      display: "block",
      w: "100%",
      color: "textClr",
      px: "0",
      py: "10px",
      h: "40px",
      fontSize: "0.9rem",
      borderBottom: "1px",
      borderColor: "borderClr",
      textAlign: "left",
      borderRadius: "0",
      _hover: {
        color: "primary",
        borderColor: "primary",
      },
    },
    blank: {
      bg: "transparent",
      color: "secondary",
      _hover: {
        color: "primary",
      },
    },
    link: {
      bg: "transparent",
      color: "secondary",
      p: 0,
      h: 'auto',
      textDecoration: 'underline',
      _hover: {
        color: "primary",
        textDecoration: 'none',
      },
    },
    editBtn: {
      bg: "transparent",
      color: "#aaa",
      fontSize: "13px",
      fontWeight: "normal",
      borderRadius: "0",
      h: "auto",
      px: "0",
      py: "0",
      _hover: {
        color: "primary",
      },
    },
    menuBtn:{
      
    }
  },
  // The default size and variant values
  defaultProps: {
    size: "md",
    variant: "primary",
  },
};
export default Button;

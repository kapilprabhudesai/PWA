import { extendTheme } from '@chakra-ui/react'
import styles from './style';
import LoginBanner from './components/loginBanner';
import Input from './components/input';
import Button from './components/button';
import Container from './components/container';
import Header from './components/header';
import Nav from './components/nav';
import Select from './components/select';
import './fonts.css'

const breakpoints = {
    sm: '320px',
    md: '768px',
    lg: '960px',
    xl: '1200px',
    '2xl': '1536px',
};

const sizes = {
    3.5: '14px',
    14: '45px',
    15: '60px',
    25: '100px',
    30: '120px',
    36: '144px',
    60: '240px',
    'bleed': '16px',
    'bleed-xl': '62px',
    'MNav-bleed': '20px',
    // '3xl': '120px',
}
const theme = extendTheme({
    colors: {
        primary: '#F50536',
        secondary: '#000',
        bodyBg: 'white',
        headerBg: '#FFF',
        headerLinkClr: '#333',
        sectiongray: '#EAEEED',
        white: '#FFF',
        lightgray: '#F5F5F5',
        lightgray2: "#E7E7E7",
        gray: "#333",
        gray2: "#2E2E2E",
        gray3: "#DADADA",
        gray4: "#4F4F4F",
        gray5: "#666",
        gray6: "#151515",
        gray7: "#989898",
        borderClr: '#eaeaea',
        textClr: '#868686',
        textClr2: '#33434c',
        textClr3: '#8994a0',
        dark: '#000',
        success: "#4bb543",
        error: "#E7E7E7",
        inputBorderClr: "rgba(0,0,0,.3)",
        inputBorderHoverClr: "rgba(0,0,0,.8)",
        switchBg: "#ECEEEF",
        mapBg: "#e5e3de",
        leftBg:'#C6D1D3'
   
    },
    // fonts: {
    //     body: `"NissanBrand-Regular",Verdana,Geneva,sans-serif`,
    //     heading: `"NissanBrand-Bold",Verdana,Geneva,sans-serif`,
    //     bold: '"NissanBrand-Bold",Verdana,Geneva,sans-serif',
    //     mono: `'Menlo', monospace`
    // },
    fontSizes: {
        xxs: "10px",
        xs: "12px",
        sm: "14px",
        tiny: "14px",
        base: "16px",
        lg: "18px",
        xl: "20px",
        "2xl": "24px",
        "3xl": "30px",
        "4xl": "36px",
        "5xl": "48px",
        "6xl": "64px",
        "7xl": "80px",
    },
    fontWeights: {
        normal: 400,
        medium: 700,
        semibold: 700,
    },
    breakpoints,
    styles,
    radii: {
        base: '12px',
    },
    space: {
        ...sizes
    },
    sizes: {
        ...sizes
    },
    boxShadow: {
        stickyShadow: "0 10px 20px #0000001A",
        stickyShadowlg: "0 -10px 20px #0000001A",
    },
    components: {
        LoginBanner,
        Input,
        Button,
        Container,
        Header,
        Nav,
        Select,

        // Textarea     
    }
})
export default theme
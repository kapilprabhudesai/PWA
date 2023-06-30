import { ComponentStyleConfig } from "@chakra-ui/react"

const Header = {
    baseStyle: {
        wrapper: {
            top: 0,
            w: 'full',
            zIndex: 40,
            position: 'sticky',
            py: { base: "10px", xl: "13px" },
            bg: "headerBg",
            borderBottom: '1px',
            borderStyle: 'solid',
            borderColor: 'gray3',
            boxShadow:'0 3px 6px 0 rgb(0 0 0 / 16%)'
        },
        wrapperIn: {
            alignItems: "center",
            justifyContent: "left"
        },
        logoWrap: {
            alignItems: 'center',
            w: { base: "100%", xl: "auto" },
            justifyContent: { base: "left", xl: "left" },
        },
        logo: {
            w: "160px",
            h: "45px"
        },
        logoLink: {
            lineHeight: ".1",
            display: "block"
        },
        navWrap: {
            flexDirection: "column",
            display: { base: "none", xl: "block" },
            ml: '28px'
        },
        listItem: {
            px: "12px"
        },
        listLink: {
            color: 'headerLinkClr',
            fontWeight: 'normal',
            fontSize: 'sm',
            _hover: {
                color: "primary",
                textDecoration: 'none'
            },
            '&.active': {
                color: 'primary',
                fontWeight: 'medium'
            }
        },
        loginWrap: {
            display: { base: "flex", xl: "flex" },
            alignSelf: 'flex-end',
            alignItems: "center",
            ml: 'auto', 
            position: "relative",
            cursor: 'pointer'
        },
        menuList:{
            border:"none"
        }
    }
}

export default Header
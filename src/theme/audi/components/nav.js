import { ComponentStyleConfig } from "@chakra-ui/react"
const Nav = {
    baseStyle: {
        hamBtn: {
            display: { base: 'inline-flex', xl: 'inline-flex' },
            p: 2,
            fontWeight: 'normal',
            ml: -2,
            color:"white"
        },
        hamBtnText: {
            ml: 1,
            fontSize: '14px'
        },
        link:{
            textDecoration:"none"
        }
    }
}

export default Nav

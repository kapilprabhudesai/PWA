import { ComponentStyleConfig } from "@chakra-ui/react"

const LoginBanner= {
    baseStyle: {
        wrapper: {
            bg: 'sectiongray',
            h:{ xl:'100vh'}
            // mb:  { base: 14, xl: 25 },
        },
        figure: {
           
          //  aspectRatio: { base: '375/328', xl: '1440/554' },
            overflow: "hidden",
        },
        image: {
            // w: '100%',
            // h: '100%',
            margin:'auto',
            objectFit: "cover"
           // maxW:"80%"
        },
        logo:{
            w: '10%',
            m: '20px'
        },
        certified:{
          w: '80%',
          mt:  { base: '20px', xl: 'calc(100% - 100px)'},
          mb:'20px'
        }
    }
}

export default LoginBanner
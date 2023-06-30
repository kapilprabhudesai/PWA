import { ComponentStyleConfig } from '@chakra-ui/react';

const Select = {
    parts: ["field", "icon"],
    baseStyle: {
        // bg-white form-select border border-inputBorderclr border-solid text-gray appearance-none focus:outline-none focus:border-gray
        // placeholder-gray-500 placeholder-opacity-50
        // disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200
        // invalid:border-pink-500 invalid:text-pink-600 text-sm pl-3.5 pr-7 py-2.5 leading-relaxed ml-auto js-filter
        field: {
            bg: 'white',
            borderStyle: 'solid',
            borderWidth: '1px',
            borderColor: 'inputBorderClr',
            borderRadius: '0',
            color: 'gray',
            fontSize: 'sm',
            pl: 3.5,
            pr:7,
            py: 2.5,
            h: 11,
            _focus: {
                boxShadow: 'none',
                borderColor: 'inputBorderHoverClr',
            },
            _hover: {
                borderColor: 'inputBorderHoverClr',
            },
            _invalid: {
                bg: 'white',
                boxShadow: 'none',
                color: 'red',
                borderColor: 'red',
            },
            '&': {
                borderColor: 'inputBorderClr',
                borderRadius: '0',
            },
            '&:focus, select&:focus-visible': {
                boxShadow: 'none',
                outline: 'none',
                borderColor: 'inputBorderHoverClr',
            }
        },
        icon: {
            color: 'gray',
            fontSize: "20px"
        }
    },
    variants: {
        floating: {
            field: {
                background: 'transparent',
                borderRadius: '0',
                color: 'gray',
                fontSize: 'base',
                outline: 'none',
                _focus: {
                    boxShadow: 'none',
                    borderBottom: '2px',
                    borderBottomColor: 'inputBorderHoverClr',
                },
                _hover: {
                    borderBottomColor: 'inputBorderHoverClr',
                },
                _invalid: {
                    boxShadow: 'none',
                    color: 'red',
                    borderBottomColor: 'red',
                },
                '&': {
                    border: '0 solid transparent',
                    borderBottomWidth: '1px',
                    borderBottomColor: 'inputBorderClr',
                    borderRadius: '0',
                    pl: 0,
                    pr: 6,
                    py: 5,
                    h: 15
                },
                '&:focus, select&:focus-visible': {
                    boxShadow: 'none',
                    outline: 'none',
                    border: '0 solid transparent',
                    borderBottomWidth: '2px',
                    borderBottomColor: 'inputBorderHoverClr',
                }
            }
        },
        mySelect:{
            field: {
                bg: 'white',
                borderStyle: 'solid',
                borderWidth: '1px',
                borderColor: 'inputBorderClr',
                borderRadius: '0',
                color: 'gray',
                fontSize: 'sm',
                pl: 3.5,
                pr:7,
                py: 2,
                h: 10,
                _focus: {
                    boxShadow: 'none',
                    borderColor: 'inputBorderHoverClr',
                },
                _hover: {
                    borderColor: 'inputBorderHoverClr',
                },
                _invalid: {
                    bg: 'white',
                    boxShadow: 'none',
                    color: 'red',
                    borderColor: 'red',
                },
                '&': {
                    borderColor: 'inputBorderClr',
                    borderRadius: '0',
                },
                '&:focus, select&:focus-visible': {
                    boxShadow: 'none',
                    outline: 'none',
                    borderColor: 'inputBorderHoverClr',
                }
            },
            icon: {
                color: 'gray',
                fontSize: "20px"
            },
            // field:after:{
            //     bg: 'black',
            //     color: 'white',
            // }
        }
    }
}

export default Select
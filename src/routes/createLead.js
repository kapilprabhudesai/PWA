import React, { useEffect, useState, FormEvent, ChangeEvent } from 'react';
import {
    Box,
    Grid,
    useDisclosure,
    useToast,
    Flex,
    Button,
    useMultiStyleConfig,
    FormControl,
    FormErrorMessage, FormLabel,
    Input,
    Select,
    Link,
} from "@chakra-ui/react";
import { useAppSelector, useAppDispatch } from '../redux/hooks';
import { fetchModel } from '../redux/reducers/getModelReducer';
import { Link as RouterLink, useLocation, useNavigate } from 'react-router-dom';
import { fetchVariant } from '../redux/reducers/getVariantReducer';
import { fetchConfigDetails } from '../redux/reducers/getConfigReducer';
import saveLead from '../api/saveLead';
// import { fetchYear } from '../redux/reducers/getYearReducer';
import { fetchMake } from '../redux/reducers/getMakeReducer';
import { fetchYear } from '../redux/reducers/getYearReducer';


const styles = {
    title: {
        textAlign: { xl: 'center' },
        color: "gray",
        fontWeight: "medium",
        fontSize: { base: 'lg', xl: '3xl' },
        mb: { base: 4, xl: 6 },
        lineHeight: "tall",
        position: 'relative',
    },
    titleBorder: {
        display: { base: 'block', xl: 'none' },
        w: 36,
        borderBottom: '2px solid gray',
        pt: 2
    },
    text: {
        fontSize: { base: 'sm', xl: 'xl' },
        color: 'gray4',
        textAlign: { xl: 'center' },
        lineHeight: "tall",
        mb: 10
    },
    sectionBg: {
        bg: 'lightgray',
        pt: { base: 5, xl: 10 },
        pb: { base: 5, xl: 8 }
    },
    subTitle: {
        fontSize: { base: 'base', xl: 'black' },
        fontWeight: 'medium',
        mb: 6
    },
    formGrid: {
        gridTemplateColumns: { xl: 'repeat(2,1fr)' },
        rowGap: { base: 10, xl: 8 },
        columnGap: { xl: 16 },
        mb: { base: 10, xl: 15 }
    },
    formControl: {
        mb: 5,
        _last: {
            mb: 0
        }
    },
    // text-xs text-gray4 leading-snug
    notes: {
        fontSize: 'xs',
        color: 'gray4',
    },
    links: {
        _hover: {
            color: "primary",
        }
    }
}



export const CreateLead = () => {
    const navigate = useNavigate();
    const containerStyle = useMultiStyleConfig(`Container`);
    const LSToken = JSON.parse(`${localStorage.getItem('token')}`);
    const toast = useToast();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [mobileNo, setMobileNo] = useState("");
    const [invalidName, setInvalidName] = useState(false);
    const [invalidMobile, setInvalidMobile] = useState(false);
    const [resetForm, setResetForm] = useState(false);
    const yearList = useAppSelector((state) => state.yearList.data);
    // console.log("yearList",yearList);
    const makeList = useAppSelector((state) => state.makeList.data);
    const modelList = useAppSelector((state) => state.modelList.data);
    const variantList = useAppSelector((state) => state.variantList.data);
    const configList = useAppSelector((state) => state.configList.data);
    const configStatus = useAppSelector((state) => state.configList.status);
    const [invalidYear, setInvalidYear] = useState(false);
    const [year, setYear] = useState("");
    const [make, setMake] = useState("");
    const [model, setModel] = useState("");
    const [variantt, setVariantt] = useState("");
    const [leadType, setLeadType] = useState("");
    const [enquirySource, setEnquirySource] = useState("");
    const [regNo, setRegNo] = useState();
    const [resetMake, setResetMake] = useState(false);
    const [resetModel, setResetModel] = useState(false);
    const [submitBtnLoading, setSubmitBtnLoading] = useState(false);
    const dispatch = useAppDispatch();


    const handleSubmit = (e) => {
        e.preventDefault();

        setSubmitBtnLoading(true)
        if (name.length === 0) {
            setInvalidName(true)
        }
        const currentTime = new Date();
        const mobTime = currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

        const params = {
            "cus_name": name,
            "cus_mobile": mobileNo,
            "cus_email": email,
            "veh_year": year,
            "veh_make": make,
            "veh_model": model,
            "veh_variant": variantt,
            "veh_reg_no": regNo,
            // "veh_color": "RED",
            "lead_type": leadType,
            "enquiry_source": enquirySource,
            "referid": "",
            "track_id": LSToken && LSToken.trackId,
            "mobtime": mobTime,
            "simno": "111111111",
            "ip": "127.0.0.0"
        }
        const res = saveLead(params);

        res.then((data) => {
            if (data.status === "success") {
                toast({
                    title: data.message,
                    status: 'success',
                    duration: 3000,
                    isClosable: true,
                    position: 'bottom-right'
                })
            }
            else {
                toast({
                    title: data.message.replace(/<[^>]+>/g, ' '),
                    status: 'warning',
                    isClosable: true,
                    position: 'bottom-right'
                })
            }
            
            setSubmitBtnLoading(false);
            setResetForm(!resetForm);         
            navigate('/dashboard')
        })
    }

    useEffect(() => {
        if (LSToken ) { 
            dispatch(fetchConfigDetails());
            dispatch(fetchYear()); 
            dispatch(fetchMake());    
          }
    }, [])
    const changeYear = (e) => {
        const newValue = e.target.value;
        setYear(newValue);
    }

    useEffect(() => {
        if (make) {
            const payload = {
                make,
                year
            }
            dispatch(fetchModel(payload));
        }
    }, [make]);

    useEffect(() => {
        if (model) {
            const payload = {
                model,
                make,
                year
            }
            dispatch(fetchVariant(payload));
        }
    }, [model]);

    const validateMobileNo = (e) => {
        const mobileRegex = /^[1-9]\d{9}$/; // Regular expression for Indian mobile numbers
        const isValidMobile = mobileRegex.test(e.target.value);
        setInvalidMobile(!isValidMobile);
        setMobileNo(e.target.value);
    }
    const validateVechileNo = (e) => {
        setRegNo(e.target.value);
    }
    const handleReset = () => {
        setResetForm(!resetForm);
        setRegNo("");
        setName("");
        setMobileNo("");
        setEmail("");
    }
    return (

        <Box bg={"sectionGray"}>
            <Box sx={styles.sectionBg}>
                <Box sx={containerStyle.wrapper}>
                    <form onSubmit={handleSubmit} id="myForm" key={resetForm}>
                        <Grid sx={styles.formGrid}>
                            <Box order={{ xl: 1 }}>
                                <Box as="h3" sx={styles.subTitle}>Customer details</Box>
                                {/* <Grid sx={styles.formGrid}> */}
                                <FormControl sx={styles.formControl} variant="floating" isRequired isInvalid={invalidName}>
                                    <Input name='name' id="name" type='text' placeholder=" " value={name} onChange={(e) => setName(e.target.value)} />
                                    <FormLabel htmlFor='name'>First Name</FormLabel>
                                    <FormErrorMessage>Please add valid first name</FormErrorMessage>
                                </FormControl>
                                <FormControl sx={styles.formControl} variant="floating" isRequired isInvalid={invalidMobile}>
                                    <Input name='mobile' type='tel' placeholder=" " maxLength={10} value={mobileNo} onChange={validateMobileNo} />
                                    <FormLabel htmlFor='mobile'>Mobile</FormLabel>
                                    <FormErrorMessage>Invalid mobile number</FormErrorMessage>
                                </FormControl>
                                <FormControl sx={styles.formControl} variant="floating" isRequired isInvalid={false}>
                                    <Input name='email' type='email' placeholder=" " value={email} onChange={(e) => setEmail(e.target.value)} />
                                    <FormLabel htmlFor='email'>Email</FormLabel>
                                </FormControl>
                                {/* </Grid> */}
                            </Box>

                            <Box order={{ xl: 2 }}>
                                <Box as="h3" sx={styles.subTitle}>Vehicle details</Box>
                                <FormControl sx={styles.formControl} variant='floating' isInvalid={invalidYear}>
                                    <Select placeholder='Year' onChange={changeYear} variant='mySelect'>
                                        {
                                            yearList.length !== 0 ? yearList?.map((item, i) => (<option key={i} value={item}>{item}</option>)) : <option>Loading</option>
                                        }
                                    </Select>
                                    <FormErrorMessage>Select any year</FormErrorMessage>
                                </FormControl>
                                <FormControl sx={styles.formControl} variant='floating' isRequired isInvalid={false}>
                                    <Select key={resetMake} placeholder='Make' onChange={(e) => setMake(e.target.value)} variant='mySelect' isDisabled={year ? false : true}>
                                        {
                                            (makeList.length !== 0) ? makeList.map((item, index) => (<option key={index} value={item}
                                            >{item}</option>)) : (<option>Loading</option>)
                                        }
                                    </Select>
                                    <FormErrorMessage>Select any Make</FormErrorMessage>
                                </FormControl>
                                <FormControl sx={styles.formControl} variant='floating' isRequired isInvalid={false}>
                                    <Select key={resetModel} placeholder='Model' onChange={(e) => setModel(e.target.value)} defaultValue={"Model Name"} variant='mySelect' isDisabled={make ? false : true}>
                                        {
                                            (modelList.length !== 0) ? modelList.map((item, index) => (<option key={index} value={item}
                                            >{item}</option>)) : (<option>Loading</option>)
                                        }
                                    </Select>
                                </FormControl>

                                <FormControl sx={styles.formControl} variant='floating' isRequired isInvalid={false}>
                                    <Select placeholder='Variant' onChange={(e) => setVariantt(e.target.value)} defaultValue={"Variant Name"} variant='mySelect' isDisabled={model ? false : true}>
                                        {
                                            (variantList.length !== 0) ? variantList.map((item, index) => (<option key={index} value={item}
                                            >{item}</option>)) : (<option>Loading</option>)
                                        }
                                    </Select>
                                </FormControl>
                                <FormControl sx={styles.formControl} variant='floating' isInvalid={false}>
                                    <Input name='regNo' type='text' placeholder=" " value={regNo} onChange={validateVechileNo} max={10} />
                                    <FormLabel htmlFor='regNo'>Enter registration number</FormLabel>
                                    <FormErrorMessage>Please add valid Vehicle registation number</FormErrorMessage>
                                </FormControl>
                            </Box>

                            <Box order={{ xl: 3 }}>
                                <FormControl sx={styles.formControl} variant='floating' isRequired isInvalid={false}>
                                    <Select placeholder='Select Lead Type' onChange={(e) => setLeadType(e.target.value)} variant='mySelect'>
                                        {
                                            (configStatus === "success" && configList.length !== 0) ? configList?.lead_type?.map((item, index) => (<option key={index} value={item}
                                            >{item}</option>)) : (<option>Loading</option>)
                                        }
                                    </Select>
                                </FormControl>
                                <FormControl sx={styles.formControl} variant='floating' isRequired isInvalid={false}>
                                    <Select placeholder='Select Enquiry Source' onChange={(e) => setEnquirySource(e.target.value)} variant='mySelect'>
                                        {
                                            (configStatus === "success" && configList.length !== 0) ? configList?.enquiry_sources?.map((item, index) => (<option key={index} value={item}
                                            >{item}</option>)) : (<option>Loading</option>)
                                        }
                                    </Select>
                                </FormControl>

                            </Box>
                                                   
                            <Box order={{ xl: 4 }} alignSelf="flex-end">
                                <Flex gap={{ base: 4, xl: 1 }} flexDirection={{ base: 'column', xl: 'row' }} mb={5}>
                                    <Button type='submit' variant="primary"  disabled={submitBtnLoading} size={'lg'} w="full" minW={60}>Create</Button>
                                    <Button type='reset' variant="primary" size={'lg'} w="full" minW={60} onClick={handleReset}>Reset</Button>
                                </Flex>
                                <Box as='p' sx={styles.notes}>
                                    By clicking submit, you agree to the Terms &amp; Condition
                                    <Link as={RouterLink}
                                        to={`/tnc`}
                                        target="_blank"
                                        sx={styles.links}> (click here)</Link>
                                </Box>
                            </Box> 
                        </Grid>
                    </form>
                </Box>
            </Box>
        </Box>
    )
}
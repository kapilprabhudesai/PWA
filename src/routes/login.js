import { useEffect, useState } from "react";
import { fetchToken } from "../redux/reducers/loginReducer";
import { useAppDispatch } from "../redux/hooks";
import { unwrapResult } from "@reduxjs/toolkit";
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Image,
  useMultiStyleConfig,
  Button, Grid, GridItem, Flex, VStack, FormControl, Input, Text,useToast
} from "@chakra-ui/react"
import { forgotPassword } from "../api/forgotPassword";
import { getVersion } from "../api/getVersion";


export const Login = ({ ...rest }) => {
  const [version, setVersion] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");
  const [resetForm, setResetForm] = useState(false);
  const [showEmailForm, setShowEmailForm] = useState(true);
  const toast= useToast();

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const styles = useMultiStyleConfig(`LoginBanner`)

  const style = {
    title: {
      fontFamily: 'heading',
      fontSize: { base: 'base', xl: 'lg' },
      lineHeight: 'tall',
      color: 'gray',
    },
    subTitle: {
      color: 'gray5',
      mb: "20px"
    },
    signIn: {
      w: '100%',
      mt: '20px'
    },
    forgotPassword: {
      w: '100%'
    }

  }
  const handleOnChange = (e) => {
    const { name, value } = e.target;

    switch (name) {
      case "userName":
        setUserName(value);
        break;

      case "password":
        setPassword(value);
        break;

      case "email":
        setEmail(value);
        break;

      default:
        break;
    }
  };


  const handleForgotPassword= (e)=>{
    e.preventDefault();
    const payload = {
      "email": email,
    }
    const res = forgotPassword(payload);
    res.then((data)=>{
      if(data.status==='success'){
        toast({
          title: "Reset Password link has been sent to your registered email ID",
          status: 'success',
          duration: 3000,
          isClosable: true,
          position: 'bottom-left'
      })
      setEmail("");
      }
      else{
        toast({
          title: "Invalid Email ID or user profile is de-activated. Please enter valid Email ID and re-try.",
          status: 'warning',
          isClosable: true,
          position: 'bottom-left'
      })
      setEmail("");
      }
    })
  }
  const handleOnSubmit = async (e) => {
    e.preventDefault();

    if (!userName || !password) {
      setMessage("Fill up all the form!");
    }

    const payload = {
      "user_name": userName,
      "password": password,
      "device_token":"uuuu:APA91bEd7wgbk6Y5KUJjpDgJeY9-p6Fwdf7PuST8mHbkw2nwrILKLSpQiGIZgtp0DLLTYorJ9m25gJ9d-T41Wjxov4AZNtqUob28Ur6Nh4HR9xS2aQWxT2Af6jdinYkfHCrFDsD0PSMc",
      "device_type":"ios"
    }


    const res = await dispatch(fetchToken(payload));
    const result = unwrapResult(res);
    
    if (result.status === "success") {

      navigate("/dashboard");

    } else {
      setMessage(result.message);
      setUserName("");
      setPassword("");
      setResetForm(!resetForm);
    }
  }
  const handleForgotPasswordClick = () => {
    setShowEmailForm(!showEmailForm);
  };

  useEffect(()=>{
    const fetchData = async () => {
      const res = await getVersion();
      if (res) {
        setVersion(res.app_version);

      }
    }
    fetchData();
  },[]);
  return (
    <Box  {...rest} h='100vh'>
      <Grid templateColumns={{ base: "1fr", md: "25% 75%" }} gap={4}>
        <GridItem order={{ base: '1', md: '0' }}>
          <VStack
            spacing={4}
          >
            <Box sx={{ ...styles.certified }}>
              <Image
                src={`/images/${process.env.REACT_APP_THEME}/launch.png`}
                alt={process.env.REACT_APP_NAME}
                sx={{ ...styles.image }}
                objectFit="cover"
              />
              <Text textAlign={"center"} fontWeight={"bold"}>AAP AutoInspekt</Text>
              <Text textAlign={"center"}>version:{version}</Text>

            </Box>
            {message && <Text as='p' my='20px'>{message}</Text>}
            {showEmailForm ? <Box w={'90%'}>
              <Text as="h5" sx={style.title}>Login to your account</Text>
              <Text as="p" sx={style.subTitle}>Please enter your credentials</Text>
              <form onSubmit={handleOnSubmit} key={resetForm}>
                <FormControl>
                  <Input type="text" placeholder="Username" name="userName" value={userName} onChange={handleOnChange} required />
                </FormControl>
                <FormControl mt={4}>
                  <Input type="password" placeholder="Password" name="password" onChange={handleOnChange} value={password} required />
                </FormControl>
                <Button sx={style.signIn} variant="primary" type="submit">
                  Sign In
                </Button>
                <Box textAlign={"center"} mt="20px" cursor={"pointer"}>
                  <Text as='a' onClick={handleForgotPasswordClick}>Forgot Password?</Text>
                </Box>
              </form>
            </Box> :
              <Box w={'90%'}>
                <Text as="h5" sx={style.title}>Forgot Password??</Text>
                <Text as="p" sx={style.subTitle}>Please enter your registered emailID</Text>
                <form onSubmit={handleForgotPassword} key={resetForm}>
                  <FormControl>
                    <Input type="email" placeholder="Email" name="email" value={email} onChange={handleOnChange} required />
                  </FormControl>
                  <Box textAlign={"center"} my="10px" cursor={"pointer"}>
                    <Text as='a' onClick={handleForgotPasswordClick}>login</Text>
                  </Box>
                  <Button sx={style.forgotPassword} variant="primary" type="submit">
                    Forgot password
                  </Button>
                </form>
              </Box>
            }
          </VStack>
        </GridItem>
        <GridItem>
          <Box sx={{ ...styles.wrapper }}>
            {/* <Flex>
              <Box sx={{ ...styles.logo }}>
                <Image
                  src={`/images/${process.env.REACT_APP_THEME}/daswalt-logo.svg`}
                  alt={process.env.REACT_APP_NAME}
                  objectFit="cover"
                />
              </Box>
            </Flex> */}
            <Flex>
              <Box as="figure" sx={{ ...styles.figure }}>
                <Image
                  src={`/images/${process.env.REACT_APP_THEME}/login-bg.jpg`}
                  alt={process.env.REACT_APP_NAME}
                  sx={{ ...styles.image }}
                  height={{xl:"100vh"}}
                />
              </Box>
            </Flex>
          </Box>
        </GridItem>
      </Grid>
    </Box>
  )
}


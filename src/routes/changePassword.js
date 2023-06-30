import React,{FormEvent,useState,ChangeEvent} from 'react';
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
import { Link as RouterLink, useLocation, useNavigate } from 'react-router-dom';
import { changePassword } from '../api/changePassword';

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
        rowGap: { base: 5, xl: 8 },
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


export const ChangePassword = () => {

    const navigate = useNavigate();
    const containerStyle = useMultiStyleConfig(`Container`);
    const LSToken = JSON.parse(`${localStorage.getItem('token')}`);
    const [submitBtnLoading, setSubmitBtnLoading] = useState<boolean>(false);
    const [currentPassword, setCurrentPassword] = useState<string>("");
    const [newPassword, setNewPassword] = useState<string>("");
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const toast= useToast();

    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitBtnLoading(true);
        if (newPassword !== confirmPassword) {
            toast({
              title: 'Error',
              description: 'Passwords do not match.',
              status: 'warning',
              isClosable: true,
              position: 'bottom-left',
            });
            setSubmitBtnLoading(false);
            return;
          }
        const payload={
            "old_password":currentPassword,
            "new_password":newPassword   
      }
      const res = changePassword(payload);
      res.then((data)=>{
        if(data.status==='success'){
          toast({
            title: "Password has been Changed successfully",
            status: 'success',
            duration: 3000,
            isClosable: true,
            position: 'bottom-left'
        })
        localStorage.removeItem('token');
        navigate("/login");
        }
        else{
          toast({
            title: "Old password does not match",
            status: 'warning',
            isClosable: true,
            position: 'bottom-left'
        })
        setSubmitBtnLoading(true);
     
        }
      })
    }

    const handleCancel=()=>{
        navigate('/userProfile')
    }
  return (
    <Box bg={"sectionGray"}>
    <Box sx={styles.sectionBg}>
        <Box sx={containerStyle.wrapper}>
            <form onSubmit={handleSubmit} id="myForm">
            <Box as="h3" sx={styles.subTitle}>Change Password</Box>
                <Grid sx={styles.formGrid}> 
                        <FormControl sx={styles.formControl} variant="floating" isRequired isInvalid={false}>
                            <Input name='currentPassword' id="currentPassword" type='password' placeholder="Enter your current Password" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} />       
                        </FormControl>
                        <FormControl sx={styles.formControl} variant="floating" isRequired isInvalid={false}>
                            <Input name='newPassword' id="newPassword" type='password' placeholder="Enter your new Password" maxLength={10} value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
                        </FormControl>
                        <FormControl sx={styles.formControl} variant="floating" isRequired isInvalid={false}>
                            <Input name='confirmPassword' id="confirmPassword" type='password' placeholder="Confirm your new Password" maxLength={10} value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                        </FormControl>                
                    <Box alignSelf="flex-end">
                        <Flex gap={{ base: 4, xl: 1 }} flexDirection={{ base: 'column', xl: 'row' }} mb={5}>
                            <Button type='submit' variant="primary"  disabled={submitBtnLoading} size={'lg'} w="full" minW={60}>Submit</Button>
                            <Button type='reset' variant="primary" size={'lg'} w="full" minW={60} onClick={handleCancel}>Cancel</Button>
                        </Flex>
                    </Box> 
                </Grid>
            </form>
        </Box>
    </Box>
</Box>
  )
}

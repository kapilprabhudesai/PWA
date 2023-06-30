import React, { useEffect } from 'react';
import {
    Box,
    Image,
    useMultiStyleConfig,
    Button, Grid, GridItem, Flex, VStack, FormControl, Input, Text, useToast, Avatar
} from "@chakra-ui/react";
import { useAppSelector, useAppDispatch } from '../redux/hooks';
import { fetchUser } from '../redux/reducers/getUserProfileReducer';
import { Link as RouterLink, useNavigate } from "react-router-dom";

export const UserProfile = () => {
    const userDetails = useAppSelector((state) => state.user.data);
    const LSToken = JSON.parse(`${localStorage.getItem('token')}`);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    console.log("userDetails", userDetails);
    useEffect(() => {
        const currentTime = new Date();
        const mobTime = currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        const payload = {
            "referid": "",
            "track_id": LSToken.trackId,
            "mobtime": mobTime,
            "simno": "111111111",
            "ip": "127.0.0.0"
        }
        dispatch(fetchUser(payload))

    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate("/login");
      }
    
      const handleChangePassword = () => {
        navigate("/changePassword");
      }
    return (
        <Box maxHeight={"auto"} display="flex" justifyContent="center" alignItems="center">
            <VStack spacing={4} width="100%" maxWidth="500px">
                <Box mt={4}>
                    <Avatar size="xl" bg="primary" />
                </Box>
                <Text fontWeight="bold">{userDetails?.name}</Text>
                <Box>
                    <Text textAlign="center">
                        Id: {userDetails?.id}<br />
                        dealerId: {userDetails?.dealer_id}<br />
                        Location: {userDetails?.address}
                    </Text>
                </Box>
                <Flex justify="space-between" width="90%" mt={4} mx={4}>
                    <Button flex="1" variant="outline" mr={2} onClick={handleChangePassword}>
                        Change Password
                    </Button>
                    <Button flex="1" variant="outline" ml={2} onClick={handleLogout}>
                        Logout
                    </Button>
                </Flex>
            </VStack>
        </Box>
    )
}

import React, { useState } from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from "../redux/hooks";
import {
    Drawer,
    DrawerBody,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    Button,
    useDisclosure,
    List,
    ListItem,
    Link,
    useMultiStyleConfig,
    Box,
    DrawerHeader,
    Flex,
    Spacer, Image,
    ListIcon, Text, HStack, Avatar
} from "@chakra-ui/react";
import { IoClose } from "react-icons/io5";
import { FaUsers } from "react-icons/fa";
import {
    AddIcon,
    ChevronRightIcon, ChevronDownIcon,
    HamburgerIcon
} from "@chakra-ui/icons"

const MNav = () => {
    const styles = useMultiStyleConfig('Nav')
    const styless = useMultiStyleConfig(`Header`);
    const auth = JSON.parse(`${localStorage.getItem('token')}`);

    const { isOpen, onOpen, onClose } = useDisclosure()

    const dispatch = useAppDispatch();
    const location = useLocation();;
    const [isSubListOpen, setSubListOpen] = useState(true);
    const openModal = () => {
        onClose();
    }
    const toggleSubList = () => {
        setSubListOpen(!isSubListOpen);
    }
    return (
        <>
            <Button onClick={onOpen}
                sx={styles.hamBtn}
                variant='blank'>
                <HamburgerIcon w={6} h={6} sx={styles.hamBtnIcon} />
                <Box sx={styles.hamBtnText}>
                </Box>
            </Button>
            <Drawer
                isOpen={isOpen}
                placement="left"
                onClose={onClose}
                size={'xs'}

            >
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerHeader bg="primary" >
                        <Link as={RouterLink} to={'/userProfile'} onClick={onClose} className={location.pathname === '/createLead' ? 'active' : ''}>
                            <Flex alignItems="center" justifyContent="center" mb={4} cursor={"pointer"}>
                                <Avatar size="lg" />
                                <Text color="white" ml={2} fontSize="xl">
                                    {auth.name}
                                </Text>
                            </Flex>
                        </Link>
                    </DrawerHeader>
                    <DrawerBody>
                        <List display={'flex'} flexDirection='column' spacing={3} mt={3} cursor="pointer">
                            <ListItem p={1}>
                                <Link  as={RouterLink} to={'/createLead'} onClick={onClose} className={location.pathname === '/createLead' ? 'active' : ''}>
                                    <Flex>
                                        <Box fontWeight={"bold"}>
                                            <HStack>
                                                <Box sx={styles.link}>Create Lead</Box>
                                                <AddIcon boxSize={2} />
                                            </HStack>
                                        </Box>
                                    </Flex>
                                </Link>
                            </ListItem>
                            <ListItem p={1} onClick={toggleSubList}>
                                <Flex>
                                    <Box>
                                        <HStack>
                                            <Box fontWeight={"bold"}> Procurement Leads Dashboard</Box>
                                            <Spacer />
                                        </HStack>
                                    </Box>
                                    {isSubListOpen ? (
                                        <ChevronDownIcon boxSize={5} />
                                    ) : (
                                        <ChevronRightIcon boxSize={5} />
                                    )}
                                </Flex>
                            </ListItem>
                            {isSubListOpen && (
                                <>
                                    <ListItem p={1} ml={4}>
                                        <Link as={RouterLink} to={'/newLeads'} onClick={onClose} className={location.pathname === '/newLeads' ? 'active' : ''}>
                                            <Flex>
                                                <Box>
                                                    <HStack pl={2}>
                                                        <Box>-</Box>
                                                        <Box>New Leads</Box>
                                                    </HStack>
                                                </Box>
                                            </Flex>
                                        </Link>
                                    </ListItem>
                                    <ListItem p={1} ml={4}>
                                        <Link as={RouterLink} to={'/pendingLeads'} onClick={onClose} className={location.pathname === '/pendingLeads' ? 'active' : ''}>
                                            <Flex>
                                                <Box>
                                                    <HStack pl={2}>
                                                        <Box>-</Box>
                                                        <Box>Pending Leads</Box>
                                                    </HStack>
                                                </Box>
                                            </Flex>
                                        </Link>
                                    </ListItem>
                                </>
                            )}
                        </List>
                    </DrawerBody>
                </DrawerContent>
            </Drawer>
        </>
    );
};
export default MNav;

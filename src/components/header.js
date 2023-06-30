import React from 'react'
import {
  Flex,
  Box,
  Link,
  List,
  ListItem,
  Image,
  useMultiStyleConfig,
  HStack,
  Text,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Portal,
  Button
} from "@chakra-ui/react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useAppSelector } from "../redux/hooks";
import { TriangleDownIcon } from '@chakra-ui/icons';

import { FiLogOut } from "react-icons/fi";
import { FaRegUser } from "react-icons/fa";
import MNav from './mNav';

const styles = {
  menuList: {

  }
}

export const Header = ({ ...rest }) => {
  const styles = useMultiStyleConfig(`Header`)
  const ContainerStyle = useMultiStyleConfig('Container');
  const navigate = useNavigate();
  // const auth = useAppSelector((state: any) => state.loginDetails);
  const auth = JSON.parse(`${localStorage.getItem('token')}`);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate("/login");
  }


  return (
    <Box as="header" __css={{ ...styles.wrapper }} {...rest} bg="secondary" color="white">
      <Flex sx={{ ...styles.wrapperIn, ...ContainerStyle.wrapper }} >
        <Flex sx={{ ...styles.logoWrap }}>
          <MNav/>
          <Link
            as={RouterLink}
            to="/dashboard"
            title={`${process.env.REACT_APP_NAME}`}
            sx={{ ...styles.logoLink }}
          >
            <Image
              src={`/images/${process.env.REACT_APP_THEME}/logo.svg`}
              alt={`${process.env.REACT_APP_NAME}`}
              sx={{ ...styles.logo }}
            />
          </Link>
        </Flex>

        <Flex sx={{ ...styles.loginWrap }}>
          <Menu>
            <MenuButton>
              <HStack>
                <FaRegUser size={20}/>
                <Text> {auth.name}</Text>
                <TriangleDownIcon boxSize={3} />
              </HStack>
            </MenuButton>
            <MenuList sx={styles.menuList}>
              <MenuItem onClick={handleLogout}><Button variant="logout" rightIcon={<FiLogOut />}>Logout</Button></MenuItem>
            </MenuList>
          </Menu>
        </Flex>

      </Flex>
    </Box>
  );

}

import React, { useEffect, useState } from 'react';
import {
  Box,
  Grid,
  useDisclosure,
  useToast, Text, HStack, Image, Stack
} from "@chakra-ui/react";
import { useAppSelector,useAppDispatch } from '../redux/hooks';
import { fetchConfigDetails } from '../redux/reducers/getConfigReducer';
import { fetchDashBoard } from '../redux/reducers/getDashboardReducer';



const styles = {
  title: {
    fontFamily: 'heading',
    fontSize: { base: 'base', xl: '2xl' },
    fontWeight: 'bold',
    lineHeight: 'tall',
    color: 'textClr2',
  },
  subTitle: {
    bg: 'sectiongray',
    fontSize: { base: 'base', xl: 'xl' },
    lineHeight: 'tall',
    color: 'textClr2',
    p: '2'

  },
  formGrid: {
    gridTemplateColumns: { xl: 'repeat(2,1fr)' },
    rowGap: { base: 10, xl: 8 },
    columnGap: { xl: 16 },
    mb: { base: 10, xl: 10 }
  },
  formControl: {
    mb: 5,
    _last: {
      mb: 0
    }
  },
  textArea: {
    outline: '1px solid #B2B2B2',
    border: "none",
    borderRadius: "0"
  },
  ticketHeading: {
    fontSize: { base: 'base', xl: 'lg' },
    lineHeight: 'tall',
    color: 'textClr2',

  },
  description: {
    fontSize: { base: 'base', xl: 'sm' },
    lineHeight: 'tall',
    color: 'textClr2',
    fontWeight: 'bold',
    mt: 4
  }
}
export const Dashboard = () => {
  const dashboardList = useAppSelector((state) => state.dashboardList.data);

  const dispatch = useAppDispatch();
  const [dashboardData,setDashboardData]=useState(null);
  const [data,setData]=useState([]);
  const [version,setVersion]=useState("");
  console.log("dashboardData",dashboardData)

 

  const LSToken = JSON.parse(`${localStorage.getItem('token')}`);
  useEffect(()=>{
    if(LSToken){
      const currentTime = new Date();
      const mobTime = currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      const payload={     
          "procurement_consultant_id": null,
          "referid":"",
          "track_id": LSToken.trackId,
          "mobtime":mobTime,
          "simno":"111111111",
          "ip":"127.0.0.0"
      }

      dispatch(fetchDashBoard(payload))
    }
  },[])

  return (

    <Box>
      <Box bg="sectiongray" textAlign={"center"} py={{ base: 5, xl: 10 }}>
        <Text as="h3" sx={styles.title}>Procurement Leads Dashboard</Text>
      </Box>

      <Grid templateColumns={{ base: 'repeat(2, 1fr)', xl: 'repeat(4, 1fr)' }} columnGap={{ xl: 16 }} mb={{ base: 10, xl: 10 }}>
      { dashboardList && dashboardList.procurement_dashboard?.items?.map((item, index) => (
          <Box key={item.slug} bg="primaryColor" textAlign="center" p={4} borderRadius="md" borderWidth={1} borderColor="blackAlpha.200">
            <HStack spacing={{ base: "20px", xl: "24px" }}>
              <Image src={`/images/${process.env.REACT_APP_THEME}/${item.slug}.png`} alt={item.slug} boxSize={8} />
              <Stack spacing={0}>
                <Box as="p" color="gray" fontWeight="bold">
                  {item.count}
                </Box>
                <Box as="p" color="gray">
                  {item.title}
                </Box>
              </Stack>
            </HStack>
          </Box>
        ))}
      </Grid>
      <Box bg="sectiongray" textAlign={"center"} py={{ base: 5, xl: 10 }}>
        <Text as="h3" sx={styles.title}>Evaluation Dashboard</Text>
      </Box>
      <Grid templateColumns={{ base: 'repeat(2, 1fr)', xl: 'repeat(4, 1fr)' }} columnGap={{ xl: 16 }} mb={{ base: 10, xl: 10 }}>
      { dashboardList && dashboardList.evaluation_dashboard?.items?.map((item, index) => (
          <Box key={item.slug} bg="primaryColor" textAlign="center" p={4} borderRadius="md" borderWidth={1} borderColor="blackAlpha.200">
            <HStack spacing={{ base: "20px", xl: "24px" }}>
              <Image src={`/images/${process.env.REACT_APP_THEME}/${item.slug}.png`} alt={item.slug} boxSize={8} />
              <Stack spacing={0}>
                <Box as="p" color="gray" fontWeight="bold">
                  {item.count}
                </Box>
                <Box as="p" color="gray">
                  {item.title}
                </Box>
              </Stack>
            </HStack>
          </Box>
        ))}
      </Grid>
    </Box>
  )
}

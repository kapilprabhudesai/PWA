import React, { useEffect, useState } from 'react';
import { useAppSelector, useAppDispatch } from '../redux/hooks';
import { fetchNewLeads } from '../api/getNewLeads';
import { SearchBar } from '../components/newLeads/searchBar';

import { LeadList } from '../components/newLeads/leadList';
import { Box, Grid, Image, Text, useBreakpointValue, Avatar, Button } from '@chakra-ui/react';
// import { fetchNewLeads } from '../redux/reducers/getNewLeadsReducer';

export const NewLead = () => {
  const dispatch = useAppDispatch();
  const currentTime = new Date();
  const mobTime = currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  const LSToken = JSON.parse(`${localStorage.getItem('token')}`);
  const defaultPayload = {
    procurement_consultant_id: null,
    referid: "",
    search_value: "",
    per_page: 10,
    page: 1,
    type: "new_leads",
    track_id: LSToken.trackId,
    mobtime: mobTime,
    simno: "111111111",
    ip: "127.0.0.0"
  }
  const [payload, setPayload] = useState({});
  const [stocks, setStocks] = useState({});
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(false)

  const [prevPayload, setPrevPayload] = useState(null); // Keep track of previous payload
  const gridColumnCount = useBreakpointValue({ base: 1, md: 4 }); // Adjust the breakpoint and column count as needed
 

  const updateStocks = (type, value) => {
    let newPayload = { ...payload };
    newPayload.page = 1;
    switch (type) {
        case 'search':
            newPayload.search_value = value
            // setPayload(newPayload);
            break;
        // case 'city':
        //     newPayload.filter_city = value;
        //     newPayload.dealer_id = "";
        //     setPayload(newPayload);
        //     break;
        // case 'model':
        //     newPayload.filter_model = value
        //     setPayload(newPayload);
        //     break;
        // case 'bodyType':
        //     newPayload.filter_body_type = value
        //     setPayload(newPayload);
        //     break;
        // case 'priceRange':
        //     newPayload.filter_min_price = value[0]
        //     newPayload.filter_max_price = value[1]
        //     setPayload(newPayload);
        //     break;
        // case 'year':
        //     newPayload.filter_min_year = value[0]
        //     newPayload.filter_max_year = value[1]
        //     setPayload(newPayload);
        //     break;
        // case 'fuelType':
        //     newPayload.filter_fuel_type = value
        //     setPayload(newPayload);
        //     break;
        // case 'transmissionType':
        //     newPayload.filter_transmission_type = value
        //     setPayload(newPayload);
        //     break;
        // case 'kmRange':
        //     newPayload.filter_min_km = value[0]
        //     newPayload.filter_max_km = value[1]
        //     setPayload(newPayload);
        //     break;
        // case 'sortOrder':
        //     newPayload.sort_order = value
        //     setPayload(newPayload);
        //     break;
        // case 'buyBar':
        //     newPayload.filter_model = value[0]
        //     newPayload.filter_max_price = value[1]
        //     setPayload(newPayload);
        //     break;
        // case 'dealer':
        //     newPayload.dealer_id = Number(value);
        //     setPayload(newPayload);
        //     break;
        case 'reset':
            setPayload(defaultPayload);

            break;

        default:
            return setPayload(defaultPayload);
    }

}
useEffect(() => {
  if (LSToken) {
    setLoading(true);
    let res = fetchNewLeads(payload);
    res.then((data) => {
        if (payload.page > 1) {
            setLeads(product.concat(data.leads.data));
            setStocks(data.leads);
        } else {
            console.log("data", data.leads)
            setStocks(data?.leads);
            setLeads(data.leads?.data);
        }
        setLoading(false);
    })
  }


}, []);

  return (
    <Box px={{ base: "bleed", xl: "bleed-xl" }}>     
      <SearchBar onSearch={updateStocks}/>
      {/* <LeadList /> */}
      <Grid templateColumns={`repeat(${gridColumnCount}, 1fr)`} gap={4}>
            {leads && leads.map((val) => {
                return (
                    <Box borderWidth="1px" borderRadius="md" p={4} key={val.lead_id}>
                        <Box display="flex" alignItems="center" marginBottom={2}>
                            <Avatar
                                size='lg'
                                name='Prosper Otemuyiwa'
                                src='https://bit.ly/prosper-baba'
                            />
                            <Box ml={3}>
                                <Text fontWeight="bold">{val.make}</Text>
                                <Text>5 series (2019)</Text>
                            </Box>
                        </Box>
                        <Button variant="outline" size="sm">Evaluate</Button>
                    </Box>
                )
            }
            )
            }
        </Grid>
    </Box>
    
  )
}

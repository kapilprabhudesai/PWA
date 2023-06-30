import React from 'react';
import { Box, Grid, Image, Text, useBreakpointValue, Avatar, Button } from '@chakra-ui/react';

export const LeadList = ({leads}) => {
    const gridColumnCount = useBreakpointValue({ base: 1, md: 4 }); // Adjust the breakpoint and column count as needed
     console.log("leads",leads)
    return (
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
    )
}

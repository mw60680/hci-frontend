import React from 'react';
import { useParams } from 'react-router-dom';
import { useGetClientByIdQuery } from '../../../api/client';
import ContentWrapper from '../../../components/ContentWrapper';
import { Box, Divider, Grid, Typography } from '@mui/material';
import BusinessTwoToneIcon from '@mui/icons-material/BusinessTwoTone';
import DateRangeIcon from '@mui/icons-material/DateRange';
import { DataGrid, GridColumnHeaderParams, GridColumns } from '@mui/x-data-grid';
import GridBox from '../../GridBox';

const columns: GridColumns = [
    {
        field: 'name',
        headerName: 'Name',
        valueFormatter: (data) => data.value.title,
        width: 300,
        renderHeader: (params: GridColumnHeaderParams) => <strong>{params.colDef.headerName}</strong>
    },
    {
        field: 'email',
        headerName: 'Email',
        valueFormatter: (data) => data.value.title,
        width: 300,
        renderHeader: (params: GridColumnHeaderParams) => <strong>{params.colDef.headerName}</strong>
    },
    {
        field: 'contact',
        headerName: 'Contact',
        valueFormatter: (data) => data.value.title,
        width: 250,
        renderHeader: (params: GridColumnHeaderParams) => <strong>{params.colDef.headerName}</strong>
    },
    {
        field: 'designation',
        headerName: 'Designation',
        valueFormatter: (data) => data.value.title,
        width: 250,
        renderHeader: (params: GridColumnHeaderParams) => <strong>{params.colDef.headerName}</strong>
    }
];

const ClientDetails: React.FC = () => {
    const { uuid } = useParams<{ uuid: string }>();
    const { data: client, isLoading, isError, refetch, isFetching } = useGetClientByIdQuery(uuid || '');
    if(isLoading){
        return <p>Loading...</p>;
    }
    return (
        <ContentWrapper>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    rowGap: '18px',
                    padding: '2%',
                    '@media (max-width: 600px)': {
                        padding: '3%'
                    }
                }}
            >
                <Typography variant={'h3'} component={'h6'}>{client?.data?.companyName} </Typography>
                <Divider sx={{ margin: '20px 0' }} />
                <Grid container spacing={2} sx={{color:'white',padding:'1%'}}>
                    <GridBox title={"Legal Name"} value={client?.data?.legalName} />
                    <GridBox title={"Contract Start Date"} value= {new Date(client?.data?.contractStartDate).toLocaleDateString('default', {
                                day: 'numeric',
                                month: 'long',
                                year: 'numeric'
                            })}
                    />
                    <GridBox title={"Contract End Date"} value= {new Date(client?.data?.contractEndDate).toLocaleDateString('default', {
                                day: 'numeric',
                                month: 'long',
                                year: 'numeric'
                            })}
                    />
                </Grid>
                <Divider sx={{ margin: '20px 0' }} />
                <DataGrid
                    columns={columns}
                    rows={client?.data.poc || []}
                    filterMode='server'
                    loading={isFetching}
                    rowSpacingType='border'
                    getRowId={(row) => row._id} 
                    autoHeight
                    disableColumnFilter
                    hideFooter 
                    sx={{ overflowY: 'auto' }}
                />
                <Divider sx={{ margin: '20px 0' }} />
                <Grid container spacing={2} sx={{color:'white',padding:'1%'}}>
                   <GridBox title={"GST Number"} value={client?.data?.gstNumber} />
                   <GridBox title={"Active"} value={client?.data?.active ? 'Yes' : 'No'} />
                   <GridBox title={"ApiIntegrated"} value={client?.data?.apiIntegrated ? 'Yes' : 'No'} />
                </Grid>
                <Divider sx={{ margin: '20px 0' }} />
            </Box>
        </ContentWrapper>
    );
};

export default ClientDetails;

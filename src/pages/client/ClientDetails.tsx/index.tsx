import React from 'react';
import { useParams } from 'react-router-dom';
import { useGetClientByIdQuery } from '../../../api/client';
import ContentWrapper from '../../../components/ContentWrapper';
import { Box, Divider, Grid, Typography } from '@mui/material';
import BusinessTwoToneIcon from '@mui/icons-material/BusinessTwoTone';
import DateRangeIcon from '@mui/icons-material/DateRange';
import { DataGrid, GridColumnHeaderParams, GridColumns } from '@mui/x-data-grid';

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
                    <Grid item xs={12} md={4}>
                        <Typography variant={'h4'} component={'h6'} sx={{ fontWeight: 'bold', display: 'flex', alignItems: 'center' }}>
                            <BusinessTwoToneIcon sx={{ marginRight: '5px' }} /> Legal Name
                        </Typography>
                    </Grid>
                    <Grid item xs={12} md={8}>
                        <Typography variant={'h4'} component={'h6'}>
                            {client?.data?.legalName}
                        </Typography>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Typography variant={'h4'} component={'h6'} sx={{ fontWeight: 'bold', display: 'flex', alignItems: 'center' }}>
                            <DateRangeIcon sx={{ marginRight: '5px' }} /> Contract Start Date
                        </Typography>
                    </Grid>
                    <Grid item xs={12} md={8}>
                        <Typography variant={'h4'} component={'h6'}>
                            {new Date(client?.data?.contractStartDate).toLocaleDateString('default', {
                                day: 'numeric',
                                month: 'long',
                                year: 'numeric'
                            })}
                        </Typography>
                    </Grid>
                    <Grid item xs={12} md={4} >
                        <Typography variant={'h4'} component={'h6'} sx={{ fontWeight: 'bold', display: 'flex', alignItems: 'center' }}>
                            <DateRangeIcon sx={{ marginRight: '5px' }} /> Contract End Date
                        </Typography>
                    </Grid>
                    <Grid item xs={12} md={8}>
                        <Typography variant={'h4'} component={'h6'}>
                            {new Date(client?.data?.contractEndDate).toLocaleDateString('default', {
                                day: 'numeric',
                                month: 'long',
                                year: 'numeric'
                            })}
                        </Typography>
                    </Grid>
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
                    <Grid item xs={12} md={4}>
                        <Typography variant={'h4'} component={'h6'} sx={{ fontWeight: 'bold', display: 'flex', alignItems: 'center' }}>
                            GST Number
                        </Typography>
                    </Grid>
                    <Grid item xs={12} md={8}>
                        <Typography variant={'h4'} component={'h6'}>
                            {client?.data?.gstNumber}
                        </Typography>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Typography variant={'h4'} component={'h6'} sx={{ fontWeight: 'bold', display: 'flex', alignItems: 'center' }}>
                            Active
                        </Typography>
                    </Grid>
                    <Grid item xs={12} md={8}>
                        <Typography variant={'h4'} component={'h6'}>
                            {client?.data?.active ? 'Yes' : 'No'}
                        </Typography>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Typography variant={'h4'} component={'h6'} sx={{ fontWeight: 'bold', display: 'flex', alignItems: 'center' }}>
                            Api Integrated
                        </Typography>
                    </Grid>
                    <Grid item xs={12} md={8}>
                        <Typography variant={'h4'} component={'h6'}>
                            {client?.data?.apiIntegrated ? 'Yes' : 'No'}
                        </Typography>
                    </Grid>
                </Grid>
                <Divider sx={{ margin: '20px 0' }} />
            </Box>
        </ContentWrapper>
    );
};

export default ClientDetails;

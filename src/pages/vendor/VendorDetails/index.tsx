import React from 'react';
import { useParams } from 'react-router-dom';
import ContentWrapper from '../../../components/ContentWrapper';
import { Box, Chip, Divider, Grid, Typography } from '@mui/material';
import { useGetVendorByIdQuery } from '../../../api/vendor';
import PlaceIcon from '@mui/icons-material/Place';
import { DataGrid, GridColumnHeaderParams, GridColumns } from '@mui/x-data-grid';
import GridBox from '../../GridBox';

const pocColumns: GridColumns = [
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
        width: 250,
        renderHeader: (params: GridColumnHeaderParams) => <strong>{params.colDef.headerName}</strong>,
        renderCell: (params) => (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {params.value.map((email: string, index: number) => (
                    <Chip key={index} label={email} />
                ))}
            </Box>
        )
    },
    {
        field: 'contact',
        headerName: 'Contact',
        width: 200,
        renderHeader: (params: GridColumnHeaderParams) => <strong>{params.colDef.headerName}</strong>,
        renderCell: (params) => (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {params.value.map((contact: string, index: number) => (
                    <Chip key={index} label={contact} />
                ))}
            </Box>
        )
    },
    {
        field: 'designation',
        headerName: 'Designation',
        valueFormatter: (data) => data.value.title,
        width: 250,
        renderHeader: (params: GridColumnHeaderParams) => <strong>{params.colDef.headerName}</strong>
    }
];
const homeCollectionChargesColumns: GridColumns = [
    {
        field: 'city',
        headerName: 'City',
        valueFormatter: (data) => data.value.title,
        width: 500,
        renderHeader: (params: GridColumnHeaderParams) => <strong>{params.colDef.headerName}</strong>
    },
    {
        field: 'charge',
        headerName: 'Charge',
        valueFormatter: (data) => data.value.title,
        width: 500,
        renderHeader: (params: GridColumnHeaderParams) => <strong>{params.colDef.headerName}</strong>
    }

];
const VendorDetails: React.FC = () => {
    const { uuid } = useParams<{ uuid: string }>();
    const { data: vendor, isLoading, isError, refetch, isFetching } = useGetVendorByIdQuery(uuid || '');
    if (isLoading) {
        return <p>Loading...</p>;
    }
    const maxLength = Math.max(
        ...(vendor?.data?.poc.map((item: any) => Math.max(item.email.length, item.contact.length)) || [0])
    );
    const rowHeight = 50 * maxLength;
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
                <Typography variant={'h3'} component={'h6'}>{vendor?.data?.name} </Typography>
                <Divider sx={{ margin: '20px 0' }} />
                <Grid container spacing={2} sx={{ color: 'white', padding: '1%' }}>
                    <GridBox title={"Type"} value={vendor?.data?.type} />
                    <GridBox title={"Address"} value={vendor?.data?.address} />
                    <GridBox title={"City"} value={vendor?.data?.city} />
                    <GridBox title={"Locality"} value={vendor?.data?.locality} />
                    <GridBox title={"State"} value={vendor?.data?.state} />
                    <GridBox title={"Active"} value={vendor?.data?.active ? 'Yes' : 'No'} />
                </Grid>
                <Divider sx={{ margin: '20px 0' }} />
                <Typography variant={'h4'} sx={{ fontWeight: 'bold' }}>POC Details </Typography>
                <DataGrid
                    columns={pocColumns}
                    rows={vendor?.data?.poc || []}
                    filterMode='server'
                    loading={isFetching}
                    rowSpacingType='border'
                    getRowId={(row) => row._id}
                    autoHeight
                    disableColumnFilter
                    hideFooter
                    rowHeight={rowHeight}
                    sx={{ overflowY: 'auto' }}
                />
                <Divider sx={{ margin: '20px 0' }} />
                <Typography variant={'h4'} sx={{ fontWeight: 'bold' }}>Home collection charges </Typography>
                <DataGrid
                    columns={homeCollectionChargesColumns}
                    rows={vendor?.data?.home_collection_charges || []}
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
                <Typography variant={'h4'} component={'h6'} sx={{ fontWeight: 'bold', display: 'flex', alignItems: 'center' }}>
                    <PlaceIcon sx={{ marginRight: '5px' }} /> Supported Pincodes
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                    {vendor?.data?.supported_pincodes?.map((values: any, index: number) => (
                        <Chip
                            key={index}
                            label={values}
                        />
                    ))}
                </Box>
                <Divider sx={{ margin: '20px 0' }} />
            </Box>
        </ContentWrapper>
    );
};

export default VendorDetails;


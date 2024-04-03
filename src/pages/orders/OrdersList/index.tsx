import React, { useState } from 'react';
import { useOrdersListQuery } from '../../../api/orders';
import ContentWrapper from '../../../components/ContentWrapper';
import { Box, Button, Stack, Typography } from '@mui/material';
import { DataGrid, GridColumnHeaderParams, GridColumns, GridRowParams } from '@mui/x-data-grid';
import CustomPagination from '../../../components/global/Table/utils/CustomPagination';
import { useNavigate } from 'react-router-dom';

const OrdersList = () => {
  const {
    data: orders,
    isLoading: ordersLoading,
    isFetching: ordersFetching,
    isError: ordersError
  } = useOrdersListQuery({});

  const navigate = useNavigate();

  const [paginationParams, setPaginationParams] = useState({ page: 0, size: 10 });

  if (ordersLoading) return <div>Loading...</div>;

  if (ordersError) return <div>Error Loading Orders</div>;

  const columns: GridColumns = [
    {
      field: 'uuid',
      headerName: 'UUID',
      width: 200,
      renderHeader: (params: GridColumnHeaderParams) => <strong>{params.colDef.headerName}</strong>,
      renderCell: (data) => {
        const id = data.value || '';
        return (
          <Typography sx={{ color: '#0000ff', textDecorationLine: 'underline', cursor: 'pointer' }}>{id}</Typography>
        );
      }
    },
    {
      field: 'collection_type',
      headerName: 'Collection Type',
      width: 200,
      renderHeader: (params: GridColumnHeaderParams) => <strong>{params.colDef.headerName}</strong>
    },
    {
      field: 'order_status',
      headerName: 'Order Status',
      width: 200,
      renderHeader: (params: GridColumnHeaderParams) => <strong>{params.colDef.headerName}</strong>
    },
    {
      field: 'payment',
      headerName: 'Payment Status',
      width: 160,
      valueGetter: (params) => params.value.status,
      renderHeader: (params: GridColumnHeaderParams) => <strong>{params.colDef.headerName}</strong>
    },
    {
      field: 'remarks',
      headerName: 'Remarks',
      width: 200,
      renderCell: (params) => (
        <Stack>
          {params.value.map((remark: string, index: number) => (
            <Typography key={`${params.value.uuid}-remark-${index}`}>{remark}</Typography>
          ))}
        </Stack>
      )
    },
    {
      field: 'patient',
      headerName: 'Patient',
      renderCell: (data) => {
        return (
          <Stack>
            <Typography>{data.value.name}</Typography>
            <Typography>{data.value.mobile}</Typography>
          </Stack>
        );
      },
      width: 160,
      renderHeader: (params: GridColumnHeaderParams) => <strong>{params.colDef.headerName}</strong>
    },
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Actions',
      width: 150,
      cellClassName: 'actions',
      getActions: (params: GridRowParams) => [
        <Button
          key='action'
          onClick={() => {
            const uuid = params.row.uuid;
            navigate(`${uuid}`);
          }}>
          Edit
        </Button>,
        <Button
          key='action'
          onClick={() => {
            const uuid = params.row.uuid;
            navigate(`orders/${uuid}`);
          }}>
          Details
        </Button>
      ]
    }
  ];

  const paginationInfo = orders?.meta;

  const onPageChange = (page: number) => {
    setPaginationParams((old) => ({ ...old, page }));
  };

  return (
    <ContentWrapper>
      <Box sx={{ width: '100%', minHeight: '500px' }}>
        <DataGrid
          columns={columns}
          paginationMode='server'
          rows={orders?.data || []}
          filterMode='server'
          loading={ordersFetching}
          rowSpacingType='border'
          pagination
          autoPageSize
          getRowId={(row) => row.uuid}
          autoHeight
          disableColumnFilter
          components={{
            Footer: (props) => (
              <CustomPagination
                onPageChange={onPageChange}
                paginationInfo={paginationInfo}
                {...paginationParams}
                {...props}
              />
            )
          }}
          sx={{ minHeight: '500px', overflowY: 'auto' }}
        />
      </Box>
    </ContentWrapper>
  );
};

export default OrdersList;

import React from 'react';
import { Box, Button, CircularProgress, Typography } from '@mui/material';
import { useState } from 'react';
import { DataGrid, GridColumnHeaderParams, GridColumns, GridRowParams } from '@mui/x-data-grid';

import { useNavigate } from 'react-router-dom';
import ContentWrapper from '../../../components/ContentWrapper';
import CustomPagination from '../../../components/global/Table/utils/CustomPagination';
import { useGetVendorsQuery } from '../../../api/vendor';

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
    field: 'name',
    headerName: 'NAME',
    valueFormatter: (data) => data.value.title,
    width: 200,
    renderHeader: (params: GridColumnHeaderParams) => <strong>{params.colDef.headerName}</strong>
  },
  {
    field: 'type',
    headerName: 'TYPE',
    valueFormatter: (data) => data.value.title,
    width: 200,
    renderHeader: (params: GridColumnHeaderParams) => <strong>{params.colDef.headerName}</strong>
  },
  {
    field: 'city',
    headerName: 'CITY',
    valueFormatter: (data) => data.value.title,
    width: 150,
    renderHeader: (params: GridColumnHeaderParams) => <strong>{params.colDef.headerName}</strong>
  },
  {
    field: 'state',
    headerName: 'STATE',
    valueFormatter: (data) => data.value.title,
    width: 150,
    renderHeader: (params: GridColumnHeaderParams) => <strong>{params.colDef.headerName}</strong>
  },
  {
    field: 'active',
    headerName: 'Active',
    valueFormatter: (data) => data.value.title,
    width: 100,
    renderHeader: (params: GridColumnHeaderParams) => <strong>{params.colDef.headerName}</strong>
  }
];

const VendorList: React.FC = () => {
  const navigate = useNavigate();

  const [paginationParams, setPaginationParams] = useState({ page: 0, size: 10 });

  const { data: clientDetails, isLoading, isError, isFetching } = useGetVendorsQuery({ params: paginationParams });

  if (isLoading) {
    return <CircularProgress />;
  }

  if (isError) {
    return <p>Error loading client list</p>;
  }

  const updatedColumns = [
    ...columns,
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
            navigate(`details/${uuid}`);
          }}>
          Details
        </Button>
      ]
    }
  ];

  const paginationInfo = clientDetails?.meta;

  const onPageChange = (page: number) => {
    setPaginationParams((old) => ({ ...old, page }));
  };

  return (
    <ContentWrapper>
      <Box sx={{ width: '100%', minHeight: '500px' }}>
        <DataGrid
          columns={updatedColumns}
          paginationMode='server'
          rows={clientDetails?.data || []}
          filterMode='server'
          loading={isFetching}
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

export default VendorList;

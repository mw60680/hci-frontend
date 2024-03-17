import React from 'react';
import { Box, Button, Typography } from '@mui/material';
import { useState } from 'react';
import { DataGrid, GridColumnHeaderParams, GridColumns, GridRowParams } from '@mui/x-data-grid';
import { useGetUsersQuery } from '../../api/user';
import { useNavigate } from 'react-router-dom';
import ContentWrapper from '../../components/ContentWrapper';
import CustomPagination from '../../components/global/Table/utils/CustomPagination';

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
    headerName: 'User Name',
    valueFormatter: (data) => data.value.title,
    width: 200,
    renderHeader: (params: GridColumnHeaderParams) => <strong>{params.colDef.headerName}</strong>
  },
  {
    field: 'email',
    headerName: 'Email',
    width: 200,
    renderHeader: (params: GridColumnHeaderParams) => <strong>{params.colDef.headerName}</strong>
  },
  {
    field: 'employment_type',
    headerName: 'Employment Type',
    valueFormatter: (data) => data.value || '-',
    width: 150,
    renderHeader: (params: GridColumnHeaderParams) => <strong>{params.colDef.headerName}</strong>
  },
  {
    field: 'user_type',
    headerName: 'User Type',
    renderCell: (data) => {
      const status = data.value || '';
      return <Typography>{status}</Typography>;
    },
    width: 100,
    renderHeader: (params: GridColumnHeaderParams) => <strong>{params.colDef.headerName}</strong>
  },
  {
    field: 'mobile',
    headerName: 'Mobile Number',
    width: 160,
    renderHeader: (params: GridColumnHeaderParams) => <strong>{params.colDef.headerName}</strong>
  },
  {
    field: 'dob',
    headerName: 'DOB',
    valueFormatter: (data) => {
      return new Date(data.value).toLocaleDateString('default', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      });
    },
    width: 160,
    renderHeader: (params: GridColumnHeaderParams) => <strong>{params.colDef.headerName}</strong>
  },
  {
    field: 'created_at',
    headerName: 'Created_At',
    valueFormatter: (data) => {
      return new Date(data.value).toLocaleDateString('default', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      });
    },
    width: 160,
    renderHeader: (params: GridColumnHeaderParams) => <strong>{params.colDef.headerName}</strong>
  },
  {
    field: 'updated_at',
    headerName: 'Updated_At',
    valueFormatter: (data) => {
      return new Date(data.value).toLocaleDateString('default', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      });
    },
    width: 160,
    renderHeader: (params: GridColumnHeaderParams) => <strong>{params.colDef.headerName}</strong>
  }
];

const UsersList: React.FC = () => {
  const navigate = useNavigate();

  const [paginationParams, setPaginationParams] = useState({ page: 0, size: 10 });

  const { data: userDetails, isLoading, isError, isFetching } = useGetUsersQuery({ params: paginationParams });
  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <p>Error loading data</p>;
  }

  const updatedColumns = [
    ...columns,
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Actions',
      width: 100,
      cellClassName: 'actions',
      getActions: (params: GridRowParams) => [
        <Button
          key='action'
          onClick={() => {
            const uuid = params.row.uuid;
            navigate(`${uuid}`);
          }}>
          Edit
        </Button>
      ]
    }
  ];

  const paginationInfo = userDetails?.meta;

  const onPageChange = (page: number) => {
    setPaginationParams((old) => ({ ...old, page }));
  };

  return (
    <ContentWrapper>
      <Box sx={{ width: '100%', minHeight: '500px' }}>
        <DataGrid
          columns={updatedColumns}
          paginationMode='server'
          rows={userDetails?.data || []}
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

export default UsersList;

import { Box, Pagination, Typography } from '@mui/material';
import React from 'react';

const CustomPagination = (props: any) => {
  return (
    <Box
      display='flex'
      alignItems='center'
      justifyContent='space-between'
      width='100%'
      p={2}
      borderTop='1px solid #eee'>
      <Typography sx={{ fontSize: { md: '16px', xs: '14px' }, fontWeight: { md: '700', xs: '500' } }}>
        Showing page {props.page} of {props?.paginationInfo?.totalPages} pages ({props.size} items per page)
      </Typography>
      <Pagination
        count={props?.paginationInfo?.totalPages}
        page={props?.page}
        size='small'
        onChange={(_event, value) => {
          props.onPageChange(value);
        }}
        hideNextButton={props?.paginationInfo?.isLastPage}
        hidePrevButton={props?.paginationInfo?.isFirstPage}
        disabled={false}
      />
    </Box>
  );
};

export default React.memo(CustomPagination);

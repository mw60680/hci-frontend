import { Box, Pagination, Typography } from '@mui/material';
import React from 'react';
import { IPageMeta } from '../../../../api/types/common';

type ComponentProps = {
  page: number;
  size: number;
  paginationInfo: IPageMeta;
  onPageChange: (val: number) => void;
};

const CustomPagination: React.FC<ComponentProps> = ({ page, size, paginationInfo, onPageChange }) => {
  return (
    <Box
      display='flex'
      alignItems='center'
      justifyContent='space-between'
      width='100%'
      p={2}
      borderTop='1px solid #eee'>
      <Typography sx={{ fontSize: { md: '16px', xs: '14px' }, fontWeight: { md: '700', xs: '500' } }}>
        Showing page {page + 1} of {paginationInfo.totalPages} pages ({size} items per page)
      </Typography>
      <Pagination
        count={paginationInfo?.totalPages}
        page={page + 1}
        size='small'
        onChange={(_event, value) => {
          onPageChange(value - 1);
        }}
        hideNextButton={!paginationInfo.nextPage}
        hidePrevButton={page === 0}
        disabled={false}
      />
    </Box>
  );
};

export default React.memo(CustomPagination);

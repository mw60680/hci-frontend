import { Box } from '@mui/material';
import React from 'react';

const ContentWrapper: React.FC<{ children: React.ReactNode; style?: any }> = ({ children, style }) => {
  return (
    <Box
      sx={{
        padding: { md: '18px', xs: '12px' },
        width: '100%',
        boxSizing: 'border-box',
        ...style
      }}>
      {children}
    </Box>
  );
};

ContentWrapper.defaultProps = {
  style: {}
};

export default ContentWrapper;

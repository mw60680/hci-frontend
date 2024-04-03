import { Box, Stack, Typography } from '@mui/material';
import React from 'react';

type ComponentProps = {
  title?: string;
  style?: any;
};

const ContentWrapper: React.FC<React.PropsWithChildren<ComponentProps>> = ({ children, style, title }) => {
  return (
    <Stack
      gap='2em'
      sx={{
        padding: { md: '18px', xs: '12px' },
        width: '100%',
        boxSizing: 'border-box',
        ...style
      }}>
      {title && (
        <Typography fontSize='1.5rem' fontWeight={700}>
          {title}
        </Typography>
      )}
      <Box>{children}</Box>
    </Stack>
  );
};

ContentWrapper.defaultProps = {
  style: {}
};

export default ContentWrapper;

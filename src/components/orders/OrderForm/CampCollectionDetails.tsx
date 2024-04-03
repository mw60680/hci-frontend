import { Stack, Typography } from '@mui/material';
import { FormikHandlers, FormikState } from 'formik';
import React from 'react';

export type CampFields = {
  address: string;
  name: string;
  time: string;
  manager: {
    name: string;
    mobile: string;
  };
};

type ComponentProps = {
  values: Partial<FormikState<CampFields>['values']>;
  handleChange: FormikHandlers['handleChange'];
  handleBlur: FormikHandlers['handleBlur'];
};

const CampCollectionDetails: React.FC<ComponentProps> = ({ values, handleChange, handleBlur }) => {
  return (
    <>
      <Typography fontSize='1.25rem' fontWeight={700}>
        Camp Details
      </Typography>
      <Stack direction='row' gap='1em' flexWrap='wrap'></Stack>
    </>
  );
};

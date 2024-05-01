import React from 'react';
import { FormikHandlers, FormikState } from 'formik';
import { Stack, TextField, Typography } from '@mui/material';
import { DateTimeField, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Dayjs } from 'dayjs';

export type CampFields = {
  address: string;
  name: string;
  time: string | Dayjs;
  manager: {
    name: string;
    mobile: string;
  };
};

type ComponentProps = {
  values: Partial<FormikState<CampFields>['values']>;
  handleChange: FormikHandlers['handleChange'];
  handleBlur: FormikHandlers['handleBlur'];
  setFieldValue: (name: string, value: any) => void;
};

const CampCollectionDetails: React.FC<ComponentProps> = ({ values, handleChange, handleBlur, setFieldValue }) => {
  return (
    <>
      <Typography fontSize='1.25rem' fontWeight={700}>
        Camp Details
      </Typography>
      <Stack direction='row' gap='1em' flexWrap='wrap'>
        <TextField
          name='camp.name'
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder='Camp Name'
          label='Camp Name'
          value={values.name}
        />

        <TextField
          name='camp.address'
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder='Address'
          label='Address'
          value={values.address}
          minRows={3}
        />

        <TextField
          name='camp.manager.name'
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder='Manager Name'
          label='Manager Name'
          value={values.manager?.name}
        />

        <TextField
          name='camp.manager.mobile'
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder='Manager Mobile'
          label='Manager Mobile'
          value={values.manager?.mobile}
        />

        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DateTimeField
            label='Scheduled Time'
            value={values.time}
            onChange={(val) => setFieldValue('camp.time', val)}
            onBlur={handleBlur}
            name='camp.time'
            format='DD/MM/YYYY HH:mm A'
          />
        </LocalizationProvider>
      </Stack>
    </>
  );
};

export default CampCollectionDetails;

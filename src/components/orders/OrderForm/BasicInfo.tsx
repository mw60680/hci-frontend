import React from 'react';
import { FormControl, InputLabel, MenuItem, Select, Stack, TextField, Typography } from '@mui/material';
import { DateField, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { FormikHandlers } from 'formik';
import CollectionTypeSelection from '../common/CollectionTypeSelection';

export type PatientInfo = {
  name: string;
  mobile: string;
  email: string;
  dob: string | Date;
  gender: string;
};

type ComponentProps = {
  values: {
    collectionType?: string;
    patient: Partial<PatientInfo>;
  };
  handleChange: FormikHandlers['handleChange'];
  handleBlur: FormikHandlers['handleBlur'];
  setFieldValue: (name: string, val: any) => void;
};

const BasicInfo: React.FC<ComponentProps> = ({ values, handleBlur, handleChange, setFieldValue }) => {
  return (
    <>
      <Stack direction='row' flexWrap='wrap'>
        <CollectionTypeSelection
          name='collectionType'
          value={values.collectionType || ''}
          handleChange={handleChange}
        />
      </Stack>
      <Typography fontWeight='700' fontSize='1.25rem'>
        Patient Information
      </Typography>
      <Stack direction='row' gap='1em' flexWrap='wrap'>
        <TextField
          label='Patient Name'
          name='patient.name'
          value={values.patient.name}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder='Patient Name'
        />
        <FormControl sx={{ width: '200px' }}>
          <InputLabel id='patient-gender-select-label'>Gender</InputLabel>
          <Select
            labelId='patient-gender-select-label'
            id='patient-gender-select'
            value={values.patient.gender}
            label='Gender'
            onChange={handleChange}
            name='patient.gender'>
            <MenuItem value='Male'>Male</MenuItem>
            <MenuItem value='Female'>Female</MenuItem>
          </Select>
        </FormControl>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DateField
            format='DD-MM-YYYY'
            label='Date of Birth'
            value={values.patient.dob}
            onChange={(val) => setFieldValue('patient.dob', val)}
            onBlur={handleBlur}
            name='patient.dob'
          />
        </LocalizationProvider>
        <TextField
          name='patient.mobile'
          value={values.patient.mobile}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder='Patient Mobile Number'
          label='Patient Mobile Number'
        />
        <TextField
          name='patient.email'
          value={values.patient.email}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder='Patient Email'
          label='Patient Email'
        />
      </Stack>
    </>
  );
};

export default BasicInfo;

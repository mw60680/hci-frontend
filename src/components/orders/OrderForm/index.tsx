import React from 'react';
import { FormControl, InputLabel, MenuItem, Select, Stack, TextField, Typography } from '@mui/material';
import { DateField, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { FormikHandlers, FormikState } from 'formik';
import HomeCollectionDetails, { HomeCollectionFields } from './HomeCollectionDetails';
import { CampFields } from './CampCollectionDetails';

export type OrderFormFields = {
  collectionType?: string;
  patient: Partial<{
    name: string;
    mobile: string;
    email: string;
    dob: string | Date;
    gender: string;
  }>;
  payment: Partial<{
    status: string;
    mode: string;
    transactionId: string;
    amount: string;
    paid: string;
  }>;
  homeCollection?: Partial<HomeCollectionFields>;
  camp?: Partial<CampFields>;
};

const PAYMENT_STATUS = ['COMPLETED', 'PENDING'];

type ComponentProps = {
  values: FormikState<OrderFormFields>['values'];
  handleChange: FormikHandlers['handleChange'];
  handleBlur: FormikHandlers['handleBlur'];
  setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void;
};

const OrderForm: React.FC<ComponentProps> = ({ values, handleChange, handleBlur, setFieldValue }) => {
  return (
    <Stack gap='1em'>
      <Stack direction='row' flexWrap='wrap'>
        <FormControl>
          <InputLabel id='collection-type-select-label'>Collection Type</InputLabel>
          <Select
            labelId='collection-type-select-label'
            id='collection-type-select'
            value={values.collectionType}
            label='Collection Type'
            onChange={handleChange}
            name='collectionType'>
            <MenuItem value='HOME_COLLECTION'>Home Collection</MenuItem>
            <MenuItem value='CAMP'>Camp</MenuItem>
          </Select>
        </FormControl>
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

      <Typography fontWeight='700' fontSize='1.25rem'>
        Payment Information
      </Typography>
      <Stack direction='row' gap='1em' flexWrap='wrap'>
        <FormControl sx={{ width: '250px' }}>
          <InputLabel id='payment-status-select-label'>Payment Status</InputLabel>
          <Select
            labelId='payment-status-select-label'
            id='payment-status-select'
            value={values.payment.status}
            label='Payment Status'
            onChange={handleChange}
            onBlur={handleBlur}
            name='payment.status'>
            {PAYMENT_STATUS.map((status) => (
              <MenuItem value={status} key={`payment-status-option-${status}`}>
                {status}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField
          label='Payment Mode'
          name='payment.mode'
          value={values.payment.mode}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder='Patient Name'
        />
        <TextField
          name='payment.transactionId'
          value={values.payment.transactionId}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder='Transaction ID'
          label='Transaction ID'
        />
        <TextField
          name='payment.amount'
          value={values.payment.amount}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder='Amount'
          label='Amount'
        />
        <TextField
          name='payment.paid'
          value={values.payment.paid}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder='Paid'
          label='Paid'
        />
      </Stack>

      {values.collectionType === 'HOME_COLLECTION' && (
        <HomeCollectionDetails
          values={values.homeCollection || {}}
          handleBlur={handleBlur}
          handleChange={handleChange}
        />
      )}
    </Stack>
  );
};

export default OrderForm;

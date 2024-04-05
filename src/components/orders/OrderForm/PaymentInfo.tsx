import React from 'react';
import { FormControl, InputLabel, MenuItem, Select, Stack, TextField, Typography } from '@mui/material';
import { FormikHandlers } from 'formik';

const PAYMENT_STATUS = ['COMPLETED', 'PENDING'];

export type PaymentType = {
  status: string;
  mode: string;
  transactionId: string;
  amount: string;
  paid: string;
};

type ComponentProps = {
  values: {
    payment: Partial<PaymentType>;
  };
  handleChange: FormikHandlers['handleChange'];
  handleBlur: FormikHandlers['handleBlur'];
};

const PaymentInfo: React.FC<ComponentProps> = ({ values, handleBlur, handleChange }) => {
  return (
    <>
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
    </>
  );
};

export default PaymentInfo;

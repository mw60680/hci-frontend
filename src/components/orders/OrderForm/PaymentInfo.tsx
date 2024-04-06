import React from 'react';
import { Stack, TextField, Typography } from '@mui/material';
import { FormikHandlers } from 'formik';
import PaymentStatusSelection from '../common/PaymentStatusSelection';

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
        <PaymentStatusSelection
          name='payment.status'
          value={values.payment.status || ''}
          handleChange={handleChange}
          handleBlur={handleBlur}
        />

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

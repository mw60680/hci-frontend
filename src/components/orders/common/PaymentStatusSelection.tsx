import React from 'react';
import { FormikHandlers } from 'formik';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { PAYMENT_STATUS } from '../../../utils/constants';

type ComponentProps = {
  name: string;
  value: string;
  handleChange: FormikHandlers['handleChange'];
  handleBlur: FormikHandlers['handleBlur'];
};

const PaymentStatusSelection: React.FC<ComponentProps> = ({ name, value, handleChange, handleBlur }) => {
  return (
    <FormControl sx={{ width: '200px' }}>
      <InputLabel id='payment-status-select-label'>Payment Status</InputLabel>
      <Select
        labelId='payment-status-select-label'
        id='payment-status-select'
        value={value}
        label='Payment Status'
        onChange={handleChange}
        onBlur={handleBlur}
        name={name}>
        {Object.keys(PAYMENT_STATUS).map((status) => (
          <MenuItem value={status} key={`payment-status-option-${status}`}>
            {status}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default PaymentStatusSelection;

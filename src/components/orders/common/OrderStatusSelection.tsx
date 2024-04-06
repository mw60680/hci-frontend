import React from 'react';
import { FormikHandlers } from 'formik';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { ORDER_STATUS } from '../../../utils/constants';

type ComponentProps = {
  name: string;
  value: string;
  handleChange: FormikHandlers['handleChange'];
  handleBlur: FormikHandlers['handleBlur'];
};

const OrderStatusSelection: React.FC<ComponentProps> = ({ name, value, handleChange, handleBlur }) => {
  return (
    <FormControl sx={{ width: '200px' }}>
      <InputLabel id='order-status-select-label'>Order Status</InputLabel>
      <Select
        labelId='order-status-select-label'
        id='order-status-select'
        value={value}
        label='Order Status'
        onChange={handleChange}
        onBlur={handleBlur}
        name={name}>
        {Object.keys(ORDER_STATUS).map((status) => (
          <MenuItem value={status} key={`order-status-option-${status}`}>
            {status}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default OrderStatusSelection;

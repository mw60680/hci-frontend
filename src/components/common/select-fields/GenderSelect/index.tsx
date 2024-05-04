import React from 'react';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';

type ComponentProps = {
  value: string;
  setValue: (val: string) => void;
  label?: string;
};

const GenderSelect: React.FC<ComponentProps> = ({ value, setValue, label = 'Gender' }) => {
  return (
    <FormControl>
      <InputLabel id='gender-select-label'>{label}</InputLabel>
      <Select
        id='gender-select'
        labelId='gender-select-label'
        label={label}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        variant='standard'>
        <MenuItem value='M'>Male</MenuItem>
        <MenuItem value='F'>Female</MenuItem>
        <MenuItem value='O'>Other</MenuItem>
      </Select>
    </FormControl>
  );
};

export default GenderSelect;

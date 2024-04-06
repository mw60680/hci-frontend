import React from 'react';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { FormikHandlers } from 'formik';

type ComponentProps = {
  name: string;
  value: string;
  handleChange: FormikHandlers['handleChange'];
};

const CollectionTypeSelection: React.FC<ComponentProps> = ({ value, name, handleChange }) => {
  return (
    <FormControl>
      <InputLabel id='collection-type-select-label'>Collection Type</InputLabel>
      <Select
        labelId='collection-type-select-label'
        id='collection-type-select'
        value={value}
        label='Collection Type'
        onChange={handleChange}
        name={name}
        sx={{
          width: '150px'
        }}>
        <MenuItem value='HOME_COLLECTION'>Home Collection</MenuItem>
        <MenuItem value='CAMP'>Camp</MenuItem>
      </Select>
    </FormControl>
  );
};

export default CollectionTypeSelection;

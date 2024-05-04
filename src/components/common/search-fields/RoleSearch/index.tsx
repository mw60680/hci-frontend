import React, { useState } from 'react';
import { Alert, Autocomplete, TextField } from '@mui/material';
import { useRolesQuery } from '../../../../api/roles-permissions';

type ComponentProps = {
  label?: string;
  value: {
    id: string;
    name: string;
  }[];
  setValue: (val: { id: string; name: string }[] | null) => void;
};

const RolesSearch: React.FC<ComponentProps> = ({ label = 'Roles', value, setValue }) => {
  const [searchInput, setSearchInput] = useState('');
  const { data: roles, isLoading, isError } = useRolesQuery();

  if (isLoading) return 'Loading...';

  if (isError || !roles) return <Alert severity='error'>Error Loading Roles</Alert>;

  const onSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
  };

  const options = roles.data.map((role) => ({ id: role.slug, name: role.label }));

  return (
    <Autocomplete
      options={options}
      value={value}
      getOptionLabel={(option) => option.name}
      onChange={(e, val) => (val ? setValue(val) : null)}
      multiple
      renderInput={(params) => (
        <TextField
          {...params}
          sx={{ width: '270px' }}
          label={label}
          value={searchInput}
          onChange={onSearchInputChange}
          variant='standard'
        />
      )}
    />
  );
};

export default RolesSearch;

import React, { useRef, useState } from 'react';
import { Autocomplete, TextField } from '@mui/material';
import { debounce } from 'lodash';
import { useLazyGetUsersQuery } from '../../../../api/user';
import { useLazyGetVendorsQuery } from '../../../../api/vendor';

type ComponentProps = {
  label?: string;
  value: {
    id: string;
    name: string;
  };
  setValue: (val: { id: string; name: string } | null) => void;
};

const VendorSearch: React.FC<ComponentProps> = ({ label = 'Vendor', value, setValue }) => {
  const [searchInput, setSearchInput] = useState('');
  const [options, setOptions] = useState<{ id: string; name: string }[]>([]);

  const [searchVendor] = useLazyGetVendorsQuery();

  const searchUserByName = async (name: string) => {
    try {
      const res = await searchVendor({ params: { name: name, page: 0, size: 10 } });

      if ('error' in res) throw res.error;

      setOptions(res.data!.data.map((item) => ({ id: item.uuid, name: item.name })));
    } catch (error) {
      setOptions([]);
    }
  };

  const debouncedSearch = useRef(
    debounce(async (criteria: string) => {
      searchUserByName(criteria);
    }, 300)
  ).current;

  const onSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
    debouncedSearch(e.target.value);
  };

  return (
    <Autocomplete
      options={options}
      value={value}
      getOptionLabel={(option) => option.name}
      onChange={(e, val) => setValue(val)}
      renderInput={(params) => (
        <TextField
          {...params}
          sx={{ width: '270px' }}
          label={label}
          value={searchInput}
          onChange={onSearchInputChange}
        />
      )}
    />
  );
};

export default VendorSearch;

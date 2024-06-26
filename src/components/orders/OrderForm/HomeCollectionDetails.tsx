import React from 'react';
import { Stack, TextField, Typography } from '@mui/material';
import { FormikHandlers, FormikHelpers, FormikState } from 'formik';
import { DateTimeField, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import UserSearch from '../../common/search-fields/UserSearch';

export type HomeCollectionFields = {
  address: string;
  locality: string;
  city: string;
  pincode: string;
  lat: string;
  lng: string;
  alternateMobile: string;
  scheduledTime: string;
  sampleProcessingLab: string;
  phleboId: string;
  phleboName: string;
  phleboNotes: string;
  runnerId: string;
  tubeType: string;
  barCode: string[];
};

type ComponentProps = {
  values: Partial<FormikState<HomeCollectionFields>['values']>;
  handleChange: FormikHandlers['handleChange'];
  handleBlur: FormikHandlers['handleBlur'];
  setFieldValue: (name: string, value: any) => void;
};

const HomeCollectionDetails: React.FC<ComponentProps> = ({ values, handleBlur, handleChange, setFieldValue }) => {
  return (
    <>
      <Typography fontSize='1.25rem' fontWeight={700}>
        Home Collection Details
      </Typography>
      <Stack direction='row' gap='1em' flexWrap='wrap'>
        <TextField
          name='homeCollection.address'
          value={values.address}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder='Address'
          label='Address'
        />
        <TextField
          name='homeCollection.locality'
          value={values.locality}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder='Locality'
          label='Locality'
        />
        <TextField
          name='homeCollection.city'
          value={values.city}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder='Address'
          label='Address'
        />
        <TextField
          name='homeCollection.pincode'
          value={values.pincode}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder='PIN Code'
          label='PIN Code'
        />
        <TextField
          name='homeCollection.lat'
          value={values.lat}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder='Latitude'
          label='Longitude'
        />
        <TextField
          name='homeCollection.alternateMobile'
          value={values.alternateMobile}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder='Alternate Mobile'
          label='Alternate Mobile'
        />
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DateTimeField
            label='Scheduled Time'
            value={values.scheduledTime}
            onChange={handleChange}
            onBlur={handleBlur}
            name='homeCollection.scheduledTime'
          />
        </LocalizationProvider>
        <UserSearch
          label='Phlebo'
          value={{ id: values.phleboId || '', name: values.phleboName || '' }}
          setValue={(val) => {
            if (val) {
              setFieldValue('homeCollection.phleboId', val.id);
              setFieldValue('homeCollection.phleboName', val.name);
            } else {
              setFieldValue('homeCollection.phleboId', '');
              setFieldValue('homeCollection.phleboName', '');
            }
          }}
        />
        <TextField
          name='homeCollection.phleboNotes'
          value={values.phleboNotes}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder='Phlebo Notes'
          label='Phlebo Notes'
        />
        <TextField
          name='homeCollection.tubeType'
          value={values.tubeType}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder='Tube Type'
          label='Tube Type'
        />
      </Stack>
    </>
  );
};

export default HomeCollectionDetails;

import React from 'react';
import { Box, Button, MenuItem, Stack, TextField, Typography } from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Formik, Form, FormikState, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import dayjs from 'dayjs';

import ContentWrapper from '../../../components/ContentWrapper';
import { useAddUsersMutation } from '../../../api/user';
import RolesSearch from '../../../components/common/search-fields/RoleSearch';
import GenderSelect from '../../../components/common/select-fields/GenderSelect';

const validationSchema = Yup.object({
  name: Yup.string().required('Name is required'),
  email: Yup.string().email().required('Email is required'),
  mobile: Yup.string()
    .required('Mobile is required')
    .matches(/^[6-9]\d{9}$/, 'Please enter a valid mobile number'),
  city: Yup.string().required('City is required'),
  userType: Yup.string().required('User type is required'),
  roles: Yup.array().of(Yup.string()),
  employmentType: Yup.string().required('Employement type is required'),
  gender: Yup.string().required('Gender is required'),
  alternateMobile: Yup.array().of(Yup.number()),
  address: Yup.object().shape({
    addressLine1: Yup.string().required('Address Line 1 is required'),
    addressLine2: Yup.string(),
    landmark: Yup.string(),
    city: Yup.string().required('City is required'),
    state: Yup.string().required('State is required'),
    country: Yup.string().required('Country is required'),
    pincode: Yup.number().required('Pincode is required')
  }),
  supportedPincodes: Yup.array().of(Yup.number()),
  experience: Yup.number(),
  vendorId: Yup.string()
});

const initialValues = {
  name: '',
  email: '',
  mobile: '',
  city: '',
  dob: new Date(),
  userType: '',
  active: true,
  employmentType: '',
  roles: [],
  gender: '',
  alternateMobile: [],
  supportedPincodes: [],
  experience: '',
  vendor: {
    id: '',
    name: ''
  }
};

type Form_Type = typeof initialValues;

const AddUser: React.FC = () => {
  const [addUserMutation] = useAddUsersMutation();

  const handleSubmit = async (values: FormikState<Form_Type>['values'], helpers: FormikHelpers<Form_Type>) => {
    try {
      helpers.setSubmitting(true);

      const payload = { ...values, dob: new Date(values.dob).toISOString() };
      const apiRes = await addUserMutation(payload);

      if ('error' in apiRes) {
        throw apiRes.error;
      }
    } catch (error) {
      console.log(error);
    } finally {
      helpers.setSubmitting(false);
      helpers.resetForm();
    }
  };

  return (
    <ContentWrapper>
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
        {({ errors, touched, handleChange, values, setFieldValue, isSubmitting, handleSubmit }) => (
          <Form onSubmit={handleSubmit}>
            <Stack gap='2em' alignItems='center'>
              <Stack direction='row' gap='2em' flexWrap='wrap' width='100%' justifyContent='center'>
                <Stack gap='1.5em'>
                  <TextField
                    fullWidth
                    variant='standard'
                    id='name'
                    name='name'
                    label='Name'
                    value={values.name}
                    onChange={handleChange}
                    error={touched.name && Boolean(errors.name)}
                    helperText={!!touched.name && errors.name}
                  />
                  <GenderSelect value={values.gender} setValue={(val) => setFieldValue('gender', val)} />
                  <TextField
                    fullWidth
                    variant='standard'
                    id='email'
                    name='email'
                    label='Email'
                    onChange={handleChange}
                    value={values.email}
                    error={touched.email && Boolean(errors.email)}
                    helperText={!!touched.email && errors.email}
                  />
                  <TextField
                    fullWidth
                    variant='standard'
                    id='mobile'
                    name='mobile'
                    label='Mobile'
                    type='number'
                    onChange={handleChange}
                    value={values.mobile}
                    error={touched.mobile && Boolean(errors.mobile)}
                    helperText={!!touched.mobile && errors.mobile}
                  />
                  <TextField
                    fullWidth
                    variant='standard'
                    id='city'
                    name='city'
                    label='City'
                    value={values.city}
                    onChange={handleChange}
                    error={touched.city && Boolean(errors.city)}
                    helperText={Boolean(touched.city) && errors.city}
                  />

                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      label='DOB'
                      value={dayjs(values.dob)}
                      onChange={(newValue) => setFieldValue('dob', newValue)}
                      disableFuture
                      slotProps={{
                        textField: {
                          variant: 'standard'
                        }
                      }}
                    />
                  </LocalizationProvider>
                </Stack>

                <Stack gap='1.5em'>
                  <TextField
                    fullWidth
                    variant='standard'
                    id='employmentType'
                    name='employmentType'
                    label='Employment Type'
                    select
                    onChange={handleChange}
                    value={values.employmentType}
                    error={touched.employmentType && Boolean(errors.employmentType)}
                    helperText={!!touched.employmentType && errors.employmentType}>
                    {[
                      { id: 'FULL_TIME', display: 'Full Time' },
                      { id: 'PART_TIME', display: 'Part Time' }
                    ]?.map((item) => (
                      <MenuItem key={item.id} value={item.id}>
                        <Box>
                          <Typography>{item.display}</Typography>
                        </Box>
                      </MenuItem>
                    ))}
                  </TextField>
                  <TextField
                    fullWidth
                    variant='standard'
                    id='userType'
                    name='userType'
                    label='User Type'
                    select
                    onChange={handleChange}
                    value={values.userType}
                    error={touched.userType && Boolean(errors.userType)}
                    helperText={!!touched.userType && errors.userType}>
                    {[
                      { id: 'admin', display: 'Admin' },
                      { id: 'user', display: 'User' }
                    ]?.map((item) => (
                      <MenuItem key={item.id} value={item.id}>
                        <Box>
                          <Typography>{item.display}</Typography>
                        </Box>
                      </MenuItem>
                    ))}
                  </TextField>
                  <RolesSearch
                    value={values.roles}
                    setValue={(val) => {
                      setFieldValue('roles', val);
                    }}
                  />
                </Stack>
              </Stack>

              <Box>
                <Button size='large' type='submit' variant='contained' color='primary' disabled={isSubmitting}>
                  {isSubmitting ? 'Saving...' : 'Create user'}
                </Button>
              </Box>
            </Stack>
          </Form>
        )}
      </Formik>
    </ContentWrapper>
  );
};

export default AddUser;

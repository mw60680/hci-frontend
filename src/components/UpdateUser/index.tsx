import React from 'react';
import { useParams } from 'react-router-dom';
import { useGetUserByIdQuery, useUpdateUserMutation } from '../../api/user';
import { Box, Button, MenuItem, Stack, TextField, Typography } from '@mui/material';
import ContentWrapper from '../ContentWrapper';
import { Formik, Form, FormikState, FormikHelpers } from 'formik';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import * as Yup from 'yup';

const validationSchema = Yup.object({
  name: Yup.string().required('Name is required'),
  email: Yup.string().email().required('Email is required'),
  mobile: Yup.string().matches(/^[6-9]\d{9}$/, 'Please enter a valid mobile number'),
  city: Yup.string().required('City is required'),
  userType: Yup.string().required('User type is required'),
  employmentType: Yup.string().required('Employment type is required')
});

const UpdateUser: React.FC = () => {
  const { uuid } = useParams<{ uuid: string }>();

  const { data: user, isLoading, isError } = useGetUserByIdQuery(uuid || '');

  const [updateUserMutation] = useUpdateUserMutation();

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <p>Error loading data</p>;
  }

  if (!user) {
    return <p>No user details found</p>;
  }

  const initialValues = {
    name: user.data.name,
    email: user.data.email,
    mobile: user.data.mobile,
    city: user.data.city,
    dob: user.data.dob,
    userType: user.data.user_type,
    active: true,
    employmentType: user.data.employment_type,
    isEditable: false
  };

  const handleSubmit = async (
    values: FormikState<typeof initialValues>['values'],
    helpers: FormikHelpers<typeof initialValues>
  ) => {
    try {
      helpers.setSubmitting(true);
      const payload = { ...values, dob: new Date(values.dob).toISOString() };

      const apiRes = await updateUserMutation({ uuid: uuid || '', payload });

      if ('error' in apiRes) {
        throw apiRes.error;
      }

      helpers.setFieldValue('isEditable', false);
    } catch (error) {
      console.log(error);
    } finally {
      helpers.setSubmitting(false);
    }
  };

  return (
    <ContentWrapper>
      <Formik
        initialValues={initialValues}
        enableReinitialize
        validationSchema={validationSchema}
        onSubmit={handleSubmit}>
        {({ errors, touched, values, isSubmitting, handleChange, setFieldValue, handleSubmit, resetForm }) => (
          <Box maxWidth='400px' margin='auto'>
            <Form onSubmit={handleSubmit}>
              <Stack gap='1em'>
                <Stack direction='row' justifyContent='flex-end'>
                  {values.isEditable ? (
                    <Stack direction='row' gap='1em'>
                      <Button type='submit' variant='outlined' color='primary' onClick={() => resetForm()}>
                        Cancel
                      </Button>
                      <Button type='submit' variant='contained' color='primary' disabled={isSubmitting}>
                        {isSubmitting ? 'Saving...' : 'Save'}
                      </Button>
                    </Stack>
                  ) : (
                    <Button
                      type='submit'
                      variant='contained'
                      color='primary'
                      onClick={() => setFieldValue('isEditable', true)}>
                      Edit
                    </Button>
                  )}
                </Stack>

                <TextField
                  fullWidth
                  variant='outlined'
                  id='name'
                  name='name'
                  label='Name'
                  value={values.name}
                  onChange={handleChange}
                  error={touched.name && Boolean(errors.name)}
                  InputProps={{
                    readOnly: !values.isEditable
                  }}
                />
                <TextField
                  fullWidth
                  variant='outlined'
                  id='email'
                  name='email'
                  label='Email'
                  onChange={handleChange}
                  value={values.email}
                  error={touched.email && Boolean(errors.email)}
                  InputProps={{
                    readOnly: !values.isEditable
                  }}
                />
                <TextField
                  fullWidth
                  variant='outlined'
                  id='mobile'
                  name='mobile'
                  label='Mobile'
                  type='number'
                  onChange={handleChange}
                  value={values.mobile}
                  error={touched.mobile && Boolean(errors.mobile)}
                  InputProps={{
                    readOnly: !values.isEditable
                  }}
                />
                <TextField
                  fullWidth
                  variant='outlined'
                  id='employmentType'
                  name='employmentType'
                  label='Employment Type'
                  select
                  onChange={handleChange}
                  InputProps={{
                    readOnly: !values.isEditable
                  }}
                  value={values.employmentType}
                  error={touched.employmentType && Boolean(errors.employmentType)}>
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
                  variant='outlined'
                  id='userType'
                  name='userType'
                  label='User Type'
                  select
                  onChange={handleChange}
                  value={values.userType}
                  error={touched.userType && Boolean(errors.userType)}>
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
                <TextField
                  fullWidth
                  variant='outlined'
                  id='city'
                  name='city'
                  label='City'
                  value={values.city}
                  onChange={handleChange}
                  error={touched.city && Boolean(errors.city)}
                  InputProps={{
                    readOnly: !values.isEditable
                  }}
                />

                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    label='DOB'
                    value={dayjs(values.dob)}
                    onChange={(newValue) => {
                      setFieldValue('dob', newValue);
                    }}
                  />
                </LocalizationProvider>
              </Stack>
            </Form>
          </Box>
        )}
      </Formik>
    </ContentWrapper>
  );
};

export default UpdateUser;

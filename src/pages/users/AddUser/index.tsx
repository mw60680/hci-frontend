import { Box, Button, MenuItem, TextField, Typography } from '@mui/material';
import * as Yup from 'yup';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Formik, Form } from 'formik';
import React from 'react';
import ContentWrapper from '../../../components/ContentWrapper';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import { useAddUsersMutation } from '../../../api/user';

const validationSchema = Yup.object({
  name: Yup.string().required('Name is required'),
  email: Yup.string().email().required('Email is required'),
  mobile: Yup.string().matches(/^[6-9]\d{9}$/, 'Please enter a valid mobile number'),
  city: Yup.string().required('City is required'),
  userType: Yup.string().required('User type is required'),
  employmentType: Yup.string().required('Employement type is required')
});

const AddUser: React.FC = () => {
  const [addUserMutation, { isLoading }] = useAddUsersMutation();

  const handleSubmit = async (values: any) => {
    try {
      const payload = { ...values, dob: new Date(values.dob).toISOString() };
      const apiRes = await addUserMutation(payload);

      if ('error' in apiRes) {
        throw apiRes.error;
      }
      console.log(apiRes);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <ContentWrapper>
      <Formik
        initialValues={{
          name: '',
          email: '',
          mobile: '',
          city: '',
          dob: new Date(),
          userType: '',
          active: true,
          employmentType: ''
        }}
        validationSchema={validationSchema}
        onSubmit={(values, { resetForm }) => {
          handleSubmit(values);
          resetForm();
        }}>
        {({ errors, touched, handleChange, values, setFieldValue }) => (
          <Box maxWidth='400px' margin='auto'>
            <Form>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  rowGap: '18px'
                }}>
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
                    onChange={(newValue: any) => setFieldValue('dob', newValue)}
                  />
                </LocalizationProvider>

                <Button
                  type='submit'
                  variant='contained'
                  color='primary'
                  sx={{ width: '50%', margin: 'auto' }}
                  disabled={isLoading}>
                  {isLoading ? 'Submitting' : 'Submit'}
                </Button>
              </Box>
            </Form>
          </Box>
        )}
      </Formik>
    </ContentWrapper>
  );
};

export default AddUser;

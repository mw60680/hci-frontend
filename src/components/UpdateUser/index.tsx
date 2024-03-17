import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useGetUserByIdQuery, useUpdateUserMutation } from '../../api/user';
import { Box, Button, MenuItem, TextField, Typography } from '@mui/material';
import ContentWrapper from '../ContentWrapper';
import { Formik, Form } from 'formik';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import * as Yup from 'yup';
import ModeEditIcon from '@mui/icons-material/ModeEdit';

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
  const { data: user, isLoading, isError,refetch } = useGetUserByIdQuery(uuid || '');
  const [editableField, setEditableField] = useState('');
  const [updateUserMutation] = useUpdateUserMutation();

  console.log(user);
  const handleEditClick = (fieldName: string) => {
    setEditableField(fieldName);
  };

  const isSubmitDisabled = !editableField ;

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <p>Error loading data</p>;
  }

  if (!user) {
    return <p>No user details found</p>;
  }

  const handleSubmit = async (values: any) => {
    try {
      const payload = { ...values, dob: new Date(values.dob).toISOString() };
      const apiRes = await updateUserMutation({uuid:uuid||'',payload});

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
          name: user.data.name,
          email: user.data.email,
          mobile: user.data.mobile,
          city: user.data.city,
          dob: user.data.dob,
          userType: user.data.user_type,
          active: true,
          employmentType: user.data.employment_type
        }}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting }) => {
          handleSubmit(values);
          window.location.reload();
        }}
      >
        {({ errors, touched, handleChange, values, setFieldValue }) => (
          <Box maxWidth='400px' margin='auto'>
            <Form>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  rowGap: '18px'
                }}
              >
                <TextField
                  fullWidth
                  variant='outlined'
                  id='name'
                  name='name'
                  label='Name'
                  value={values.name}
                  onChange={(e) => {
                    handleChange(e);
                  }}
                  error={touched.name && Boolean(errors.name)}
                  InputProps={{
                    readOnly: editableField !== 'name',
                    endAdornment: (
                      <ModeEditIcon
                        onClick={() => handleEditClick('name')}
                        style={{ cursor: 'pointer' }}
                      />
                    )
                  }}
                />
                <TextField
                  fullWidth
                  variant='outlined'
                  id='email'
                  name='email'
                  label='Email'
                  onChange={(e) => {
                    handleChange(e);
                  }}
                  value={values.email}
                  error={touched.email && Boolean(errors.email)}
                  InputProps={{
                    readOnly: editableField !== 'email',
                    endAdornment: (
                      <ModeEditIcon
                        onClick={() => handleEditClick('email')}
                        style={{ cursor: 'pointer' }}
                      />
                    )
                  }}
                />
                <TextField
                  fullWidth
                  variant='outlined'
                  id='mobile'
                  name='mobile'
                  label='Mobile'
                  type='number'
                  onChange={(e) => {
                    handleChange(e);
                  }}
                  value={values.mobile}
                  error={touched.mobile && Boolean(errors.mobile)}
                  InputProps={{
                    readOnly: editableField !== 'mobile',
                    endAdornment: (
                      <ModeEditIcon
                        onClick={() => handleEditClick('mobile')}
                        style={{ cursor: 'pointer' }}
                      />
                    )
                  }}
                />
                <TextField
                  fullWidth
                  variant='outlined'
                  id='employmentType'
                  name='employmentType'
                  label='Employment Type'
                  select
                  onChange={(e) => {
                    handleChange(e);
                    handleEditClick('employmentType');
                  }}
                  value={values.employmentType}
                  error={touched.employmentType && Boolean(errors.employmentType)}
                >
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
                  onChange={(e) => {
                    handleChange(e);
                    handleEditClick('usertype');
                  }}
                  value={values.userType}
                  error={touched.userType && Boolean(errors.userType)}
                >
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
                  onChange={(e) => {
                    handleChange(e);
                    handleEditClick('city');
                  }}
                  error={touched.city && Boolean(errors.city)}

                  InputProps={{
                    readOnly: editableField !== 'city',
                    endAdornment: (
                      <ModeEditIcon
                        onClick={() => handleEditClick('city')}
                        style={{ cursor: 'pointer' }}
                      />
                    )
                  }}
                />

                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    label='DOB'
                    value={dayjs(values.dob)}
                    onChange={(newValue: any) => {
                      setFieldValue('dob', newValue);
                      handleEditClick('dob');
                    }}
                  />
                </LocalizationProvider>

                <Box mt={2}>
                  <Button
                    type='submit'
                    variant='contained'
                    color='primary'
                    sx={{ width: '100%' }}
                    disabled={isLoading || isSubmitDisabled}
                  >
                    {isLoading ? 'Submitting' : 'Submit'}
                  </Button>
                </Box>
              </Box>
            </Form>
          </Box>
        )}
      </Formik>
    </ContentWrapper>
  );
};

export default UpdateUser;

import React, { useState } from 'react';
import { Formik, FormikHelpers, FormikState } from 'formik';
import { useUpdatePasswordMutation } from '../../../api/user';
import { Alert, Button, Snackbar, Stack, TextField, Typography } from '@mui/material';

type ComponentProps = {
  userName: string;
  mobile: string;
  email: string;
  uuid: string;
  handleSuccess: () => void;
};

const UpdatePasswordForm: React.FC<ComponentProps> = ({ userName, mobile, email, uuid, handleSuccess }) => {
  const initialValues = {
    password: '',
    confirmPassword: ''
  };

  const [error, setError] = useState('');

  type formType = typeof initialValues;

  const [updatePassword] = useUpdatePasswordMutation();

  const handleSubmit = async (values: FormikState<formType>['values'], helpers: FormikHelpers<formType>) => {
    try {
      helpers.setSubmitting(true);
      setError('');

      const body = {
        password: values.password,
        confirmPassword: values.confirmPassword,
        uuid: uuid
      };

      const res = await updatePassword({ uuid: uuid, body: body });

      if ('error' in res) throw res.error;

      handleSuccess();
    } catch (error) {
      setError('Error updating password');
    } finally {
      helpers.setSubmitting(false);
    }
  };

  return (
    <>
      <Snackbar open={Boolean(error)} autoHideDuration={3000} onClose={() => setError('')}>
        <Alert severity='error'>{error}</Alert>
      </Snackbar>
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        {({ handleSubmit, values, handleChange, handleBlur, isSubmitting }) => (
          <Stack component='form' gap='1em' onSubmit={handleSubmit}>
            <Stack>
              <Typography fontSize='1.25rem'>Set password for {userName}</Typography>
              <Typography>Mobile: {mobile}</Typography>
              <Typography>Email: {email}</Typography>
            </Stack>
            <TextField
              type='password'
              name='password'
              placeholder='New Password'
              label='New Password'
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.password}
            />
            <TextField
              type='password'
              name='confirmPassword'
              placeholder='Confirm New Password'
              label='Confirm New Password'
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.confirmPassword}
            />

            <Button variant='contained' type='submit' disabled={isSubmitting}>
              Update Password
            </Button>
          </Stack>
        )}
      </Formik>
    </>
  );
};

export default UpdatePasswordForm;

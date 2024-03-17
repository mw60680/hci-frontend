import { Visibility, VisibilityOff } from '@mui/icons-material';
import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  IconButton,
  InputAdornment,
  Radio,
  RadioGroup,
  Stack,
  TextField,
  Typography
} from '@mui/material';
import * as Yup from 'yup';
import { Form, Formik } from 'formik';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLoginMutation } from '../../api/login';
import Header from '../../components/global/Header';
import { LOGIN_TYPE } from './utils';
import { useDispatch } from 'react-redux';
import { setAuthenticated } from '../../store/auth/authReducer';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [accountNotFound, setAccountNotFound] = useState(false);

  const [signIn, { isSuccess, isLoading }] = useLoginMutation();

  const validationSchema = Yup.object().shape({
    type: Yup.string()
      .oneOf([LOGIN_TYPE.EMAIL, LOGIN_TYPE.MOBILE], 'Invalid login option')
      .required('Please select an option'),
    mobile: Yup.string().matches(/^[6-9]\d{9}$/, 'Please enter a valid mobile number'),
    email: Yup.string().email('Please enter a valid email address'),
    password: Yup.string().required('Password is required').min(8, 'Password must be at least 8 characters')
  });

  const handleSubmit = async (values: any, resetForm: any) => {
    try {
      const payload = {
        type: values.type,
        password: values.password,
        ...(values.type === LOGIN_TYPE.EMAIL ? { email: values.email } : { mobile: values.mobile })
      };
      const apiRes = await signIn(payload);
      if ('error' in apiRes) {
        throw apiRes.error;
      }
      console.log('apiRes', apiRes);

      dispatch(
        setAuthenticated({
          isLoggedIn: true,
          user: apiRes.data.userDetails,
          stage: 'AUTHENTICATED',
          userId: apiRes.data.userDetails?.uuid
        })
      );

      localStorage.setItem('token', 'Bearer ' + apiRes?.data.auth.token);
      localStorage.setItem('refresh-token', apiRes?.data.auth.refreshToken);

      resetForm();
      console.log('before');
      navigate('/');
    } catch (error) {
      setAccountNotFound(true);
      console.error('Unexpected error during sign-in:', error);
    }
  };

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };
  return (
    <>
      <Header setOpenSidebar={() => false} />
      <Stack sx={{ alignItems: 'center', marginTop: '10%' }}>
        <Typography variant='h2' component='h2'>
          Sign in
        </Typography>
        {accountNotFound && (
          <span style={{ color: 'red' }}>
            <br />
            Account Not Found
          </span>
        )}
        <Formik
          initialValues={{
            type: LOGIN_TYPE.EMAIL,
            email: '',
            mobile: '',
            password: ''
          }}
          validationSchema={validationSchema}
          onSubmit={async (values, { resetForm }) => {
            // console.log(values);
            // // await sleep(500);
            // await handleSubmit(values);
            // resetForm();
          }}>
          {({ errors, touched, handleChange, handleBlur, values, isSubmitting, resetForm }) => (
            <Form>
              <Stack spacing={2} sx={{ alignItems: 'center' }}>
                <FormControl>
                  <RadioGroup
                    row
                    aria-labelledby='demo-row-radio-buttons-group-label'
                    name='type'
                    onChange={handleChange}
                    defaultValue={LOGIN_TYPE.EMAIL}>
                    <FormControlLabel value={LOGIN_TYPE.EMAIL} control={<Radio />} label='Email' />
                    <FormControlLabel value={LOGIN_TYPE.MOBILE} control={<Radio />} label='Mobile' />
                  </RadioGroup>
                </FormControl>
                <Box>
                  {values.type === LOGIN_TYPE.EMAIL && (
                    <TextField
                      id='outlined-basic-email'
                      label='Email'
                      variant='outlined'
                      name='email'
                      value={values.email}
                      required={values.type === LOGIN_TYPE.EMAIL}
                      onChange={handleChange}
                      error={touched.email && Boolean(errors.email)}
                      helperText={!!touched.email && errors.email}
                      onBlur={handleBlur}
                      sx={{ width: '40ch' }}
                    />
                  )}
                  {values.type === LOGIN_TYPE.MOBILE && (
                    <TextField
                      id='outlined-basic-mobile'
                      label='Mobile Number'
                      variant='outlined'
                      name='mobile'
                      type='number'
                      value={values.mobile}
                      required={values.type === LOGIN_TYPE.MOBILE}
                      onChange={handleChange}
                      error={touched.mobile && Boolean(errors.mobile)}
                      helperText={!!touched.mobile && errors.mobile}
                      onBlur={handleBlur}
                      sx={{ width: '40ch' }}
                    />
                  )}
                </Box>
                <TextField
                  id='outlined-basic'
                  label='Password'
                  variant='outlined'
                  name='password'
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.password}
                  error={touched.password && Boolean(errors.password)}
                  helperText={!!(touched.password && errors.password)}
                  sx={{ width: '40ch' }}
                  type={showPassword ? 'text' : 'password'}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position='end'>
                        <IconButton
                          aria-label='toggle password visibility'
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge='end'>
                          {showPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>
                    )
                  }}
                />
                <Button
                  variant='contained'
                  sx={{ width: '40ch' }}
                  onClick={() => handleSubmit(values, resetForm)}
                  disabled={isSubmitting}>
                  Sign In
                </Button>
              </Stack>
            </Form>
          )}
        </Formik>
      </Stack>
    </>
  );
};

export default Login;

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { reset, selectLoggedIn, setAuthenticated } from '../../store/auth/authReducer';
import { useNavigate } from 'react-router-dom';
// import { useLazyGetUserDetailsQuery } from '../../api/user';
import { Backdrop, Box, CircularProgress } from '@mui/material';
import { useLazyGetUserDetailsQuery } from '../../api/user';

const PrivateRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const isUserLoggedIn = useSelector(selectLoggedIn);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [trigger, { isLoading, isError, isFetching }] = useLazyGetUserDetailsQuery();

  const checkAuthentication = async () => {
    // Check if the user is logged in

    try {
      if (!isUserLoggedIn) {
        // Check if the authentication token exists in local storage
        const token = localStorage.getItem('token');

        if (!token) {
          // If token is missing, reset authentication state and redirect to login
          dispatch(reset());
          navigate('/login');
          return;
        }

        // If the user is logged in and the token is available,
        // make the getUserProfile API call to ensure the user details are in the Redux store

        const { data: userProfileRes } = await trigger();
        // Dispatch the user details to the Redux store
        dispatch(
          setAuthenticated({
            isLoggedIn: true,
            user: userProfileRes,
            stage: 'AUTHENTICATED',
            userId: userProfileRes?.data?.id
          })
        );
      }
    } catch (error) {
      // Handle error if getUserProfile API call fails
      console.error('Error fetching user profile:', error);
      // Optionally, you can reset the authentication state and redirect to login on error
      dispatch(reset());
      navigate('/login');
    }
  };

  if (isError) navigate('/login');

  useEffect(() => {
    checkAuthentication();
  }, [isUserLoggedIn, dispatch, navigate]);

  if (isLoading || isFetching)
    return (
      <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={true}>
        <CircularProgress color='inherit' />
      </Backdrop>
    );

  return (
    <>
      <Box>{children}</Box>
    </>
  );
};

export default PrivateRoute;

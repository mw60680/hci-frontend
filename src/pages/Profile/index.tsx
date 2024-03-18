import React from 'react';
import { Alert, Box, Button, CircularProgress, Stack, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useGetUserDetailsQuery } from '../../api/user';
import moment from 'moment';

const Profile: React.FC = () => {
  const navigate = useNavigate();

  const { data: profile, isLoading, isError } = useGetUserDetailsQuery();

  if (isLoading) return <CircularProgress />;

  if (isError) return <Alert severity='error'>Error fetching profile</Alert>;

  if (!profile) return <Alert severity='error'>Profile response not available</Alert>;

  const handleLogOut = () => {
    localStorage.removeItem('accessToken');
    navigate('/');
  };

  return (
    <Stack padding='2em' gap='1em'>
      <Typography fontSize='1.25rem' fontWeight={700}>
        {profile.data.name}
      </Typography>

      <Typography fontSize='1.125rem'>{profile.data.mobile}</Typography>

      <Typography fontSize='1.125rem'>{profile.data.email}</Typography>

      <Typography fontSize='1.125rem'>
        {profile.data.dob ? moment(new Date(profile.data.dob)).format('DD MMM YYYY') : ''}
      </Typography>

      <Box>
        <Button variant='contained' onClick={handleLogOut}>
          Log out
        </Button>
      </Box>
    </Stack>
  );
};
export default Profile;

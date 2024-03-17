import React from 'react';
import { Button, Stack } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Profile: React.FC = () => {
  const navigate = useNavigate();
  const handleLogOut = () => {
    localStorage.removeItem('accessToken');
    navigate('/');
  };
  return (
    <>
      <Stack sx={{ alignItems: 'center', marginTop: '10%', marginLeft: '30%' }}>
        <Button variant='contained' sx={{ width: '40ch' }} onClick={handleLogOut}>
          Log out
        </Button>
        <br />
        <br />
      </Stack>
    </>
  );
};
export default Profile;

import { AccountCircle } from '@mui/icons-material';
import DehazeIcon from '@mui/icons-material/Dehaze';
import { AppBar, Box, IconButton, Toolbar, Typography } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Header: React.FC<{setOpenSidebar: () => void }> = ({ setOpenSidebar}) => {
  const navigate = useNavigate();
  const handleLogout = () => {
    console.log('logged out');
  };
  return (
    <>
      <AppBar position='static'>
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <DehazeIcon onClick={setOpenSidebar} sx={{ display: { sm: 'block', md: 'none' }, fontSize: '24px' }} />

          <Typography variant='h6' noWrap component='div' sx={{ cursor: 'pointer' }} onClick={() => navigate('/')}>
            HCL Admin Dashboard
          </Typography>

          <Box sx={{ display: 'flex', columnGap: '12px' }}>
            <IconButton
              size='large'
              edge='end'
              aria-label='account of current user'
              aria-haspopup='true'
              onClick={() => navigate('/profile')}
              color='inherit'>
              <AccountCircle />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {/* <Sidebar setPopupStatus={setOpenSidebar} popupStatus={openSidebar} /> */}
    </>
  );
};

export default Header;

import { AccountCircle } from '@mui/icons-material';
import DehazeIcon from '@mui/icons-material/Dehaze';
import { AppBar, Box, IconButton, Toolbar, Typography } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Header: React.FC<{ setOpenSidebar: () => void }> = ({ setOpenSidebar }) => {
  const navigate = useNavigate();

  return (
    <>
      <AppBar position='static' sx={{ height: '64px' }}>
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <DehazeIcon onClick={setOpenSidebar} sx={{ display: { sm: 'block', md: 'none' }, fontSize: '24px' }} />

          <Typography variant='h6' noWrap component='div' sx={{ cursor: 'pointer' }} onClick={() => navigate('/')}>
            HCI Admin Dashboard
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
    </>
  );
};

export default Header;

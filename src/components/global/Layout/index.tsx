import { Box } from '@mui/material';
import React, { useState } from 'react';
import Footer from '../Footer';
import Header from '../Header';
import Sidebar from '../Sidebar';
import { Outlet } from 'react-router-dom';

const Layout: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [openSidebar, setOpenSidebar] = useState(false);

  return (
    <Box>
      <Header setOpenSidebar={() => setOpenSidebar(true)} />
      <Box sx={{ display: 'flex' }}>
        <Sidebar setPopupStatus={setOpenSidebar} popupStatus={openSidebar} />
        <Box width='100%'>
          {children}
          <Outlet />
        </Box>
      </Box>
      <Footer />
    </Box>
  );
};

export default Layout;

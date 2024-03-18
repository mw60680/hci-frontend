import React, { useState } from 'react';
import { Box, Drawer, useTheme, useMediaQuery } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import navigation from './_nav';
import { renderSideMenu } from './menu';
import { SidebarProps, nav } from './menu/types';

const Sidebar: React.FC<SidebarProps> = ({ popupStatus, setPopupStatus }) => {
  const [selectedItem, setSelectedItem] = useState<nav | null>(null);
  const [selectedParent, setSelectedParent] = useState<string | null>(null);

  const navigate = useNavigate();

  const theme = useTheme();
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));

  const toggleSidebar = () => {
    setPopupStatus(false);
  };

  const handleItemClick = (item: nav, parentText: string) => {
    toggleSidebar();
    setSelectedItem(item);
    setSelectedParent(parentText);
    navigate(item.link);
  };

  return isTablet ? (
    <Drawer open={popupStatus} onClose={toggleSidebar} anchor='left'>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          width: 200,
          backgroundColor: theme.palette.primary.main,
          boxShadow:
            '0px 2px 4px -1px rgba(0,0,0,0.2), 0px 4px 5px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12);'
        }}
        role='presentation'>
        {renderSideMenu(navigation, selectedParent, setSelectedParent, handleItemClick, selectedItem)}
      </Box>
    </Drawer>
  ) : (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        width: 250,
        backgroundColor: theme.palette.primary.main,
        height: 'calc(100vh-64px)',
        '-webkit-box-shadow': '7px 1px 13px -4px rgba(71,70,71,0.49)',
        '-moz-box-shadow': '7px 1px 13px -4px rgba(71,70,71,0.49)',
        boxShadow: '7px 1px 13px -4px rgba(71,70,71,0.49)'
      }}
      role='presentation'>
      {renderSideMenu(navigation, selectedParent, setSelectedParent, handleItemClick, selectedItem)}
    </Box>
  );
};

export default Sidebar;

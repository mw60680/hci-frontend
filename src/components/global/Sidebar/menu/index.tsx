import './menu.css';
import React from 'react';
import { Box, Typography, Collapse, IconButton, useTheme } from '@mui/material';
import { ExpandMore } from '@mui/icons-material';
import { nav } from './types';

interface NavItem {
  text: string;
  icon: React.ElementType;
  children?: nav[];
}

export const renderSideMenu = (
  nav: NavItem[],
  parentText: string | null,
  setSelectedParent: (parent: string | null) => void,
  handleItemClick: (i: nav, value: string) => void,
  selectedItem: nav | null
) => {
  const theme = useTheme();
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', padding: 0 }}>
      {nav.map((item) => (
        <React.Fragment key={item.text}>
          <Box
            onClick={() => {
              if (parentText === item.text) {
                setSelectedParent(null);
              } else {
                setSelectedParent(item.text);
              }
            }}
            style={{
              display: 'flex',
              alignItems: 'center',
              padding: '12px',
              backgroundColor: selectedItem === item ? theme.palette.primary.light : theme.palette.primary.main,
              color: '#fff',
              cursor: 'pointer',
              userSelect: 'none'
            }}>
            <Typography fontWeight='700'>{item.text}</Typography>
            {/* {item.icon && <item.icon />} */}
            <IconButton
              sx={{
                marginLeft: 'auto',
                transform: parentText === item.text ? 'rotate(180deg)' : 'none',
                transition: 'transform 0.3s'
              }}>
              <ExpandMore sx={{ color: '#fff' }} />
            </IconButton>
          </Box>
          <Collapse in={parentText === item.text}>
            {item.children &&
              item.children.map((child: { text: string; link: string; icon?: React.ElementType }) => (
                <Box
                  key={child.text}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleItemClick(child, item.text);
                  }}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    padding: '12px',
                    backgroundColor: selectedItem === child ? theme.palette.primary.light : theme.palette.primary.main,
                    color: '#e9ecef',
                    fontSize: '14px',
                    cursor: 'pointer',
                    userSelect: 'none',
                    pl: 4
                  }}>
                  <Typography>{child.text}</Typography>
                </Box>
              ))}
          </Collapse>
        </React.Fragment>
      ))}
    </Box>
  );
};

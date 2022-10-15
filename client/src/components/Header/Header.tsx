import { FC } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

export const Header: FC = () => {
  return (
    <AppBar position="relative">
      <Toolbar sx={{ margin: 'auto' }}>
        <Typography variant="h1" sx={{ fontSize: '60px' }}>
          Heroes App
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

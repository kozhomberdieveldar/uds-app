import React from 'react';
import { BottomNavigation, BottomNavigationAction } from '@mui/material';
import { Home, People, Login } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

function BottomNav() {
  const [value, setValue] = React.useState(0);
  const navigate = useNavigate();

  const handleChange = (event, newValue) => {
    setValue(newValue);
    if (newValue === 0) navigate('/');
    if (newValue === 1) navigate('/clients');
    if (newValue === 2) navigate('/login');
  };

  return (
    <BottomNavigation
      value={value}
      onChange={handleChange}
      sx={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: '#5e35b1',
        color: 'white',
      }}
    >
      <BottomNavigationAction label="Главная" icon={<Home />} />
      <BottomNavigationAction label="Клиенты" icon={<People />} />
      <BottomNavigationAction label="Войти" icon={<Login />} />
    </BottomNavigation>
  );
}

export default BottomNav;



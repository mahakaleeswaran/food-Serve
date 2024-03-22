import React from 'react';
import Box from '@mui/material/Box';
import { useNavigate } from 'react-router-dom';

function AppBar() {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate('/login');
  };

  const handleTitleClick = (e) => {
    console.log(e)
    navigate('/');
    console.log('Title clicked');
  };

  const handleRegisterClick = () => {
    navigate('/register');
  };

  const buttonStyles = {
    fontFamily: "'Times New Roman', Serif",
    width: '100px',
    border: '1px solid black',
    background: 'white',
    cursor: 'pointer',
    padding: '5px',
    margin: '5px',
    borderRadius: '5px',
    fontWeight: 'bold',
    color: 'black',
  };

  return (
    <Box
      sx={{
        bgcolor: '#282828',
        height: '50px',
        width: '100%',
        padding: '0 20px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        boxSizing: 'border-box',
        '@media (max-width: 700px)': {
          flexDirection: 'column',
          height: 'auto',
        },
      }}
    >
      <h3 style={{ color: 'white', margin: 0, cursor: 'pointer' }}>Food Serve</h3>
      <Box sx={{ display: 'flex' }}>
      <button onClick={handleTitleClick} style={buttonStyles}>
          Home
        </button>
        <button onClick={handleLoginClick} style={buttonStyles}>
          Login
        </button>
        <button onClick={handleRegisterClick} style={buttonStyles}>
          Register
        </button>
      </Box>
    </Box>
  );
}

export default AppBar;

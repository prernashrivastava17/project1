import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '53ch',
      '&:focus': {
        width: '53ch',
      },
    },
  },
}));


export default function WebAppBar() {


  const handleLoginAccount = () => {

    return (<div>
      LOGIN | SIGNUP
    </div>)

  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" style={{ background: '#000' }}>
        <Toolbar>
          {/* <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton> */}
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <div style={{ width: '28%', fontSize: '25px', fontWeight: 'ui-monospace', display: 'flex', alignItems: 'center', height: '100%', letterSpacing: 3, fontFamily: "'Maven Pro', sans-serif'" }} >
              <img src='/images/1.png' alt='logo' width={'60px'} />
             
            </div>
          </Typography>

          <div style={{ width: '62%', display: 'flex', alignItems: 'center' }} >
              <Search style={{ width: '70%' }}>
                <SearchIconWrapper>
                  <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase
                  placeholder="What are you looking for ?"
                  inputProps={{ 'aria-label': 'search' }}
                   width='100%'
                  //onChange={handleSearch}
                />
              </Search>
            </div>
          <div
              //onClick={handleClick}
              style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', cursor: 'pointer', width: '10%', fontSize: '12px', fontWeight: 500 }}>
              {handleLoginAccount()}
            </div>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
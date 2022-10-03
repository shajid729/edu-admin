import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import {Box, Toolbar, IconButton, Typography, Menu, Container, Avatar, Button, Tooltip, MenuItem, useMediaQuery} from '@mui/material';
import {Menu as MenuIcon} from '@mui/icons-material';

const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

const Nav = ({setActiveNav}) => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const isMobile = useMediaQuery('(max-width:1000px)')

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="sticky" top='0' sx={{boxShadow:'0 1px 3px 0 rgb(0 0 0 / 0.1)', bgcolor: 'white'}} className='py-[10px] w-full'>
      <Container maxWidth="xl">
        <Toolbar sx={{justifyContent: 'flex-end'}} disableGutters>
          {isMobile && <Box sx={{ flexGrow: 1, display: 'flex' }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={()=>setActiveNav({left: true})}
              sx={{bgcolor:'none', borderColor:'#000'}}
            >
              <MenuIcon sx={{color:'black'}} />
            </IconButton>
          </Box>}
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Sharp" src="#" sx={{bgcolor:'gray'}} />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Nav;

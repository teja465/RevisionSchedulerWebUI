import * as React from 'react';
import { useState , useEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import NotificationsIcon from '@mui/icons-material/Notifications';
import './responsivenavbar.css'
import { useSelector, useDispatch } from 'react-redux';
import store from '../../store';
import { ContactlessOutlined } from '@mui/icons-material';
import {deleteAllCookies} from "../../utils/CookieManager"

const ResponsiveAppBar = () => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [settings, setSettings] = useState(['foo']);
  const [currentUser, setCurrentUser] = useState(store.getState().user);

  const LOGOUT ="Logout"
  const LOGIN ="Login"
  const SIGNUP ="Signup"
  const MY_LEARNINGS = "My Learnings"
  const [pages, setPages] = useState([MY_LEARNINGS,])



  const PageToUrlMappings={
    'My Learnings':'my-learnings',
    'Profile':'profile',
    'Login' :"login",
    "Signup":"signup"
  }

  const unsubscribe = store.subscribe(
    ()=>{
      console.log("Subscribe() in navbar")
      const currentUser = store.getState().user
      setCurrentUser(currentUser)
      if (currentUser.isLoggedIn){
        console.log('user is logged in subscribe()')
        setSettings(["Profile",LOGOUT])
      }
      else{
        console.log('user is not logged in subscribe()')
        setSettings([LOGIN])

      }
    }
  )
  useEffect(() => {
    console.log(" Navbar Use effect function()")
    if ( ! currentUser.isLoggedIn){
      setSettings([LOGIN,SIGNUP])
      setPages([LOGIN,SIGNUP])
    }
    else {
      setSettings(["Profile" ,LOGOUT])
    }

  },[])
  
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
    console.log("clicked handleCloseNavMenu ")
  };

  const handleCloseUserMenu = (e) => {
    console.log("clicked ",e);
  };
  const handlePageClick=(page)=>{
    if (page ==LOGOUT) {
      handleLogoutClick()
      alert("Logged out user")
      return ;
    }
    console.log(PageToUrlMappings)
    console.log("clicked page in navbar ",page ,`${PageToUrlMappings[page]}`)
    window.location.replace(`${PageToUrlMappings[page]}`)
  }

  const handleLogoutClick=()=>{
    deleteAllCookies()
    // redirect user to home page 
    window.location.replace("/");
  }

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            Revise
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} >
                  <Typography textAlign="center" >
                    {page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            LOGO
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={()=>{handlePageClick(page)}}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {page}
              </Button>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            {currentUser.userEmail}&nbsp;

            <NotificationsIcon fontSize='large' className="navbar_notifications" />
          </Box>
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
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
                <MenuItem key={setting} onClick={(e)=>handlePageClick(setting)}>
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
export default ResponsiveAppBar;

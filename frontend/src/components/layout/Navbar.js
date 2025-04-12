import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Button, 
  Box, 
  Container,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  useMediaQuery,
  useTheme
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { Menu as MenuIcon, CheckCircleOutline, FormatListBulleted, Add } from '@mui/icons-material';
import { motion } from 'framer-motion';

const StyledLink = styled(Link)(({ theme }) => ({
  textDecoration: 'none',
  color: 'inherit',
}));

const StyledButton = styled(Button)(({ theme, active }) => ({
  marginLeft: theme.spacing(2),
  fontWeight: active === 'true' ? 700 : 500,
  '&:after': active === 'true' ? {
    content: '""',
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '100%',
    height: '3px',
    backgroundColor: theme.palette.secondary.main,
    borderRadius: '3px 3px 0 0',
  } : {},
}));

const LogoContainer = styled(motion.div)({
  display: 'flex',
  alignItems: 'center',
});

const Navbar = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [drawerOpen, setDrawerOpen] = useState(false);
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path ? 'true' : 'false';
  };

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setDrawerOpen(open);
  };

  const navItems = [
    { name: 'Home', path: '/', icon: <FormatListBulleted /> },
    { name: 'Add Todo', path: '/add', icon: <Add /> }
  ];

  const drawer = (
    <Box 
      sx={{ width: 250 }} 
      role="presentation" 
      onClick={toggleDrawer(false)} 
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        {navItems.map((item) => (
          <ListItem 
            button 
            key={item.name} 
            component={Link} 
            to={item.path}
            sx={{ 
              backgroundColor: isActive(item.path) === 'true' ? 'rgba(99, 102, 241, 0.08)' : 'transparent',
              borderLeft: isActive(item.path) === 'true' ? `4px solid ${theme.palette.primary.main}` : 'none',
              paddingLeft: isActive(item.path) === 'true' ? '12px' : '16px'
            }}
          >
            <Box sx={{ mr: 2, color: isActive(item.path) === 'true' ? theme.palette.primary.main : 'inherit' }}>
              {item.icon}
            </Box>
            <ListItemText 
              primary={item.name} 
              primaryTypographyProps={{ 
                fontWeight: isActive(item.path) === 'true' ? 600 : 400
              }}
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <AppBar position="sticky" color="default" elevation={1} sx={{ backgroundColor: 'white' }}>
      <Container maxWidth="lg">
        <Toolbar disableGutters>
          <LogoContainer
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <CheckCircleOutline color="primary" sx={{ mr: 1 }} />
            <Typography 
              variant="h6" 
              component={Link} 
              to="/" 
              sx={{ 
                flexGrow: 1, 
                fontWeight: 700, 
                color: theme.palette.primary.main,
                textDecoration: 'none'
              }}
            >
              TaskMaster
            </Typography>
          </LogoContainer>

          <Box sx={{ flexGrow: 1 }} />

          {isMobile ? (
            <>
              <IconButton
                edge="start"
                color="inherit"
                aria-label="menu"
                onClick={toggleDrawer(true)}
              >
                <MenuIcon />
              </IconButton>
              <Drawer
                anchor="right"
                open={drawerOpen}
                onClose={toggleDrawer(false)}
              >
                {drawer}
              </Drawer>
            </>
          ) : (
            <Box sx={{ display: 'flex' }}>
              {navItems.map((item) => (
                <StyledButton 
                  key={item.name}
                  color="inherit" 
                  component={StyledLink} 
                  to={item.path}
                  active={isActive(item.path)}
                  startIcon={item.icon}
                >
                  {item.name}
                </StyledButton>
              ))}
            </Box>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
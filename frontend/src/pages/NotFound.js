import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Container, 
  Typography, 
  Button, 
  Box, 
  Paper 
} from '@mui/material';
import { 
  SentimentVeryDissatisfied as SadIcon,
  Home as HomeIcon 
} from '@mui/icons-material';
import { motion } from 'framer-motion';

const NotFound = () => {
  return (
    <Container 
      maxWidth="sm" 
      sx={{ 
        py: 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 'calc(100vh - 64px)'
      }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Paper
          sx={{
            p: 5,
            borderRadius: 2,
            textAlign: 'center',
            backgroundColor: 'background.paper',
          }}
          elevation={1}
        >
          <motion.div
            initial={{ y: -20 }}
            animate={{ y: [0, -10, 0] }}
            transition={{ 
              y: {
                duration: 1.5,
                repeat: Infinity,
                repeatType: 'reverse',
                ease: 'easeInOut'
              }
            }}
          >
            <SadIcon 
              color="primary" 
              sx={{ 
                fontSize: 120,
                mb: 2,
                opacity: 0.8
              }} 
            />
          </motion.div>
          
          <Typography 
            variant="h3" 
            component="h1" 
            gutterBottom
            sx={{ fontWeight: 700 }}
          >
            404
          </Typography>
          
          <Typography 
            variant="h5" 
            gutterBottom
            sx={{ fontWeight: 500, mb: 2 }}
          >
            Page Not Found
          </Typography>
          
          <Typography 
            variant="body1" 
            color="text.secondary"
            sx={{ mb: 4 }}
          >
            The page you're looking for doesn't exist or has been moved.
          </Typography>
          
          <Button 
            variant="contained" 
            color="primary" 
            size="large"
            component={Link} 
            to="/"
            startIcon={<HomeIcon />}
          >
            Go Home
          </Button>
        </Paper>
      </motion.div>
    </Container>
  );
};

export default NotFound;
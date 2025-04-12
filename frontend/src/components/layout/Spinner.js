import React from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';
import { motion } from 'framer-motion';

const Spinner = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '50vh',
      }}
      component={motion.div}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <CircularProgress size={60} thickness={4} color="primary" />
      <Typography
        variant="body1"
        color="text.secondary"
        sx={{ mt: 2 }}
      >
        Loading...
      </Typography>
    </Box>
  );
};

export default Spinner;
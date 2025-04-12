import React, { useEffect } from 'react';
import { Alert as MuiAlert, Snackbar, Slide } from '@mui/material';
import { useTodoContext } from '../../context/TodoContext';
import { motion, AnimatePresence } from 'framer-motion';

const SlideTransition = (props) => {
  return <Slide {...props} direction="down" />;
};

const Alert = () => {
  const { error, clearError } = useTodoContext();
  const [open, setOpen] = React.useState(false);

  useEffect(() => {
    if (error) {
      setOpen(true);
      // Clear error after 5 seconds
      const timer = setTimeout(() => {
        clearError();
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [error, clearError]);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
    clearError();
  };

  if (!error) return null;

  // Handle array of errors
  const displayError = Array.isArray(error) ? error.join(', ') : error;

  return (
    <AnimatePresence>
      {error && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          <Snackbar
            open={open}
            autoHideDuration={5000}
            onClose={handleClose}
            TransitionComponent={SlideTransition}
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          >
            <MuiAlert
              elevation={6}
              variant="filled"
              severity="error"
              onClose={handleClose}
              sx={{ width: '100%' }}
            >
              {displayError}
            </MuiAlert>
          </Snackbar>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Alert;
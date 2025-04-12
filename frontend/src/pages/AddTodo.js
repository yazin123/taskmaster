import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Container, 
  Paper, 
  Typography, 
  TextField, 
  Button, 
  Box, 
  FormControl, 
  InputLabel, 
  Select, 
  MenuItem,
  Divider,
  FormHelperText,
  IconButton
} from '@mui/material';
import { 
  Save as SaveIcon, 
  ArrowBack as ArrowBackIcon,
  RadioButtonUnchecked as PendingIcon,
  Schedule as InProgressIcon,
  CheckCircle as CheckCircleIcon
} from '@mui/icons-material';
import Alert from '../components/layout/Alert';
import { useTodoContext } from '../context/TodoContext';
import { motion } from 'framer-motion';

const AddTodo = () => {
  const { createTodo, loading } = useTodoContext();
  const navigate = useNavigate();

  const [todo, setTodo] = useState({
    title: '',
    description: '',
    status: 'pending'
  });

  const [errors, setErrors] = useState({
    title: ''
  });

  const { title, description, status } = todo;

  const validateTitle = (value) => {
    if (!value.trim()) {
      return 'Title is required';
    }
    return '';
  };

  const onChange = (e) => {
    const { name, value } = e.target;
    
    setTodo({ ...todo, [name]: value });
    
    if (name === 'title') {
      setErrors({
        ...errors,
        title: validateTitle(value)
      });
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    
    // Validate form
    const titleError = validateTitle(title);
    if (titleError) {
      setErrors({
        ...errors,
        title: titleError
      });
      return;
    }
    
    try {
      await createTodo(todo);
      navigate('/');
    } catch (err) {
      // Error is handled in context and displayed via Alert
    }
  };

  const getStatusIcon = (statusValue) => {
    switch (statusValue) {
      case 'pending':
        return <PendingIcon color="warning" />;
      case 'in-progress':
        return <InProgressIcon color="primary" />;
      case 'completed':
        return <CheckCircleIcon color="success" />;
      default:
        return null;
    }
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
          <IconButton 
            onClick={() => navigate('/')}
            sx={{ mr: 2 }}
            color="inherit"
          >
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="h5" component="h1" sx={{ fontWeight: 600 }}>
            Create New Task
          </Typography>
        </Box>
        
        <Alert />
        
        <Paper 
          elevation={1} 
          sx={{ 
            p: 4, 
            borderRadius: 2 
          }}
          component="form"
          onSubmit={onSubmit}
        >
          <TextField
            label="Title"
            name="title"
            value={title}
            onChange={onChange}
            fullWidth
            margin="normal"
            variant="outlined"
            required
            error={!!errors.title}
            helperText={errors.title}
            sx={{ mb: 3 }}
          />
          
          <TextField
            label="Description"
            name="description"
            value={description}
            onChange={onChange}
            fullWidth
            margin="normal"
            variant="outlined"
            multiline
            rows={4}
            placeholder="Add details about your task..."
            sx={{ mb: 3 }}
          />
          
          <FormControl fullWidth margin="normal" sx={{ mb: 4 }}>
            <InputLabel id="status-label">Status</InputLabel>
            <Select
              labelId="status-label"
              name="status"
              value={status}
              onChange={onChange}
              label="Status"
              renderValue={(selected) => (
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Box sx={{ mr: 1 }}>{getStatusIcon(selected)}</Box>
                  {selected.charAt(0).toUpperCase() + selected.slice(1).replace('-', ' ')}
                </Box>
              )}
            >
              <MenuItem value="pending">
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <PendingIcon color="warning" sx={{ mr: 1 }} />
                  Pending
                </Box>
              </MenuItem>
              <MenuItem value="in-progress">
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <InProgressIcon color="primary" sx={{ mr: 1 }} />
                  In Progress
                </Box>
              </MenuItem>
              <MenuItem value="completed">
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <CheckCircleIcon color="success" sx={{ mr: 1 }} />
                  Completed
                </Box>
              </MenuItem>
            </Select>
            <FormHelperText>Select the current status of your task</FormHelperText>
          </FormControl>
          
          <Divider sx={{ my: 2 }} />
          
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, mt: 2 }}>
            <Button 
              variant="outlined" 
              onClick={() => navigate('/')}
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              variant="contained" 
              color="primary" 
              disabled={loading || !!errors.title}
              startIcon={<SaveIcon />}
            >
              {loading ? 'Creating...' : 'Create Task'}
            </Button>
          </Box>
        </Paper>
      </motion.div>
    </Container>
  );
};

export default AddTodo;
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
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
  IconButton,
  Backdrop,
  CircularProgress
} from '@mui/material';
import { 
  Save as SaveIcon, 
  ArrowBack as ArrowBackIcon,
  RadioButtonUnchecked as PendingIcon,
  Schedule as InProgressIcon,
  CheckCircle as CheckCircleIcon,
  Delete as DeleteIcon
} from '@mui/icons-material';
import Alert from '../components/layout/Alert';
import Spinner from '../components/layout/Spinner';
import { useTodoContext } from '../context/TodoContext';
import { motion } from 'framer-motion';

const EditTodo = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { currentTodo, getTodo, updateTodo, deleteTodo, loading, clearCurrent } = useTodoContext();
  
  const [todo, setTodo] = useState({
    title: '',
    description: '',
    status: 'pending'
  });
  
  const [isLoading, setIsLoading] = useState(true);
  const [errors, setErrors] = useState({
    title: ''
  });
  const [deleteLoading, setDeleteLoading] = useState(false);

  useEffect(() => {
    // Always fetch the todo when the component mounts or id changes
    const fetchTodo = async () => {
      setIsLoading(true);
      await getTodo(id);
    };
    
    fetchTodo();
    
    // Clean up function
    return () => clearCurrent();
    // eslint-disable-next-line
  }, [id]);

  // Update form when currentTodo changes
  useEffect(() => {
    if (currentTodo) {
      setTodo({
        title: currentTodo.title,
        description: currentTodo.description || '',
        status: currentTodo.status
      });
      setIsLoading(false);
    }
  }, [currentTodo]);

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
      await updateTodo(id, todo);
      navigate('/');
    } catch (err) {
      // Error is handled in context and displayed via Alert
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      setDeleteLoading(true);
      await deleteTodo(id);
      navigate('/');
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

  if (isLoading || loading || !currentTodo) {
    return <Spinner />;
  }

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
          <Typography variant="h5" component="h1" sx={{ fontWeight: 600, flexGrow: 1 }}>
            Edit Task
          </Typography>
          <Button 
            variant="outlined" 
            color="error"
            onClick={handleDelete}
            startIcon={<DeleteIcon />}
            disabled={deleteLoading}
          >
            Delete
          </Button>
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
              {loading ? 'Updating...' : 'Update Task'}
            </Button>
          </Box>
        </Paper>
      </motion.div>
      
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={deleteLoading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </Container>
  );
};

export default EditTodo;
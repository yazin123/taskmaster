import React, { useEffect } from 'react';
import { 
  Container, 
  Typography, 
  Box, 
  Button, 
  Paper,
  Fab,
  useTheme,
  Divider
} from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import TodoItem from '../components/todos/TodoItem';
import TodoFilter from '../components/todos/TodoFilter';
import Spinner from '../components/layout/Spinner';
import Alert from '../components/layout/Alert';
import { useTodoContext } from '../context/TodoContext';
import { motion } from 'framer-motion';

const Home = () => {
  const { todos, loading, getTodos, filterStatus } = useTodoContext();
  const theme = useTheme();

  useEffect(() => {
    getTodos();
    // eslint-disable-next-line
  }, []);

  const getFilteredTodos = () => {
    if (filterStatus === 'all') {
      return todos;
    }
    return todos.filter(todo => todo.status === filterStatus);
  };

  const filteredTodos = getFilteredTodos();

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  if (loading) {
    return <Spinner />;
  }

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Box sx={{ mb: 4, textAlign: 'center' }}>
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Typography 
            variant="h4" 
            component="h1" 
            gutterBottom
            sx={{ fontWeight: 700 }}
          >
            My Tasks
          </Typography>
          <Typography 
            variant="subtitle1" 
            color="text.secondary"
            sx={{ mb: 3 }}
          >
            Organize, track, and manage your tasks efficiently
          </Typography>
        </motion.div>
      </Box>
      
      <Alert />
      
      <TodoFilter />
      
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
      >
        {filteredTodos.length === 0 ? (
          <Paper 
            sx={{ 
              py: 5, 
              px: 3, 
              textAlign: 'center',
              borderRadius: 2,
              backgroundColor: 'rgba(0, 0, 0, 0.02)'
            }}
            component={motion.div}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <Typography variant="h6" color="text.secondary" gutterBottom>
              No tasks found
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              {filterStatus === 'all' 
                ? "You don't have any tasks yet. Create your first task to get started!" 
                : `You don't have any ${filterStatus} tasks. Change the filter or add a new task.`}
            </Typography>
            <Button 
              variant="contained" 
              color="primary" 
              component={Link} 
              to="/add"
              startIcon={<AddIcon />}
            >
              Create New Task
            </Button>
          </Paper>
        ) : (
          <Box>
            {filteredTodos.map(todo => (
              <TodoItem key={todo._id} todo={todo} />
            ))}
          </Box>
        )}
      </motion.div>
      
      {/* Floating Action Button for adding new todo */}
      <Fab 
        color="secondary" 
        aria-label="add" 
        component={Link}
        to="/add"
        sx={{ 
          position: 'fixed', 
          bottom: 24, 
          right: 24,
        }}
      >
        <AddIcon />
      </Fab>
    </Container>
  );
};

export default Home;
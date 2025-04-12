import React from 'react';
import { 
  Box, 
  ToggleButtonGroup, 
  ToggleButton, 
  useMediaQuery, 
  useTheme,
  Tabs,
  Tab,
  Paper
} from '@mui/material';
import { 
  RadioButtonUnchecked as PendingIcon,
  Schedule as InProgressIcon,
  CheckCircle as CheckCircleIcon,
  FormatListBulleted as AllIcon
} from '@mui/icons-material';
import { useTodoContext } from '../../context/TodoContext';
import { motion } from 'framer-motion';

const TodoFilter = () => {
  const { filterStatus, filterTodos } = useTodoContext();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleFilterChange = (event, newFilter) => {
    if (newFilter !== null) {
      filterTodos(newFilter);
    }
  };

  if (isMobile) {
    return (
      <Paper
        elevation={0}
        sx={{ 
          borderRadius: 2,
          mb: 3,
          overflow: 'hidden'
        }}
        component={motion.div}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
      >
        <Tabs
          value={filterStatus}
          onChange={handleFilterChange}
          variant="fullWidth"
          indicatorColor="primary"
          textColor="primary"
          aria-label="todo status filter tabs"
        >
          <Tab 
            icon={<AllIcon />} 
            label="All" 
            value="all"
            sx={{ minHeight: '64px' }}
          />
          <Tab 
            icon={<PendingIcon />} 
            label="Pending" 
            value="pending"
            sx={{ minHeight: '64px' }}
          />
          <Tab 
            icon={<InProgressIcon />} 
            label="In Progress" 
            value="in-progress"
            sx={{ minHeight: '64px' }}
          />
          <Tab 
            icon={<CheckCircleIcon />} 
            label="Completed" 
            value="completed"
            sx={{ minHeight: '64px' }}
          />
        </Tabs>
      </Paper>
    );
  }

  return (
    <Box 
      sx={{ mb: 3, display: 'flex', justifyContent: 'center' }}
      component={motion.div}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.1 }}
    >
      <ToggleButtonGroup
        value={filterStatus}
        exclusive
        onChange={handleFilterChange}
        aria-label="todo status filter"
        sx={{ 
          '& .MuiToggleButtonGroup-grouped': {
            border: 1,
            borderColor: 'divider',
            px: 3,
            py: 1
          }
        }}
      >
        <ToggleButton value="all" aria-label="all todos">
          <AllIcon sx={{ mr: 1 }} />
          All
        </ToggleButton>
        <ToggleButton value="pending" aria-label="pending todos">
          <PendingIcon sx={{ mr: 1 }} color="warning" />
          Pending
        </ToggleButton>
        <ToggleButton value="in-progress" aria-label="in progress todos">
          <InProgressIcon sx={{ mr: 1 }} color="primary" />
          In Progress
        </ToggleButton>
        <ToggleButton value="completed" aria-label="completed todos">
          <CheckCircleIcon sx={{ mr: 1 }} color="success" />
          Completed
        </ToggleButton>
      </ToggleButtonGroup>
    </Box>
  );
};

export default TodoFilter;
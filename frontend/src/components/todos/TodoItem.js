import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Card, 
  CardContent, 
  Typography, 
  Box, 
  Chip, 
  IconButton, 
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  CardActionArea
} from '@mui/material';
import { 
  Edit as EditIcon, 
  Delete as DeleteIcon, 
  MoreVert as MoreVertIcon,
  CheckCircle as CheckCircleIcon,
  RadioButtonUnchecked as PendingIcon,
  Schedule as InProgressIcon
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { styled } from '@mui/material/styles';
import { useTodoContext } from '../../context/TodoContext';

const StatusChip = styled(Chip)(({ theme, status }) => {
  const statusColors = {
    'pending': {
      bgcolor: theme.palette.warning.light,
      color: theme.palette.warning.dark
    },
    'in-progress': {
      bgcolor: theme.palette.primary.light,
      color: theme.palette.primary.dark
    },
    'completed': {
      bgcolor: theme.palette.success.light,
      color: theme.palette.success.dark
    }
  };

  return {
    ...statusColors[status],
    fontWeight: 500,
    '& .MuiChip-icon': {
      color: 'inherit'
    }
  };
});

const TodoCard = styled(motion(Card))(({ theme }) => ({
  marginBottom: theme.spacing(2),
  borderRadius: theme.shape.borderRadius,
  transition: 'all 0.3s ease',
  '&:hover': {
    boxShadow: theme.shadows[3],
    transform: 'translateY(-2px)'
  }
}));

const TodoItem = ({ todo }) => {
  const { deleteTodo } = useTodoContext();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDelete = (e) => {
    e.stopPropagation();
    handleClose();
    deleteTodo(todo._id);
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'pending':
        return <PendingIcon />;
      case 'in-progress':
        return <InProgressIcon />;
      case 'completed':
        return <CheckCircleIcon />;
      default:
        return <PendingIcon />;
    }
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <TodoCard
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <CardActionArea>
        <CardContent>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
            <Box>
              <Typography variant="h6" component="h3" sx={{ fontWeight: 600, mb: 1 }}>
                {todo.title}
              </Typography>
              
              <StatusChip 
                label={todo.status} 
                status={todo.status}
                size="small"
                icon={getStatusIcon(todo.status)}
              />
            </Box>
            
            <IconButton 
              aria-label="more options"
              aria-controls="todo-menu"
              aria-haspopup="true"
              onClick={handleClick}
              size="small"
              sx={{ ml: 1 }}
            >
              <MoreVertIcon />
            </IconButton>
            
            <Menu
              id="todo-menu"
              anchorEl={anchorEl}
              keepMounted
              open={open}
              onClose={handleClose}
              onClick={(e) => e.stopPropagation()}
            >
              <MenuItem 
                component={Link} 
                to={`/edit/${todo._id}`}
                onClick={handleClose}
              >
                <ListItemIcon>
                  <EditIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText>Edit</ListItemText>
              </MenuItem>
              <MenuItem onClick={handleDelete}>
                <ListItemIcon>
                  <DeleteIcon fontSize="small" color="error" />
                </ListItemIcon>
                <ListItemText primaryTypographyProps={{ color: 'error' }}>
                  Delete
                </ListItemText>
              </MenuItem>
              
            </Menu>
          </Box>
          
          {todo.description && (
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              {todo.description}
            </Typography>
          )}
          
          <Box 
            sx={{ 
              display: 'flex', 
              justifyContent: 'flex-end',
              color: 'text.secondary',
              fontSize: '0.75rem',
              mt: 1
            }}
          >
            <Typography variant="caption" sx={{ mr: 2 }}>
              Created: {formatDate(todo.createdAt)}
            </Typography>
            
            {todo.updatedAt !== todo.createdAt && (
              <Typography variant="caption">
                Updated: {formatDate(todo.updatedAt)}
              </Typography>
            )}
          </Box>
        </CardContent>
      </CardActionArea>
    </TodoCard>
  );
};

export default TodoItem;
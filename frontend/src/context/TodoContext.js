import React, { createContext, useReducer, useContext } from 'react';
import axios from 'axios';

// Create context
const TodoContext = createContext();

// Initial state
const initialState = {
  todos: [],
  currentTodo: null,
  loading: false,
  error: null,
  filterStatus: 'all'
};

// Reducer function
const todoReducer = (state, action) => {
  switch (action.type) {
    case 'GET_TODOS_REQUEST':
    case 'GET_TODO_REQUEST':
    case 'CREATE_TODO_REQUEST':
    case 'UPDATE_TODO_REQUEST':
    case 'DELETE_TODO_REQUEST':
      return {
        ...state,
        loading: true,
        error: null
      };
    case 'GET_TODOS_SUCCESS':
      return {
        ...state,
        loading: false,
        todos: action.payload
      };
    case 'GET_TODO_SUCCESS':
      return {
        ...state,
        loading: false,
        currentTodo: action.payload
      };
    case 'CREATE_TODO_SUCCESS':
      return {
        ...state,
        loading: false,
        todos: [...state.todos, action.payload]
      };
    case 'UPDATE_TODO_SUCCESS':
      return {
        ...state,
        loading: false,
        todos: state.todos.map(todo => 
          todo._id === action.payload._id ? action.payload : todo
        ),
        currentTodo: null
      };
    case 'DELETE_TODO_SUCCESS':
      return {
        ...state,
        loading: false,
        todos: state.todos.filter(todo => todo._id !== action.payload)
      };
    case 'TODO_ERROR':
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    case 'CLEAR_CURRENT':
      return {
        ...state,
        currentTodo: null
      };
    case 'SET_CURRENT':
      return {
        ...state,
        currentTodo: action.payload
      };
    case 'FILTER_TODOS':
      return {
        ...state,
        filterStatus: action.payload
      };
    case 'CLEAR_ERROR':
      return {
        ...state,
        error: null
      };
    default:
      return state;
  }
};

// Provider component
export const TodoProvider = ({ children }) => {
  const [state, dispatch] = useReducer(todoReducer, initialState);
  const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

  // Get all todos
  const getTodos = async () => {
    try {
      dispatch({ type: 'GET_TODOS_REQUEST' });
      
      const res = await axios.get(`${API_URL}/todos`);
      
      dispatch({ 
        type: 'GET_TODOS_SUCCESS',
        payload: res.data.data
      });
    } catch (err) {
      dispatch({ 
        type: 'TODO_ERROR',
        payload: err.response ? err.response.data.error : 'Server Error'
      });
    }
  };

  // Get single todo
  const getTodo = async (id) => {
    try {
      // Only dispatch loading if we don't already have this todo
      if (!state.currentTodo || state.currentTodo._id !== id) {
        dispatch({ type: 'GET_TODO_REQUEST' });
      }
      
      const res = await axios.get(`${API_URL}/todos/${id}`);
      
      dispatch({ 
        type: 'GET_TODO_SUCCESS',
        payload: res.data.data
      });
      
      return res.data.data;
    } catch (err) {
      dispatch({ 
        type: 'TODO_ERROR',
        payload: err.response ? err.response.data.error : 'Server Error'
      });
      throw err;
    }
  };

  // Create todo
  const createTodo = async (todo) => {
    try {
      dispatch({ type: 'CREATE_TODO_REQUEST' });
      
      const res = await axios.post(`${API_URL}/todos`, todo);
      
      dispatch({ 
        type: 'CREATE_TODO_SUCCESS',
        payload: res.data.data
      });
      
      return res.data.data;
    } catch (err) {
      dispatch({ 
        type: 'TODO_ERROR',
        payload: err.response ? err.response.data.error : 'Server Error'
      });
      throw err;
    }
  };

  // Update todo
  const updateTodo = async (id, todo) => {
    try {
      dispatch({ type: 'UPDATE_TODO_REQUEST' });
      
      const res = await axios.put(`${API_URL}/todos/${id}`, todo);
      
      dispatch({ 
        type: 'UPDATE_TODO_SUCCESS',
        payload: res.data.data
      });
      
      return res.data.data;
    } catch (err) {
      dispatch({ 
        type: 'TODO_ERROR',
        payload: err.response ? err.response.data.error : 'Server Error'
      });
      throw err;
    }
  };

  // Delete todo
  const deleteTodo = async (id) => {
    try {
      dispatch({ type: 'DELETE_TODO_REQUEST' });
      
      await axios.delete(`${API_URL}/todos/${id}`);
      
      dispatch({ 
        type: 'DELETE_TODO_SUCCESS',
        payload: id
      });
    } catch (err) {
      dispatch({ 
        type: 'TODO_ERROR',
        payload: err.response ? err.response.data.error : 'Server Error'
      });
    }
  };

  // Set current todo
  const setCurrent = (todo) => {
    dispatch({ type: 'SET_CURRENT', payload: todo });
  };

  // Clear current todo
  const clearCurrent = () => {
    dispatch({ type: 'CLEAR_CURRENT' });
  };

  // Filter todos
  const filterTodos = (status) => {
    dispatch({ type: 'FILTER_TODOS', payload: status });
  };

  // Clear error
  const clearError = () => {
    dispatch({ type: 'CLEAR_ERROR' });
  };

  return (
    <TodoContext.Provider
      value={{
        todos: state.todos,
        currentTodo: state.currentTodo,
        loading: state.loading,
        error: state.error,
        filterStatus: state.filterStatus,
        getTodos,
        getTodo,
        createTodo,
        updateTodo,
        deleteTodo,
        setCurrent,
        clearCurrent,
        filterTodos,
        clearError
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};

// Custom hook to use the todo context
export const useTodoContext = () => {
  const context = useContext(TodoContext);
  if (context === undefined) {
    throw new Error('useTodoContext must be used within a TodoProvider');
  }
  return context;
};
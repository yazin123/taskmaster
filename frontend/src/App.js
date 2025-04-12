import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, CssBaseline } from '@mui/material';
import Navbar from './components/layout/Navbar';
import Home from './pages/Home';
import AddTodo from './pages/AddTodo';
import EditTodo from './pages/EditTodo';
import NotFound from './pages/NotFound';
import { TodoProvider } from './context/TodoContext';
import theme from './theme';
import './App.css';

function App() {
  return (
    <TodoProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <div className="App">
            <Navbar />
            <div className="container">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/add" element={<AddTodo />} />
                <Route path="/edit/:id" element={<EditTodo />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </div>
          </div>
        </Router>
      </ThemeProvider>
    </TodoProvider>
  );
}

export default App;
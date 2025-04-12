# TaskMaster - Modern MERN Stack Todo Application

A sleek, full-stack todo application built with the MERN stack (MongoDB, Express.js, React, Node.js) and enhanced with Material UI and animations.

![TaskMaster App](https://via.placeholder.com/800x400.png?text=TaskMaster+App)

## Features

- Create, read, update, and delete tasks
- Filter tasks by status (pending, in-progress, completed)
- Modern, responsive design with animations
- Material UI components for a polished user interface
- State management with Context API
- RESTful API with Express
- MongoDB for data storage

## Tech Stack

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose

### Frontend
- React
- React Router
- Context API for state management
- Material UI
- Framer Motion for animations
- Axios for API requests

## Requirements

- Node.js (v14+)
- MongoDB (local or Atlas)

## Installation & Setup

### Clone the repository

```bash
git clone <your-repo-url>
cd taskmaster
```

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the backend directory with the following variables:
```
PORT=5000
MONGO_URI=mongodb://localhost:27017/todo-app
```

> Note: If you're using MongoDB Atlas, replace the MONGO_URI with your connection string.

4. Start the backend server:
```bash
npm run dev
```

The backend server should start on port 5000.

### Frontend Setup

1. Open a new terminal and navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
npm install @mui/material @emotion/react @emotion/styled @mui/icons-material framer-motion react-beautiful-dnd styled-components --legacy-peer-deps
```

3. Create a `.env` file in the frontend directory with the following variables:
```
REACT_APP_API_URL=http://localhost:5000/api
```

4. Start the frontend development server:
```bash
npm start
```

The frontend application should start on port 3000 and automatically open in your browser.

## API Endpoints

- `GET /api/todos`: Get all todos
- `GET /api/todos/:id`: Get a specific todo
- `POST /api/todos`: Create a new todo
- `PUT /api/todos/:id`: Update an existing todo
- `DELETE /api/todos/:id`: Delete a todo

## Project Structure

```
taskmaster/
├── backend/               # Backend code
│   ├── controllers/       # Request handlers
│   ├── models/            # MongoDB schemas
│   ├── routes/            # API routes
│   ├── .env               # Environment variables
│   ├── package.json       # Backend dependencies
│   └── server.js          # Entry point
├── frontend/              # Frontend code
│   ├── public/            # Static files
│   ├── src/               # React source code
│   │   ├── components/    # Reusable components
│   │   │   ├── layout/    # Layout components
│   │   │   └── todos/     # Todo-specific components
│   │   ├── context/       # Context API
│   │   ├── pages/         # Page components
│   │   ├── App.js         # Main component
│   │   ├── theme.js       # Material UI theme
│   │   └── index.js       # Entry point
│   ├── .env               # Environment variables
│   └── package.json       # Frontend dependencies
└── README.md              # Project documentation
```

## UI/UX Features

- **Modern Design System**: Clean interface with consistent typography and spacing
- **Animations**: Smooth transitions and micro-interactions using Framer Motion
- **Responsive Layout**: Works seamlessly on desktop, tablet, and mobile devices
- **Status Indicators**: Visual cues for different task statuses
- **Custom Theme**: Cohesive color scheme and visual language
- **Interactive Components**: Cards with hover effects, animated buttons, and more

## Future Enhancements

- User authentication and personal task lists
- Due dates and reminders
- Task categories and tags
- Search functionality
- Drag-and-drop reordering
- Dark mode toggle
- Task priority levels
- Subtasks and checklists

## License

MIT- yazin

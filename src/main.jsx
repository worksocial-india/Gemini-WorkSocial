import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App.jsx';
import Dashboard from './Dashboard.jsx'; // Import the new page
import './index.css';

// Define the routes for your application
const router = createBrowserRouter([
  {
    path: "/", // The homepage
    element: <App />,
  },
  {
    path: "/dashboard", // The new dashboard page
    element: <Dashboard />,
  },
  // You can add more pages here later
  // { path: "/about", element: <AboutPage /> },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
import React from 'react';
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from 'react-router-dom';
import Root from './routes/root';
import ErrorPage from './views/error-page';
import Contact from './views/contact';
import Login from './views/login.tsx';
import Home from './views/home.tsx';
import Blik from './views/blik.tsx';
import Transfer from './views/transfer.tsx';

const App = () => {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Root />,
      errorElement: <ErrorPage />,
      children: [
        {
          path: '/',
          element: <Navigate to="/home" replace />,
        },
        {
          path: 'home',
          element: <Home />,
        },
        {
          path: 'transfer',
          element: <Transfer />,
        },
        {
          path: 'blik',
          element: <Blik />,
        },
      ],
    },
    {
      path: '/login',
      element: <Login />,
    },
  ]);

  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
};

export default App;

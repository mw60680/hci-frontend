import { Navigate, useRoutes } from 'react-router-dom';
import AddUser from '../pages/users/AddUser';
import Login from '../pages/Login';
import Profile from '../pages/Profile';
import Layout from '../components/global/Layout';
import React from 'react';
import PrivateRoute from './PrivateRoutes';
import UpdateUser from '../components/UpdateUser';
import UsersList from '../pages/users/UsersList';
import ClientList from '../pages/client/ClientList';
import AddClient from '../pages/client/AddClient';
import UpdateClient from '../pages/client/UpdateClient';
import ClientDetails from '../pages/client/ClientDetails.tsx';

const routesMap = [
  {
    path: '/',
    element: (
      <Layout>
        <PrivateRoute>
          <Navigate to='/profile' replace />
        </PrivateRoute>
      </Layout>
    )
  },
  {
    path: '/profile',
    element: (
      <Layout>
        <PrivateRoute>
          <Profile />
        </PrivateRoute>
      </Layout>
    )
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/users',
    element: <Layout />,
    children: [
      {
        path: '',
        element: (
          <PrivateRoute>
            <UsersList />
          </PrivateRoute>
        )
      },
      {
        path: 'add',
        element: (
          <PrivateRoute>
            <AddUser />
          </PrivateRoute>
        )
      },
      {
        path: ':uuid',
        element: (
          <PrivateRoute>
            <UpdateUser />
          </PrivateRoute>
        )
      }
    ]
  },
  {
    path: '/clients',
    element: <Layout />,
    children: [
      {
        path: '',
        element: (
          <PrivateRoute>
            <ClientList />
          </PrivateRoute>
        )
      },
      {
        path: 'add',
        element: (
          <PrivateRoute>
            <AddClient />
          </PrivateRoute>
        )
      },
      {
        path: ':uuid',
        element: (
          <PrivateRoute>
            <UpdateClient />
          </PrivateRoute>
        )
      },
      {
        path: 'details/:uuid',
        element: (
          <PrivateRoute>
            <ClientDetails />
          </PrivateRoute>
        )
      }
    ]
  },
  {
    path: '*',
    element: (
      <Layout>
        <div>Page Not Found</div>
      </Layout>
    )
  }
];

const MyRoutes: React.FC = () => {
  return useRoutes(routesMap);
};

export default MyRoutes;

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
import VendorList from '../pages/vendor/VendorList';
import VendorDetails from '../pages/vendor/VendorDetails';
import AddVendor from '../pages/vendor/AddVendor';
import UpdateVendor from '../pages/vendor/UpdateVendor';
import OrdersList from '../pages/orders/OrdersList';
import CreateOrder from '../pages/orders/CreateOrder';
import EditOrder from '../pages/orders/EditOrder';

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
    path: '/vendors',
    element: <Layout />,
    children: [
      {
        path: '',
        element: (
          <PrivateRoute>
            <VendorList />
          </PrivateRoute>
        )
      },
      {
        path: 'add',
        element: (
          <PrivateRoute>
            <AddVendor />
          </PrivateRoute>
        )
      },
      {
        path: ':uuid',
        element: (
          <PrivateRoute>
            <UpdateVendor />
          </PrivateRoute>
        )
      },
      {
        path: 'details/:uuid',
        element: (
          <PrivateRoute>
            <VendorDetails />
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
    path: '/orders',
    element: <Layout />,
    children: [
      {
        path: '',
        element: (
          <PrivateRoute>
            <OrdersList />
          </PrivateRoute>
        )
      },
      {
        path: 'create',
        element: (
          <PrivateRoute>
            <CreateOrder />
          </PrivateRoute>
        )
      },
      {
        path: ':uuid',
        element: (
          <PrivateRoute>
            <EditOrder />
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

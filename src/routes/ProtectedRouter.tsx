import React from 'react';
import HomePage from '../components/Home';
import Loginpage from '../pages/Login';
import Layout from '../components/global/Layout';

const ProtectedRouter: React.FC = () => {
  const hasToken = localStorage.getItem('accessToken');
  return hasToken ? (
    <Layout>
      <HomePage />
    </Layout>
  ) : (
    <Loginpage />
  );
};
export default ProtectedRouter;

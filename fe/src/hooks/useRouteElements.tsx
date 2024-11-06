import { Navigate, Outlet, useRoutes } from 'react-router-dom';
import MainLayout from '../components/layouts';
import Admin from '../pages/admin';
import Home from '../pages/home';
import Login from '../pages/login';
import Profile from '../pages/profile';
import Register from '../pages/register';
import { useLoginState } from '../providers/LoginStateProvider';
import { useProfileState } from '../providers/ProfileProvider';

const AdminRoute = () => {
  const { role } = useProfileState();
  return role == 'admin' ? <Outlet /> : <Navigate to={'/'} />;
};

const RequireLoginRoute = () => {
  const { isLogin } = useLoginState();
  return isLogin ? <Outlet /> : <Navigate to={'/'} />;
};

export default function useRouteElements() {
  const routeElements = useRoutes([
    {
      path: '/',
      element: (
        <MainLayout>
          <Home />
        </MainLayout>
      ),
    },
    {
      path: '/register',
      element: <Register />,
    },
    {
      path: '/login',
      element: <Login />,
    },
    {
      path: '',
      element: (
        <MainLayout>
          <RequireLoginRoute />
        </MainLayout>
      ),
      children: [
        {
          path: '/profile',
          element: <Profile />,
        },
      ],
    },
    {
      path: '',
      element: <AdminRoute />,
      children: [
        {
          path: '/admin',
          element: <Admin />,
        },
      ],
    },
  ]);
  return routeElements;
}

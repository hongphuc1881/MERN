import { Navigate, Outlet, useRoutes } from 'react-router-dom';
import Home from '../pages/home';
import Login from '../pages/login';
import Profile from '../pages/profile';
import Register from '../pages/register';
import { useProfileState } from '../providers/ProfileProvider';

const PrivateRoute = () => {
  const { role } = useProfileState();
  return role == 'admin' ? <Outlet /> : <Navigate to={'/'} />;
};

export default function useRouteElements() {
  const routeElements = useRoutes([
    {
      path: '/',
      element: <Home />,
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
      element: <PrivateRoute />,
      children: [
        {
          path: '/profile',
          element: <Profile />,
        },
      ],
    },
  ]);
  return routeElements;
}

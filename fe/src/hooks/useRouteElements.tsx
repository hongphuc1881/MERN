import { useRoutes } from 'react-router-dom';
import Home from '../pages/home';
import Login from '../pages/login';
import Register from '../pages/register';

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
  ]);
  return routeElements;
}

import useRouteElements from './hooks/useRouteElements';
import { LoginStateProvider } from './providers/LoginStateProvider';

function App() {
  const routeElements = useRouteElements();
  return (
    <div>
      <LoginStateProvider
        loginState={{ isLogin: !!localStorage.getItem('token') }}
      >
        {routeElements}
      </LoginStateProvider>
    </div>
  );
}

export default App;

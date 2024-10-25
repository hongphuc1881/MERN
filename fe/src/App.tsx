import useRouteElements from './hooks/useRouteElements';
import { LoginStateProvider } from './providers/LoginStateProvider';
import { ProfileStateProvider } from './providers/ProfileProvider';

function App() {
  const routeElements = useRouteElements();
  return (
    <div>
      <LoginStateProvider
        loginState={{ isLogin: !!localStorage.getItem('token') }}
      >
        <ProfileStateProvider
          profileState={{
            role: 'admin',
          }}
        >
          {routeElements}
        </ProfileStateProvider>
      </LoginStateProvider>
    </div>
  );
}

export default App;

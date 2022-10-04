import { withAuthenticationRequired } from '@auth0/auth0-react';

const ProtectedRoute: React.FC<{ component: React.FC }> = ({ component }) => {
  const Component = withAuthenticationRequired(component, {
    onRedirecting: () => <div>Loading...</div>,
  });

  return <Component />;
};

export default ProtectedRoute;

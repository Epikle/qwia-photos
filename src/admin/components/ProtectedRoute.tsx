import { withAuthenticationRequired } from '@auth0/auth0-react';

import LoadingSpinner from '../../shared/components/UI/LoadingSpinner';

const ProtectedRoute: React.FC<{ component: React.FC }> = ({ component }) => {
  const Component = withAuthenticationRequired(component, {
    onRedirecting: () => <LoadingSpinner />,
  });

  return <Component />;
};

export default ProtectedRoute;

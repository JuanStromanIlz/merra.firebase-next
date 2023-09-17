import { useRouter } from 'next/router';
import { useContext, useEffect } from 'react';
import { Admin } from 'src/contexts/AdminContext';

const withAuth = (Component) => {
  const Auth = (props) => {
    const router = useRouter();
    const { user } = useContext(Admin);

    useEffect(() => {
      if (!user) {
        return router.push('/');
      }
    }, [router, user]);

    return <Component {...props} />;
  };

  return Auth;
};

export default withAuth;

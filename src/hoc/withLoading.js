import { Center, Img } from '@chakra-ui/react';
import { useContext } from 'react';
import { Admin } from 'src/contexts/AdminContext';

const withLoading = (Component, override) => {
  const Loading = (props) => {
    const { loading } = useContext(Admin);

    if (override || loading) {
      return (
        <Center w={'100vw'} h={'100vh'}>
          <Img src='/heart.svg' w={'20%'} />
        </Center>
      );
    }

    return <Component {...props} />;
  };

  return Loading;
};

export default withLoading;

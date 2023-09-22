import { Button, Center, Stack } from '@chakra-ui/react';
import React, { useContext } from 'react';
import { Admin } from '../../contexts/AdminContext';

const Login = () => {
  const { signIn, signOut, user } = useContext(Admin);

  return (
    <Center w={'100vw'} h={'100vh'}>
      <Button colorScheme='brand' onClick={user ? signOut : signIn}>
        login
      </Button>
    </Center>
  );
};

export default Login;

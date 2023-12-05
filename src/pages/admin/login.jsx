import { Button, Center } from '@chakra-ui/react';
import React, { useContext } from 'react';
import { Admin } from '../../contexts/AdminContext';
import { NextSeo } from 'next-seo';

const Login = () => {
  const { signIn, signOut, user } = useContext(Admin);

  return (
    <>
      <NextSeo title={`Ingresar | Merra Marie`} defaultTitle='Merra Marie' />
      <Center w={'100vw'} h={'100vh'}>
        <Button colorScheme='brand' onClick={user ? signOut : signIn}>
          {user ? 'signOut' : 'signIn'}
        </Button>
      </Center>
    </>
  );
};

export default Login;

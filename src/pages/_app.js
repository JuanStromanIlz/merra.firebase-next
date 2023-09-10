import React, { useEffect } from 'react';
import '@fontsource/poppins';
import '@fontsource/open-sans';
import '../components/FolderForm/content-style.css';
import { useRouter } from 'next/router';
import {
  Box,
  Center,
  ChakraProvider,
  Container,
  CSSReset,
  Img,
} from '@chakra-ui/react';
import AdminContext from '../contexts/AdminContext';
import theme from '../theme';
import { useBoolean } from '@chakra-ui/react';

function MyApp({ Component, pageProps }) {
  const [loading, { on, off }] = useBoolean(false);
  const { events } = useRouter();

  useEffect(() => {
    events.on('routeChangeStart', on);
    events.on('routeChangeComplete', off);
    events.on('routeChangeError', on);
    return () => {
      events.off('routeChangeComplete', off);
    };
  }, [events, on, off]);

  return (
    <ChakraProvider theme={theme}>
      <CSSReset />
      <AdminContext>
        {loading ? (
          <Center w={'100vw'} h={'100vh'}>
            <Img src='/heart.svg' w={'20%'} />
          </Center>
        ) : (
          <Box px={3} pb={3}>
            <Component {...pageProps} />
          </Box>
        )}
      </AdminContext>
    </ChakraProvider>
  );
}

export default MyApp;

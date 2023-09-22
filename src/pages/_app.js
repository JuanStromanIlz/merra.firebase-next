import React, { useEffect } from 'react';
import '@fontsource/poppins';
import '@fontsource/open-sans';
import '../components/FolderForm/content-style.css';
import { useRouter } from 'next/router';
import {
  Center,
  ChakraProvider,
  CSSReset,
  DarkMode,
  Img,
  keyframes,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import AdminContext from '../contexts/AdminContext';
import theme from '../theme';
import { useBoolean } from '@chakra-ui/react';
import Layout from 'src/components/sections/Layout';

const heartKeyFrames = keyframes`
    0% {
      transform: scale(0.95);
    }
    5% {
      transform: scale(1.1);
    }
    39% {
      transform: scale(0.85);
    }
    45% {
      transform: scale(1);
    }
    60% {
      transform: scale(0.95);
    }
    100% {
      transform: scale(0.9);
    }
`;

const animation = `${heartKeyFrames}  1.2s infinite cubic-bezier(0.215, 0.61, 0.355, 1)`;

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
      <DarkMode />
      <AdminContext>
        {loading ? (
          <Center w={'100vw'} h={'100vh'}>
            <Img
              src='/heart.svg'
              w={'20%'}
              as={motion.img}
              animation={animation}
            />
          </Center>
        ) : (
          <Layout>
            <Component {...pageProps} />
          </Layout>
        )}
      </AdminContext>
    </ChakraProvider>
  );
}

export default MyApp;

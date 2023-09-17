import { Box, Flex, LinkOverlay } from '@chakra-ui/react';
import NextLink from 'next/link';
import React from 'react';
import Title from '../Title';

const Layout = ({ children }) => {
  return (
    <Box>
      <Flex
        direction={'row'}
        alignContent={'center'}
        position={'fixed'}
        top={0}
        width={'100%'}
        zIndex={'sticky'}
        px={6}
        py={4}
      >
        <LinkOverlay as={NextLink} href={'/'}>
          <Title fontSize='2xl'>MerraMarie</Title>
        </LinkOverlay>
      </Flex>
      {children}
    </Box>
  );
};

export default Layout;

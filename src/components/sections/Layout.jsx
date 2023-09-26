import { Box, Flex, IconButton, Link } from '@chakra-ui/react';
import NextLink from 'next/link';
import React, { useContext } from 'react';
import { AddIcon } from '@chakra-ui/icons';
import { Admin } from 'src/contexts/AdminContext';
import { useRouter } from 'next/router';

const Layout = ({ children }) => {
  const { user } = useContext(Admin);
  const router = useRouter();

  const onNewPost = () => router.push('/admin/new');

  return (
    <Box>
      <Flex
        as={'header'}
        direction={'row'}
        alignContent={'center'}
        justifyContent={'space-between'}
        alignItems={'center'}
        position={'fixed'}
        top={0}
        width={'100%'}
        zIndex={'sticky'}
        p={3}
      >
        <NextLink href={'/'} passHref>
          <Link fontStyle={'italic'}>MerraMarie</Link>
        </NextLink>
        {user ? (
          <IconButton
            // colorScheme='brand'
            borderWidth={0}
            variant='outline'
            size='sm'
            icon={<AddIcon />}
            onClick={onNewPost}
          />
        ) : undefined}
      </Flex>
      {children}
    </Box>
  );
};

export default Layout;

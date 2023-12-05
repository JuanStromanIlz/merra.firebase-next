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
        position={'sticky'}
        width={'100%'}
        zIndex={'sticky'}
        top={0}
        p={3}
      >
        <NextLink href={'/'} passHref>
          <Link
            fontSize={'xl'}
            fontFamily={'Poppins'}
            fontWeight={'bold'}
            textDecoration={'none'}
            _hover={{
              textDecoration: 'none',
            }}
          >
            MerraMarie
          </Link>
        </NextLink>
        {user ? (
          <IconButton
            borderWidth={0}
            variant='outline'
            size='sm'
            icon={<AddIcon />}
            onClick={onNewPost}
          />
        ) : undefined}
      </Flex>
      <Box px={3} pb={3}>
        {children}
      </Box>
    </Box>
  );
};

export default Layout;

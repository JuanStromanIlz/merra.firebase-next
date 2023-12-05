import { Avatar, Box, Flex, Grid, Link, Text } from '@chakra-ui/react';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import React, { useContext } from 'react';
import { Admin } from 'src/contexts/AdminContext';

const Layout = ({ children }) => {
  const { user, signIn, signOut } = useContext(Admin);
  const { photoURL } = user || {};
  const { route } = useRouter();

  const getRightOption = (r) => {
    if (!user && r.includes('login')) {
      return (
        <Avatar
          ml={'auto'}
          size='xs'
          src={photoURL}
          onClick={user ? signOut : signIn}
          cursor={'pointer'}
        />
      );
    } else if (user && !r.includes('new')) {
      return (
        <NextLink href={'/admin/new'} passHref>
          <Link
            as={'span'}
            textTransform={'uppercase'}
            fontFamily={'Poppins'}
            fontWeight={'bold'}
            marginLeft={'auto'}
            textDecoration={'none'}
            letterSpacing={'0.05rem'}
            _hover={{
              textDecoration: 'none',
            }}
          >
            Nuevo
          </Link>
        </NextLink>
      );
    } else if (user && r.includes('new')) {
      return (
        <Avatar
          ml={'auto'}
          size='xs'
          src={photoURL}
          onClick={user ? signOut : signIn}
          cursor={'pointer'}
        />
      );
    } else {
      return undefined;
    }
  };

  return (
    <Box>
      <Grid
        templateColumns={'1fr 2fr 1fr'}
        as={'header'}
        position={'sticky'}
        width={'100%'}
        zIndex={'sticky'}
        top={0}
        p={3}
      >
        <Text
          as={'span'}
          fontFamily={'Poppins'}
          fontWeight={'bold'}
          textTransform={'uppercase'}
          textDecoration={'none'}
          letterSpacing={'0.05rem'}
          marginRight={'auto'}
          _hover={{
            textDecoration: 'none',
          }}
        >
          Menu
        </Text>
        <Box mx={'auto'}>
          <NextLink href={'/'} passHref>
            <Link
              as={'span'}
              textTransform={'uppercase'}
              fontFamily={'Poppins'}
              fontWeight={'bold'}
              textDecoration={'none'}
              letterSpacing={'0.05rem'}
              _hover={{
                textDecoration: 'none',
              }}
            >
              MerraMarie
            </Link>
          </NextLink>
        </Box>
        {getRightOption(route)}
      </Grid>
      <Flex direction={'column'} m={3}>
        {children}
      </Flex>
    </Box>
  );
};

export default Layout;

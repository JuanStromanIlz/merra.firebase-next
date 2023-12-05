import { Box, Grid, Link, Text } from '@chakra-ui/react';
import NextLink from 'next/link';
import React, { useContext } from 'react';
import { Admin } from 'src/contexts/AdminContext';

const Layout = ({ children }) => {
  const { user } = useContext(Admin);

  return (
    <Box>
      <Grid
        templateColumns={'1fr 2fr 1fr'}
        as={'header'}
        position={'sticky'}
        width={'100%'}
        zIndex={'sticky'}
        top={0}
        py={5}
        px={3}
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
        {user ? (
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
        ) : undefined}
      </Grid>
      <Box px={3} pb={3}>
        {children}
      </Box>
    </Box>
  );
};

export default Layout;

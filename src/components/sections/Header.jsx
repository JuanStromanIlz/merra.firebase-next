import { Box, Flex, Heading, LinkOverlay } from '@chakra-ui/react';
import NextLink from 'next/link';
import React from 'react';
import File from '../File';
import Title from '../Title';
import Tags from '../Tags';

const Header = ({ doc }) => {
  const { title = '', tags, files = [{}] } = doc;
  const file = files[0] || {};

  return (
    <Box h={'80vh'} w={'100%'} position={'relative'}>
      <File data={file} w='100%' h='100%' objectFit='cover' />
      <Box
        position={'absolute'}
        inset={0}
        bgGradient={'linear(to-t, blackAlpha.300 0%, transparent 50%)'}
      />
      <Flex
        direction='column'
        position={'absolute'}
        inset={0}
        px={3}
        py={9}
        justifyContent={'space-between'}
      >
        <Tags tags={tags} />
        <LinkOverlay as={NextLink} href={title}>
          <Title as={'h1'} size='4xl' cursor={'pointer'}>
            {title}
          </Title>
        </LinkOverlay>
      </Flex>
    </Box>
  );
};

export default Header;

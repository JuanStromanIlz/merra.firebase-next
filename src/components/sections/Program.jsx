import { Box, Flex, Heading, LinkOverlay } from '@chakra-ui/react';
import NextLink from 'next/link';
import React from 'react';
import Title from '../Title';
import Carrousel from '../Carrousel';
import File from '../File';

const Component = ({ item }) => {
  const { title = '', tags, files = [{}], url } = item;
  const file = files[0] || {};

  return (
    <Box as={'article'} position={'relative'} width='100%' height='100%'>
      <File data={file} objectFit='cover' height='100%' width='100%' />
      <Box
        position={'absolute'}
        inset={0}
        bgGradient={'linear(to-t, blackAlpha.300 0%, transparent 50%)'}
      />
      <Flex direction='column' position={'absolute'} bottom={0} px={6} pb={10}>
        <LinkOverlay as={NextLink} href={url}>
          <Heading as={'h3'} fontSize='3xl' cursor={'pointer'}>
            {title}
          </Heading>
        </LinkOverlay>
      </Flex>
    </Box>
  );
};

const Program = ({ title, posts }) => {
  return (
    <Carrousel items={posts} Component={Component}>
      <Flex
        position={'absolute'}
        top={0}
        width={'100%'}
        px={6}
        py={4}
        bgGradient={'linear(to-b, blackAlpha.300 50%, transparent 100%)'}
      >
        <Title>#{title}</Title>
      </Flex>
    </Carrousel>
  );
};

export default Program;

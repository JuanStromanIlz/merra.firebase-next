import {
  Flex,
  LinkOverlay,
  LinkBox,
  AspectRatio,
  Box,
  Heading,
} from '@chakra-ui/react';
import NextLink from 'next/link';
import React from 'react';
import File from './File';
import Tags from './Tags';

const Post = ({ data }) => {
  const { title, tags, files = [{}] } = data;
  const file = files[0] || {};

  return (
    <LinkBox as={'article'} position={'relative'}>
      <AspectRatio ratio={16 / 9}>
        <File data={file} />
      </AspectRatio>
      <Box
        position={'absolute'}
        inset={0}
        bgGradient={'linear(to-t, blackAlpha.300 0%, transparent 50%)'}
      />
      <Flex direction='column' position={'absolute'} bottom={0} px={3} pb={3}>
        <Heading as={'h3'} size='lg'>
          <LinkOverlay as={NextLink} href={title}>
            {title}
          </LinkOverlay>
        </Heading>
        <Tags tags={tags} />
      </Flex>
    </LinkBox>
  );
};

export default Post;

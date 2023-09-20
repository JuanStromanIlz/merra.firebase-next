import { Flex, LinkOverlay, Box } from '@chakra-ui/react';
import NextLink from 'next/link';
import React from 'react';
import File from './File';
import Tags from './Tags';
import Title from './Title';

const Post = ({ data }) => {
  const { title = '', tags, files = [{}], url } = data;
  const file = files[0] || {};

  return (
    <Box as={'article'} position={'relative'}>
      <LinkOverlay as={NextLink} href={url}>
        <Flex direction={'column'}>
          <Tags tags={tags} mb={1} />
          <File data={file} controls={false} />
          <Title as={'h3'} fontSize={'2xl'} mt={4}>
            {title}
          </Title>
        </Flex>
      </LinkOverlay>
    </Box>
  );
};

export default Post;

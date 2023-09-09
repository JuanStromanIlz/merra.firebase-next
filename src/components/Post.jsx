import { Flex, LinkOverlay, LinkBox } from '@chakra-ui/react';
import NextLink from 'next/link';
import React from 'react';
import Title from './Title';
import File from './File';
import Tags from './Tags';

const Post = ({ data }) => {
  const { title, tags, files = [{}] } = data;
  const file = files[0] || {};

  return (
    <NextLink href={`/${title}`} passHref>
      <LinkBox cursor={'pointer'}>
        <LinkOverlay>
          <Flex direction='column'>
            <Tags tags={tags} mb={3} />
            <File data={file} />
            <Title mt={3}>{title}</Title>
          </Flex>
        </LinkOverlay>
      </LinkBox>
    </NextLink>
  );
};

export default Post;

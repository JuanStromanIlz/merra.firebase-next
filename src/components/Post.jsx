import { Flex, LinkOverlay, Box, Heading, AspectRatio } from '@chakra-ui/react';
import NextLink from 'next/link';
import React from 'react';
import File from './File';
import Tags from './Tags';

const Post = ({ data }) => {
  const { title = '', tags, files = [{}], url } = data;
  const file = files[0] || {};

  return (
    <Box as={'article'} position={'relative'}>
      <LinkOverlay as={NextLink} href={url}>
        <Box>
          <AspectRatio ratio={4 / 5} width={'100%'}>
            <File data={file} controls={false} alignSelf='center' />
          </AspectRatio>
          <Flex
            direction={'column'}
            justifyContent={'center'}
            alignItems={'center'}
            pt={2}
          >
            <Heading as={'h3'} fontSize={'xl'} lineHeight={'120%'}>
              {title}
            </Heading>
            <Tags tags={tags} />
          </Flex>
        </Box>
      </LinkOverlay>
    </Box>
  );
};

export default Post;

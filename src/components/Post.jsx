import { Flex, LinkOverlay, Heading } from '@chakra-ui/react';
import NextLink from 'next/link';
import React from 'react';
import File from './File';

const Post = ({ data }) => {
  const {
    title = '',
    files = [{}],
    description: { blocks = [] } = {},
    url,
  } = data;
  const { data: { file: descriptionFile } = {} } =
    blocks.find(({ type }) => type === 'image') || {};
  const file = files[0];
  const postFilePreview = file || descriptionFile || {};

  return (
    <LinkOverlay as={NextLink} href={url}>
      <Flex flexDirection={'column'}>
        <File
          data={postFilePreview}
          controls={false}
          maxWidth='100%'
          height='auto'
        />
        <Heading as={'h3'} fontSize={'2xl'} lineHeight={'120%'} mt={3}>
          {title}
        </Heading>
      </Flex>
    </LinkOverlay>
  );
};

export default Post;

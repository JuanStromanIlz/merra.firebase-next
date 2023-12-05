import { Flex, LinkOverlay, Text } from '@chakra-ui/react';
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
        <Text fontWeight={'bold'} mt={1}>
          {title}
        </Text>
      </Flex>
    </LinkOverlay>
  );
};

export default Post;

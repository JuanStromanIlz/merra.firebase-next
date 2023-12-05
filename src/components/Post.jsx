import { AspectRatio, Flex, LinkOverlay, Text } from '@chakra-ui/react';
import NextLink from 'next/link';
import React from 'react';
import File from './File';
import Title from './Title';

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
        <AspectRatio ratio={89 / 127}>
          <File
            data={postFilePreview}
            controls={false}
            maxWidth='100%'
            height='auto'
          />
        </AspectRatio>
        <Text mt={2} mb={5} fontFamily={'Poppins'}>
          {title}
        </Text>
      </Flex>
    </LinkOverlay>
  );
};

export default Post;

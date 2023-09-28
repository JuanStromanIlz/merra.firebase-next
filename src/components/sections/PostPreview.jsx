import React from 'react';
import NextLink from 'next/link';
import { Box, LinkOverlay, Text } from '@chakra-ui/react';
import { parse } from 'node-html-parser';
import Header from './Header';

const PostPreview = ({ doc }) => {
  const { description = '', url } = doc;
  const text = parse(description)
    ?.getElementsByTagName('p')
    .filter((tag) => !!tag.textContent.trim().length)[0]?.textContent;

  return (
    <LinkOverlay as={NextLink} href={url}>
      <Box cursor={'pointer'}>
        <Header doc={doc}>
          {text && (
            <Text noOfLines={5} fontSize='md' mt={2} color={'gray.50'}>
              {text}
            </Text>
          )}
        </Header>
      </Box>
    </LinkOverlay>
  );
};

export default PostPreview;

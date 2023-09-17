import React from 'react';
import { Box, Flex, Heading, Link, Text } from '@chakra-ui/react';
import { parse } from 'node-html-parser';
import Header from './Header';

const PostPreview = ({ doc }) => {
  const { description = '' } = doc;
  const text = parse(description)?.getElementsByTagName('p')[0]?.textContent;

  return (
    <Header doc={doc}>
      {text && (
        <Text noOfLines={5} fontSize='md' mt={2}>
          {text}
        </Text>
      )}
    </Header>
  );
};

export default PostPreview;

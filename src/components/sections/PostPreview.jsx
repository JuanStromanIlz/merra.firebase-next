import React from 'react';
import NextLink from 'next/link';
import { Box, LinkOverlay, Text } from '@chakra-ui/react';
import editorjsHTML from 'editorjs-html';
import Header from './Header';
import { Paragraph } from '../TextParse';

const PostPreview = ({ doc }) => {
  const { description: { blocks = [] } = {}, url } = doc;
  const preview = blocks.find(({ type = undefined }) => type === 'paragraph');
  const edjsParser = editorjsHTML({
    paragraph: Paragraph,
  });
  const html = preview && edjsParser.parseBlock(preview);

  return (
    <LinkOverlay as={NextLink} href={url}>
      <Box cursor={'pointer'}>
        <Header doc={doc}>
          {preview && <Box color={'white'}>{html}</Box>}
        </Header>
      </Box>
    </LinkOverlay>
  );
};

export default PostPreview;

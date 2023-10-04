import React, { useEffect, useRef, useState } from 'react';
import NextLink from 'next/link';
import { Box, LinkOverlay, Text } from '@chakra-ui/react';
import editorjsHTML from 'editorjs-html';
import Header from './Header';
import { Prose } from '@nikolovlazar/chakra-ui-prose';
// import { Paragraph } from '../TextParse';

const PostPreview = ({ doc }) => {
  const { description: { blocks = [] } = {}, url } = doc;
  const preview = blocks.find(({ type = undefined }) => type === 'paragraph');
  // const edjsParser = editorjsHTML({
  //   paragraph: Paragraph,
  // });
  // const html = preview && edjsParser.parseBlock(preview);

  const ref = useRef();
  const [html, setHtml] = useState([]);

  useEffect(() => {
    if (!ref.current) {
      const editor = editorjsHTML();
      ref.current = editor;
    }

    if (ref.current && preview) {
      setHtml(ref.current.parseBlock(preview));
    }

    return () => {
      if (ref.current && ref.current.destroy) {
        ref.current.destroy();
      }
    };
  }, [preview]);

  return (
    <LinkOverlay as={NextLink} href={url}>
      <Box cursor={'pointer'}>
        <Header doc={doc}>
          {preview && (
            <Prose
              dangerouslySetInnerHTML={{ __html: html }}
              textAlign={'center'}
              noOfLines={4}
              color={'white'}
            ></Prose>
          )}
        </Header>
      </Box>
    </LinkOverlay>
  );
};

export default PostPreview;

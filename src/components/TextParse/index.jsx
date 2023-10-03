import React, { useEffect, useRef, useState } from 'react';
import editorjsHTML from 'editorjs-html';
import {
  Box,
  Divider,
  Heading,
  ListItem,
  OrderedList,
  Text,
  UnorderedList,
  Link as LinkChakra,
  AspectRatio,
} from '@chakra-ui/react';
import File from './../File';
import { Prose } from '@nikolovlazar/chakra-ui-prose';

const Quote = ({ data }) => {
  const { text, caption } = data;
  return (
    <Box as='blockquote' py={3}>
      {text}
      <Text as='footer' mt={3} fontSize={'sm'} fontWeight={'normal'}>
        {caption}
      </Text>
    </Box>
  );
};

const Delimiter = () => {
  return <Divider />;
};

const Link = ({ data }) => {
  const {
    link,
    meta: { title },
  } = data;
  return <LinkChakra href={link}>{title}</LinkChakra>;
};

const Image = ({ data: { file, caption } }) => {
  return (
    <Box as='figure'>
      <File data={file} />
      <Box as='figcaption' mt={1} fontSize={'sm'}>
        {caption}
      </Box>
    </Box>
  );
};

const Embed = ({ data }) => {
  const { embed, width, height, caption, source } = data;
  return (
    <AspectRatio ratio={width / height}>
      <Box as='iframe' src={embed} title={caption} overflow={'hidden'}></Box>
    </AspectRatio>
  );
};

const TextParse = ({ text }) => {
  const ref = useRef();
  const [html, setHtml] = useState([]);

  useEffect(() => {
    if (!ref.current) {
      const editor = editorjsHTML({
        quote: Quote,
        delimiter: Delimiter,
        // link: Link,
        image: Image,
        embed: Embed,
      });
      ref.current = editor;
    }

    if (ref.current && 'blocks' in text) {
      setHtml(ref.current.parse(text));
    }

    return () => {
      if (ref.current && ref.current.destroy) {
        ref.current.destroy();
      }
    };
  }, [text]);

  return (
    <Prose>
      {html?.map((item, index) => {
        if (typeof item === 'string') {
          return (
            <div dangerouslySetInnerHTML={{ __html: item }} key={index}></div>
          );
        }
        return item;
      })}
    </Prose>
  );
};

export default TextParse;

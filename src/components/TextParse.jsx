import React from 'react';
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
  Flex,
} from '@chakra-ui/react';
import File from './File';

const Header = ({ data }) => {
  const { text, level } = data;
  return <Heading as={`h${level}`}>{text}</Heading>;
};
export const Paragraph = ({ data }) => {
  const { text } = data;
  return <Text>{text}</Text>;
};

const Quote = ({ data }) => {
  const { text, caption } = data;
  return (
    <Box
      as='blockquote'
      // mx={6}
      borderBottomWidth={1}
      borderTopWidth={1}
      borderColor={'brand.500'}
    >
      <Text>{text}</Text>
      <Box as='footer' mt={1} fontSize={'sm'}>
        {caption}
      </Box>
    </Box>
  );
};

const List = ({ data }) => {
  const { style, items = [] } = data;
  const TypeList = style === 'ordered' ? OrderedList : UnorderedList;
  return (
    <TypeList>
      {items.map((i) => (
        <ListItem key={i}>{i}</ListItem>
      ))}
    </TypeList>
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

const TextParse = ({ text }) => {
  const edjsParser = editorjsHTML({
    header: Header,
    paragraph: Paragraph,
    quote: Quote,
    list: List,
    delimiter: Delimiter,
    link: Link,
    image: Image,
    // embed
  });
  const html = edjsParser.parse(text);

  return (
    <Flex direction={'column'} gap={3}>
      {html.map((item, index) => {
        if (typeof item === 'string') {
          return (
            <div dangerouslySetInnerHTML={{ __html: item }} key={index}></div>
          );
        }
        return item;
      })}
    </Flex>
  );
};

export default TextParse;

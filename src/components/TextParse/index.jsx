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
  AspectRatio,
} from '@chakra-ui/react';
import File from './../File';

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

const Embed = ({ data }) => {
  const { embed, width, height, caption, source } = data;
  return (
    <AspectRatio ratio={width / height}>
      <Box as='iframe' src={embed} title={caption} overflow={'hidden'}></Box>
    </AspectRatio>
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
    embed: Embed,
  });
  const html = edjsParser.parse(text);

  return (
    <div>
      {html?.map((item, index) => {
        if (typeof item === 'string') {
          return (
            <div dangerouslySetInnerHTML={{ __html: item }} key={index}></div>
          );
        }
        return item;
      })}
    </div>
  );
};

export default TextParse;

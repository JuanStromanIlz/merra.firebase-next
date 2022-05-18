import React from "react";
import styled from "styled-components";
import {
  Box,
  Heading,
  Link,
  OrderedList,
  UnorderedList,
  Text,
  ListItem,
  Center,
  Flex,
} from "@chakra-ui/react";
import { ExternalLinkIcon } from "@chakra-ui/icons";
import JsxParser from "react-jsx-parser";

const TitleWrapper = styled(Box)`
  .title {
    -webkit-text-stroke: 1.5px #d22d2d;
  }
`;

const CustomTitle = ({ children, ...rest }) => (
  <TitleWrapper>
    <Heading
      fontWeight={"normal"}
      textTransform={"capitalize"}
      color={"transparent"}
      className="title"
      letterSpacing={"wider"}
      my={4}
      {...rest}
    >
      {children}
    </Heading>
  </TitleWrapper>
);

const TextParse = ({ children }) => {
  const heading1Open = "<CustomTitle as='h2' size='2xl'>";
  const heading1Close = "</CustomTitle>";
  const heading2Open = "<CustomTitle as='h3' size='xl'>";
  const heading2Close = "</CustomTitle>";
  const heading3Open = "<CustomTitle as='h4' size='md'>";
  const heading3Close = "</CustomTitle>";
  const linkOpen = "<Link color='red.500' isExternal";
  const linkClose = "<ExternalLinkIcon mx='2px'/></Link>";
  const blockquoteOpen =
    "<Box py={4} px={3} borderRadius='sm' borderColor={'pink.50'} borderLeftWidth={2}>";
  const blockquoteClose = "</Box>";
  const olOpen = "<OrderedList spacing={3}>";
  const olClose = "</OrderedList>";
  const ulOpen = "<UnorderedList spacing={3}>";
  const ulClose = "</UnorderedList>";
  const listItemOpen = "<ListItem>";
  const listItemClose = "</ListItem>";
  const textOpen = "<Text>";
  const textClose = "</Text>";

  const parsedChild = children
    .replace("<h2>", heading1Open)
    .replace("</h2>", heading1Close)
    .replace("<h3>", heading2Open)
    .replace("</h3>", heading2Close)
    .replace("<h4>", heading3Open)
    .replace("</h4>", heading3Close)
    .replace("<a", linkOpen)
    .replace("</a>", linkClose)
    .replace("<blockquote>", blockquoteOpen)
    .replace("</blockquote>", blockquoteClose)
    .replace("<ul>", ulOpen)
    .replace("</ul>", ulClose)
    .replace("<ol>", olOpen)
    .replace("</ol>", olClose)
    .replace("<li>", listItemOpen)
    .replace("</li>", listItemClose)
    .replace("<p>", textOpen)
    .replace("</p>", textClose);

  return (
    <Flex maxWidth={{ base: "100%", lg: "60%" }} direction="column" m={"auto"}>
      <JsxParser
        renderInWrapper={false}
        components={{
          CustomTitle,
          Link,
          ExternalLinkIcon,
          Box,
          OrderedList,
          UnorderedList,
          ListItem,
          Text,
        }}
        jsx={parsedChild}
      />
    </Flex>
  );
};
export default TextParse;

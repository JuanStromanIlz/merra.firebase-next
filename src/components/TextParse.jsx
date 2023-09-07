import React from "react";
import {
  Box,
  Link,
  OrderedList,
  UnorderedList,
  Text,
  ListItem,
} from "@chakra-ui/react";
import { ExternalLinkIcon } from "@chakra-ui/icons";
import JsxParser from "react-jsx-parser";
import Title from "./Title";
import Quote from "./Quote";

const TextParse = ({ children = "" }) => {
  const heading1Open = "<Title as='h2' size='xl'>";
  const heading1Close = "</Title>";
  const heading2Open = "<Title as='h3' size='lg'>";
  const heading2Close = "</Title>";
  const heading3Open = "<Title as='h4' size='sm'>";
  const heading3Close = "</Title>";
  const linkOpen = "<Link color='pink.50' isExternal";
  const linkClose = "</Link>";
  const blockquoteOpen = "<Quote>";
  const blockquoteClose = "</Quote>";
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
    <JsxParser
      renderInWrapper={false}
      components={{
        Quote,
        Title,
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
  );
};
export default TextParse;

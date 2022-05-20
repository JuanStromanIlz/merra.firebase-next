import { Flex, Heading, Link, Wrap, WrapItem } from "@chakra-ui/react";
import { LinkIcon } from "@chakra-ui/icons";
import React from "react";
import Title from "./Title";

const PublicationLink = ({ data: { title, href, keyWords } }) => (
  <Flex direction={"row"} alignItems={"center"}>
    <LinkIcon as={LinkIcon} color="green.500" mr={4} />
    <Flex direction={"column"}>
      <Heading
        as={Link}
        href={href}
        isExternal
        sx={{
          "-webkit-text-stroke": "1.5px",
          "-webkit-text-stroke-color": "#F9ECEC",
        }}
        _hover={{
          "-webkit-text-stroke-color": "#79CD60",
        }}
        fontWeight={"normal"}
        textTransform={"capitalize"}
        color={"transparent"}
      >
        {title}
      </Heading>
      {keyWords && (
        <Wrap>
          {keyWords.map((word) => (
            <WrapItem key={word}>{word}</WrapItem>
          ))}
        </Wrap>
      )}
    </Flex>
  </Flex>
);

export default PublicationLink;

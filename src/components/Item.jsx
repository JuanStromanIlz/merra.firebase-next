import {
  Flex,
  Img,
  LinkOverlay,
  LinkBox,
  Link,
  Box,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import NextLink from "next/link";
import React from "react";
import styled from "styled-components";
import Title from "./Title";

const MediaContainer = styled(Flex)`
  overflow: hidden;
  position: relative;
  aspect-ratio: 7 / 4;
  .image {
    width: 100%;
    height: 100%;
    transition: 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    filter: opacity(0.8);
  }
  @media (hover: hover) {
    :hover {
      .image {
        transform: scale(1.05);
        filter: opacity(1);
      }
    }
  }
`;

const Item = ({ data, href }) => {
  const file = data.files[0];
  return (
    <MediaContainer borderRadius={"md"} cursor={"pointer"}>
      <Flex
        inset={0}
        position={"absolute"}
        zIndex={1}
        pointerEvents="none"
        justifyContent={"center"}
        alignItems={"center"}
        m={4}
      >
        <Title noOfLines={3}>{data.title}</Title>
      </Flex>
      <NextLink href={href} passHref>
        <LinkBox className="image">
          <LinkOverlay className="image">
            {!file.isVideo ? (
              <Img
                src={file.url}
                alt=""
                objectFit={"cover"}
                objectPosition={"center"}
                h={"100%"}
                w={"100%"}
              />
            ) : (
              <Box borderRadius={"md"} overflow={"hidden"}>
                <video c src={file.url} width={"100%"} height="100%" />
              </Box>
            )}
          </LinkOverlay>
        </LinkBox>
      </NextLink>
      {Object.keys(data.keyWords).length > 0 && (
        <Wrap
          position={"absolute"}
          bottom={0}
          px={3}
          py={2}
          flexDirection={"column"}
          color={"pink.50"}
          borderTopRightRadius={"md"}
        >
          {data.keyWords.map((word) => (
            <WrapItem key={word} zIndex={1}>
              <Link
                fontSize={"small"}
                _hover={{ textDecoration: "underline" }}
                textTransform={"capitalize"}
              >
                {word}
              </Link>
            </WrapItem>
          ))}
        </Wrap>
      )}
    </MediaContainer>
  );
};

export default Item;

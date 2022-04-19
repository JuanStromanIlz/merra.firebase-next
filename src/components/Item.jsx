import {
  Flex,
  Heading,
  Img,
  LinkBox,
  LinkOverlay,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import NextLink from "next/link";
import React from "react";
import styled from "styled-components";
import Title from "./Title";

const MediaContainer = styled(Flex)`
  overflow: hidden;
  transition: 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  position: relative;
  aspect-ratio: 7 / 4;
  .image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
    transition: 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  }
  @media (hover: hover) {
    :hover {
      .image {
        transform: scale(1.1);
      }
      .infoWrapper {
        opacity: 0;
      }
    }
  }
`;

const Item = ({ data, href }) => {
  return (
    <LinkBox as={Flex} direction={"column"} cursor={"pointer"}>
      <Flex mb={3} pb={1} borderBottomWidth={0.5} borderColor={"pink.50"}>
        <NextLink href={href} passHref>
          <LinkOverlay>
            <Title as={"h2"} size={"3xl"} letterSpacing={"wider"} isTruncated>
              {data.title}
            </Title>
          </LinkOverlay>
        </NextLink>
      </Flex>
      <MediaContainer borderRadius={"md"}>
        <NextLink href={href} passHref>
          <LinkOverlay w={"100%"} h={"100%"}>
            <Img
              src={data.files.find(({ isVideo }) => isVideo == false).url}
              alt=""
              className="image"
            />
          </LinkOverlay>
        </NextLink>
      </MediaContainer>
      {data.keyWords && (
        <Wrap mt={3}>
          {data.keyWords.map((word) => (
            <WrapItem key={word}>
              <Heading
                fontWeight={"hairline"}
                fontSize={"sm"}
                fontStyle={"italic"}
                borderRadius={"md"}
                borderWidth={0.5}
                borderColor="pink.50"
                px={2}
                py={1}
              >
                #{word}
              </Heading>
            </WrapItem>
          ))}
        </Wrap>
      )}
    </LinkBox>
  );
};

export default Item;

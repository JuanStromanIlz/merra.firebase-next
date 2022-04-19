import React, { useEffect, useState } from "react";
import styled from "styled-components";
import {
  FacebookShareButton,
  FacebookIcon,
  TwitterShareButton,
  TwitterIcon,
  TumblrShareButton,
  TumblrIcon,
  WhatsappShareButton,
  WhatsappIcon,
} from "react-share";
import { Flex, Heading, Slide, useDisclosure, Box } from "@chakra-ui/react";

const Title = styled(Flex)`
  z-index: 1;
  .header__title {
    -webkit-text-stroke: 2px #d22d2d;
    overflow-wrap: break-word;
    pointer-events: none;
    text-transform: capitalize;
  }
  #mediaShare {
    height: 0;
    display: flex;
    flex-direction: row;
    transition: 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    transform: translateX(-500px);
    margin-left: -1rem;
    position: absolute !important;
    button {
      width: fit-content;
      svg {
        width: 45px;
      }
    }
  }
`;

const StickyTitle = ({ isDoc = false, url, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  // useEffect(() => {
  //   if (typeof window !== "undefined") {
  //     if (document.body.offsetHeight <= window.innerHeight) {
  //       setIsOpen(true);
  //     }
  //     const onScroll = () => {
  //       if (!isOpen) {
  //         setIsOpen(
  //           window.innerHeight + window.scrollY >=
  //             (document.body.offsetHeight / 3) * 2
  //         );
  //       }
  //       if (isOpen) {
  //         window.removeEventListener("scroll", onScroll);
  //       }
  //     };
  //     window.addEventListener("scroll", onScroll);
  //   }

  //   return () => window.removeEventListener("scroll", onScroll);
  // }, [isOpen, setIsOpen]);

  return (
    <Title
      direction="column"
      position={isDoc ? "sticky" : "relative"}
      top={0}
      pb={4}
    >
      <Heading
        as={"h1"}
        size={"3xl"}
        fontWeight={"normal"}
        color={"transparent"}
        className="header__title"
      >
        {children}
      </Heading>
      {isDoc && (
        <Box position={"relative"}>
          <Slide direction="left" in={isOpen} id="mediaShare">
            <Flex>
              <Box>
                <FacebookShareButton url={url}>
                  <FacebookIcon
                    iconFillColor="#FAEAEA"
                    bgStyle={{ fill: "transparent" }}
                  />
                </FacebookShareButton>
              </Box>
              <Box>
                <TwitterShareButton url={url}>
                  <TwitterIcon
                    iconFillColor="#FAEAEA"
                    bgStyle={{ fill: "transparent" }}
                  />
                </TwitterShareButton>
              </Box>
              <Box>
                <TumblrShareButton url={url}>
                  <TumblrIcon
                    iconFillColor="#FAEAEA"
                    bgStyle={{ fill: "transparent" }}
                  />
                </TumblrShareButton>
              </Box>
              <Box>
                <WhatsappShareButton url={url}>
                  <WhatsappIcon
                    iconFillColor="#FAEAEA"
                    bgStyle={{ fill: "transparent" }}
                  />
                </WhatsappShareButton>
              </Box>
            </Flex>
          </Slide>
        </Box>
      )}
    </Title>
  );
};

export default StickyTitle;

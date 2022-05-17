import React from "react";
import { Heading, Flex } from "@chakra-ui/react";
import styled from "styled-components";

const TitleContainer = styled(Flex)`
  .title {
    -webkit-text-stroke: 1.5px #d22d2d;
  }
`;

const Title = ({ children, ...rest }) => (
  <TitleContainer
    w={"100%"}
    h={"100%"}
    justifyContent={"center"}
    alignItems={"center"}
  >
    <Heading
      fontWeight={"normal"}
      textTransform={"capitalize"}
      color={"transparent"}
      className="title"
      textAlign={"center"}
      {...rest}
    >
      {children}
    </Heading>
  </TitleContainer>
);

export default Title;

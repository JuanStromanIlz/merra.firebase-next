import React from "react";
import { Heading, Box } from "@chakra-ui/react";
import styled from "styled-components";

const TitleContainer = styled(Box)`
  .title {
    -webkit-text-stroke: 2px #d22d2d;
  }
`;

const Title = ({ children, ...rest }) => (
  <TitleContainer>
    <Heading
      fontWeight={"normal"}
      color={"transparent"}
      className="title"
      {...rest}
    >
      {children}
    </Heading>
  </TitleContainer>
);

export default Title;

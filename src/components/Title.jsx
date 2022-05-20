import React from "react";
import { Heading, Flex } from "@chakra-ui/react";

const Title = ({ children, ...rest }) => (
  <Flex w={"100%"} h={"100%"} justifyContent={"center"} alignItems={"center"}>
    <Heading
      fontWeight={"normal"}
      textTransform={"capitalize"}
      color={"transparent"}
      textAlign={"center"}
      sx={{
        "-webkit-text-stroke": "1.5px #d22d2d",
      }}
      {...rest}
    >
      {children}
    </Heading>
  </Flex>
);

export default Title;

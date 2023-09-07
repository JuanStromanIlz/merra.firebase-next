import React from "react";
import { Heading, Flex } from "@chakra-ui/react";
import { useTheme } from "@chakra-ui/react";

const Title = ({ children, color, ...rest }) => {
  const {
    colors: {
      brand: { 500: brand },
    },
  } = useTheme();
  return (
    // <Flex w={"100%"} h={"100%"} justifyContent={"center"} alignItems={"center"}>
    <Heading
      fontWeight={"normal"}
      textTransform={"capitalize"}
      color={"transparent"}
      // textAlign={"center"}
      sx={{
        "-webkit-text-stroke": `1px ${color || brand}}`,
      }}
      {...rest}
    >
      {children}
    </Heading>
    // </Flex>
  );
};

export default Title;

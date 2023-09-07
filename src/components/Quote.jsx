import { Box } from "@chakra-ui/react";
import React from "react";
import Title from "./Title";

export default function Quote({ children, ...rest }) {
  return (
    <Box
      px={3}
      py={6}
      borderBottomWidth={1}
      borderTopWidth={1}
      borderColor={"brand.500"}
    >
      <Title as="h4" size="lg">
        {children}
      </Title>
    </Box>
  );
}

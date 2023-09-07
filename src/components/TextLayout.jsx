import { Box, Container } from "@chakra-ui/react";
import React from "react";

export default function TextLayout({ children }) {
  return (
    <Container maxW="6xl" px={3}>
      <Box maxW="3xl">
        <main>{children}</main>
      </Box>
    </Container>
  );
}

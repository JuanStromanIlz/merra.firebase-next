import React from "react";
import { Stack } from "@chakra-ui/react";

const PageWrapper = ({ children }) => (
  <Stack px={6} py={3}>
    {children}
  </Stack>
);

export default PageWrapper;

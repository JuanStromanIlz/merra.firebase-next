import React, { Fragment } from "react";
import { Stack } from "@chakra-ui/react";
import Head from "next/head";

const PageWrapper = ({ children, pageTitle = "..." }) => (
  <Fragment>
    <Head>
      <title>{pageTitle.replace(/^\w/, (c) => c.toUpperCase())}</title>
    </Head>
    <Stack px={6} py={3} margin={"auto"} maxWidth={1200}>
      {children}
    </Stack>
  </Fragment>
);

export default PageWrapper;

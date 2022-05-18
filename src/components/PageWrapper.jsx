import React, { Fragment } from "react";
import { Stack } from "@chakra-ui/react";
import Head from "next/head";
import Navbar from "./Navbar";

const PageWrapper = ({ children, pageTitle = "..." }) => (
  <Fragment>
    <Head>
      <title>{pageTitle.replace(/^\w/, (c) => c.toUpperCase())}</title>
    </Head>
    <Navbar py={3} />
    <Stack direction={"column"} px={6} py={3} margin={"auto"} maxWidth={1400}>
      {children}
    </Stack>
  </Fragment>
);

export default PageWrapper;

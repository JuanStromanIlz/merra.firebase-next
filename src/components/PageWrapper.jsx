import React, { Fragment } from "react";
import { Stack } from "@chakra-ui/react";
import Head from "next/head";
import Navbar from "./Navbar";

const PageWrapper = ({ children, pageTitle = "..." }) => (
  <Fragment>
    <Head>
      <title>{pageTitle.replace(/^\w/, (c) => c.toUpperCase())}</title>
    </Head>
    <Stack direction={"column"} px={6} pb={6} margin={"auto"} maxWidth={1400}>
      <Navbar />
      {children}
    </Stack>
  </Fragment>
);

export default PageWrapper;

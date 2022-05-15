import React, { useEffect } from "react";
import "@fontsource/poppins";
import "@fontsource/open-sans";
import { useRouter } from "next/router";
import { ChakraProvider, CSSReset } from "@chakra-ui/react";
import AdminContext from "../contexts/AdminContext";
import theme from "../theme";
import { useBoolean } from "@chakra-ui/react";

function MyApp({ Component, pageProps }) {
  // const [loading, { on, off }] = useBoolean(false);
  // const { events } = useRouter();

  // useEffect(() => {
  //   events.on("routeChangeStart", on);
  //   events.on("routeChangeComplete", off);
  //   events.on("routeChangeError", on);
  //   return () => {
  //     events.off("routeChangeComplete", off);
  //   };
  // }, [events, on, off]);

  return (
    <ChakraProvider theme={theme}>
      <CSSReset />
      <AdminContext>
        <Component {...pageProps} />
      </AdminContext>
    </ChakraProvider>
  );
}

export default MyApp;

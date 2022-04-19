import "@fontsource/poppins";
import "@fontsource/open-sans";

import { ChakraProvider, CSSReset } from "@chakra-ui/react";
import AdminContext from "../contexts/AdminContext";
import theme from "../theme";

function MyApp({ Component, pageProps }) {
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

import { ChakraProvider } from "@chakra-ui/react";
import AdminContext from "../contexts/AdminContext";

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider>
      <AdminContext>
        <Component {...pageProps} />
      </AdminContext>
    </ChakraProvider>
  );
}

export default MyApp;

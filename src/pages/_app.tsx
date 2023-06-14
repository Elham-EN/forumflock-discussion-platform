import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "@/chakra/theme";
import Layout from "@/components/Layout/Layout";
import { RecoilRoot } from "recoil";

// Main Entry point to the Next.js Application (Initially at the beginning it has one
// default page, point to the root url, it defined by a component in index.tsx file)
export default function App({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
      <ChakraProvider theme={theme}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ChakraProvider>
    </RecoilRoot>
  );
}

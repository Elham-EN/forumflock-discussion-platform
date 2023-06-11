import "@fontsource/open-sans/300.css";
import "@fontsource/open-sans/400.css";
import "@fontsource/open-sans/700.css";
import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  colors: {
    brand: {
      100: "#FF0060",
    },
    fonts: {
      body: `'Open Sans', sans-serif`,
    },
  },
  styles: {
    global: () => ({
      body: {
        bg: "gray.200",
        fontFamily: `'Open Sans', sans-serif`,
      },
    }),
  },
  components: {},
});

export default theme;

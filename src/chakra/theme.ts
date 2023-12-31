import "@fontsource/open-sans/300.css";
import "@fontsource/open-sans/400.css";
import "@fontsource/open-sans/700.css";
import { extendTheme } from "@chakra-ui/react";
import { Button } from "./button";
import { Input } from "./Input";

// Feddit Brand color: #8c52ff

const theme = extendTheme({
  colors: {
    brand: {
      100: "#ef476f",
      200: "#ef233c",
      300: "#a663cc",
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
  components: {
    Button,
    Input,
  },
});

export default theme;

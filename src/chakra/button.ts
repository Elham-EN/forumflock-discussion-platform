import { ComponentStyleConfig } from "@chakra-ui/theme";
// import { defineStyleConfig } from "@chakra-ui/theme";

export const Button: ComponentStyleConfig = {
  baseStyle: {
    borderRadius: "15px",
  },

  sizes: {
    sm: {
      fontSize: "8pt",
    },
    md: {
      fontSize: "10pt",
      // height: "28px",
    },
  },

  variants: {
    solid: {
      bg: "brand.100",

      fontSize: "10pt",
      color: "white",
      _focus: {
        boxShadow: "none",
      },
      _hover: {
        bg: "brand.200",
      },
    },
    outline: {
      color: "brand.100",
      border: "1px solid",
      borderColor: "brand.100",
      _hover: {
        bg: "brand.200",
        color: "white",
      },
    },
    oauth: {
      height: "34px",
      border: "1px solid",
      borderColor: "gray.200",
      _hover: {
        bg: "gray.50",
      },
    },
  },
};

// ensures that the component follows the expected structure and
// has the correct props according to the NextPage
import type { NextPage } from "next";
import { Text } from "@chakra-ui/react";

// Root URL (Route or Homepage),
const Home: NextPage = () => {
  return <Text>Hello World</Text>;
};

export default Home;

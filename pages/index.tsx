import type { NextPage } from "next";
import Head from "next/head";
import Map from "../components/Map";
import {
  Text,
  Link,
  Box,
  Center,
  Image,
  Heading,
  Badge,
  Stack,
} from "@chakra-ui/react";

const Home: NextPage = () => {
  return (
    <Box>
      <Head>
        <title>Plugo Vote</title>
        {/* TODO: description & icon*/}
        <meta name="description" content="Plugo Vote" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Map />
    </Box>
  );
};

export default Home;

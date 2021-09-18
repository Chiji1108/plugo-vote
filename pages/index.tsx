import type { NextPage } from "next";
import Head from "next/head";
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
      <Box maxW="xl">
        <Stack p={2} direction="row">
          <Heading
            as="h1"
            size="1xl"
            fontWeight="bold"
            bgGradient="linear(to-l, #7928CA, #FF0080)"
            bgClip="text"
          >
            Plugo Vote
            <Badge ml="2">closed beta</Badge>
          </Heading>
        </Stack>
        <Box pt={28} px={4} pb={24} pos="relative" overflow="hidden">
          <Text fontSize="3xl" fontWeight="black" color="gray.800">
            みんなで作る
            <br />
            EVの街
          </Text>
          <Box pos="absolute" zIndex="-1" bottom="0" right="0" mr="-20" mb="4">
            <Image src="/hero.jpg" alt="hero" h="200px" />
          </Box>
        </Box>
        <Box mt="4" mx="4" mb="6">
          <Text fontSize="xl" color="gray.800">
            EVチャージャー、どこに欲しい？
          </Text>
          <Text fontSize="xs" color="gray.500" mt="2">
            投票結果を踏まえて、
            <br />
            Plugoが新たにEVチャージーを設置します
          </Text>
        </Box>
        <Box mx="4" mt="12">
          <Heading fontSize="xl">都心</Heading>
          <Box bg="gray.200" h="200px" w="100%" borderRadius="md" my="3"></Box>
        </Box>
        <Box>{/* Twitter */}</Box>
      </Box>
    </Box>
  );
};

export default Home;

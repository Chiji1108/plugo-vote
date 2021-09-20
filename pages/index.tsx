import type { NextPage } from "next";
import Head from "next/head";
import {
  Text,
  Box,
  Center,
  Image,
  Heading,
  Badge,
  Stack,
  Button,
} from "@chakra-ui/react";

import queryString from "query-string";

import NextImage from "next/image";
import Link from "next/link";

/*TODO: Topページに設置するマーカー

- みんなのマーカー (cache可能)
- みんなのマーカー & 自分強調表示 (一部cache可能だが、リクエスト違うからお金かかりそう？)

*/
const stringified = queryString.stringifyUrl({
  url: "https://maps.googleapis.com/maps/api/staticmap",
  query: {
    center: "35.68,139.77",
    zoom: 11,
    size: "600x400",
    key: "AIzaSyDKrpVSwOPOReivNxthUGpkgMUQKVhv_F0",
  },
});

const Home: NextPage = () => {
  return (
    <Box>
      <Head>
        <title>Plugo Vote</title>
        {/* TODO: description & icon*/}
        <meta name="description" content="Plugo Vote" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Box maxW="md" mx="auto">
        <Stack p={2} direction="row">
          <Heading
            as="h1"
            size="1xl"
            fontWeight="bold"
            bgGradient="linear(to-l, #7928CA, #FF0080)"
            bgClip="text"
          >
            Plugo Vote
            <Badge ml="2">development</Badge>
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
          <Heading fontSize="xl">
            東京都内
            {/* <Badge ml="2">closed beta</Badge> */}
          </Heading>
          <Link href="/map" passHref>
            <Box
              bg="gray.200"
              h="200px"
              w="100%"
              borderRadius="md"
              overflow="hidden"
              my="3"
              pos="relative"
            >
              <Center h="full">static map with markers</Center>

              <Button
                colorScheme="pink"
                pos="absolute"
                m="3"
                bottom="0"
                right="0"
                bgGradient="linear(to-l, #7928CA, #FF0080)"
              >
                投票する
              </Button>
            </Box>
          </Link>
        </Box>
        <Box height="400px" bgColor="pink.100" mt="12">
          {/* Twitter */}
          Twitterタイムライン
        </Box>
        <Box height="50px" bgColor="blue.100" mt="6">
          share
        </Box>
        <Box height="80px" bgColor="green.100" mt="6">
          footter (プライバシーポリシー, Powered by Plugo)
        </Box>
      </Box>
    </Box>
  );
};

export default Home;

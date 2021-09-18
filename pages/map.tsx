import { useWhyDidYouUpdate } from "@chakra-ui/hooks";
import { Box, Center } from "@chakra-ui/layout";
import { Skeleton } from "@chakra-ui/skeleton";
import { Spinner } from "@chakra-ui/spinner";
import { NextPage } from "next";
import { GoogleMap } from "../components";

import { useGoogleMap } from "../hooks";

const Map: NextPage = () => {
  useWhyDidYouUpdate("Page: Map", {});

  const { loading, error, googleMap } = useGoogleMap();
  if (loading) {
    return (
      <Center w="full" h="100vh">
        <Spinner />
      </Center>
    );
  }
  if (error || !googleMap) {
    return (
      <Center w="full" h="100vh">
        {error}
      </Center>
    );
  }

  return <GoogleMap googleMap={googleMap} />;
};
// const Content = (place: google.maps.places.PlaceResult) => {
//   return <Box>
//     {place.}
//   </Box>
// }

export default Map;

import { useWhyDidYouUpdate } from "@chakra-ui/hooks";
import { Box, Center, Heading, Text } from "@chakra-ui/layout";
import { Skeleton } from "@chakra-ui/skeleton";
import { Spinner } from "@chakra-ui/spinner";
import { collection, onSnapshot, query } from "@firebase/firestore";
import { NextPage } from "next";
import { createContext, useCallback, useEffect, useState } from "react";
import { useAsync, useEffectOnce, useList } from "react-use";
import { GoogleMap } from "../components";
// import { IsNewUserContext } from "../contexts";

// import { useGoogleMap, useSignInAnonymously } from "../hooks";
import { db } from "../utils/firebase";

//TODO: zustand

import { useStore } from "../store";
import {
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
} from "@chakra-ui/react";
import { SearchIcon, CloseIcon } from "@chakra-ui/icons";

// const selector = state => state.init

const Map: NextPage = () => {
  // useWhyDidYouUpdate("Page: Map", {});

  // const initMap = useStore.use.initMap();
  // const map = useStore.use.map;
  const setMapEl = useStore.use.setMapEl();
  const placeResult = useStore.use.placeResult();
  const mapRef = useCallback((node: HTMLElement | null) => {
    if (node !== null) {
      setMapEl(node);
    }
  }, []);

  // const setAutocompleteEl = useStore.use.setAutocompleteEl();
  // const autocompleteRef = useCallback((node: HTMLElement | null) => {
  //   if (node !== null) {
  //     setAutocompleteEl(node);
  //   }
  // }, []);

  // if (google === null)
  //   return (
  //     <Center w="full" h="100vh">
  //       <Spinner />
  //     </Center>
  //   );
  // const [el, setEl] = useState<HTMLElement | null>(null);

  return (
    <Box w="full" h="100vh" pos="relative">
      <Box w="full" h="full" ref={mapRef} />

      <Box m="2" pos="absolute" top="0" left="0" right="0">
        <Box mx="auto" maxW={500} id="autocomplete" />
        {/* <InputGroup>
          <InputLeftElement pointerEvents="none">
            <SearchIcon color="gray.300" />
          </InputLeftElement>
          <Input
            className="first-step"
            ref={inputRef}
            bg="white"
            overflow="hidden"
            shadow="md"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          {query && (
            <InputRightElement
              onClick={() => {
                setQuery("");
                inputRef.current?.focus();
              }}
            >
              <CloseIcon color="gray.300" />
            </InputRightElement>
          )}
        </InputGroup> */}
      </Box>
      <div className="cupertino-pane">
        {placeResult ? (
          <>
            <Heading>{placeResult.name}</Heading>
            <Text>{placeResult.formatted_address}</Text>
          </>
        ) : (
          <></>
        )}
      </div>
    </Box>
  );

  // const [markers, setMarkers] = useList<google.maps.Marker>([]);

  // const { isNewUser } = useSignInAnonymously();

  // const { loading, error, googleMap } = useGoogleMap();

  // useEffect(() => {
  //   const q = query(collection(db, "places"));
  //   const unsub = onSnapshot(q, (querySnapshot) => {
  //     querySnapshot.forEach((doc) => {
  //       const data = doc.data();
  //       console.log(data);
  //     });
  //   });
  //   return () => {
  //     unsub();
  //   };
  // }, []);
  // if (loading) {
  //   return (
  //     <Center w="full" h="100vh">
  //       <Spinner />
  //     </Center>
  //   );
  // }
  // if (error || !googleMap) {
  //   return (
  //     <Center w="full" h="100vh">
  //       {error}
  //     </Center>
  //   );
  // }

  return (
    // <IsNewUserContext.Provider value={isNewUser}>
    // <GoogleMap googleMap={googleMap} />
    // </IsNewUserContext.Provider>
    <div>map</div>
  );
};
// const Content = (place: google.maps.places.PlaceResult) => {
//   return <Box>
//     {place.}
//   </Box>
// }

export default Map;

import { memo, useEffect, useRef, useState } from "react";
import {
  Box,
  Input,
  InputGroup,
  InputLeftElement,
  useWhyDidYouUpdate,
} from "@chakra-ui/react";

import { SearchIcon } from "@chakra-ui/icons";
import { Map } from ".";

type GoogleMapProps = {
  googleMap: typeof google;
};

export const GoogleMap = memo(({ googleMap }: GoogleMapProps) => {
  useWhyDidYouUpdate("GoogleMap", { googleMap });
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [mapContainerEl, setMapContainerEl] = useState<HTMLDivElement>();
  const [inputEl, setInputEl] = useState<HTMLInputElement>();

  useEffect(() => {
    if (!mapContainerRef.current) return;
    setMapContainerEl(mapContainerRef.current);
    return () => {
      setMapContainerEl(undefined);
    };
  }, [mapContainerRef]);

  useEffect(() => {
    if (!inputRef.current) return;
    setInputEl(inputRef.current);
    return () => {
      setInputEl(undefined);
    };
  }, [inputRef]);

  return (
    <>
      <Box w="100%" h="100vh" pos="relative">
        <Box w="100%" h="100%" ref={mapContainerRef} />
        <Box m="2" pos="absolute" top="0" left="0" right="0" zIndex={99999}>
          <InputGroup>
            <InputLeftElement pointerEvents="none">
              <SearchIcon color="gray.300" />
            </InputLeftElement>
            <Input
              ref={inputRef}
              bg="white"
              overflow="hidden"
              shadow="md"
              // value={query}
              // onChange={(e) => setQuery(e.target.value)}
            />
            {/* {inputRef.current?.value && (
            <InputRightElement
              pointerEvents="none"
              // onClick={() => setQuery(undefined)}
              onClick={() => {
                if (inputRef.current) inputRef.current.reset();
              }}
            >
              <CloseIcon color="gray.300" />
            </InputRightElement>
          )} */}
          </InputGroup>
        </Box>
      </Box>
      {mapContainerEl && inputEl && (
        <Map
          googleMap={googleMap}
          mapContainerEl={mapContainerEl}
          inputEl={inputEl}
        />
      )}
    </>
  );
});

GoogleMap.displayName = "GoogleMap";

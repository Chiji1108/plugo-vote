import { memo, useContext, useEffect, useMemo, useRef, useState } from "react";
import {
  Box,
  Input,
  InputGroup,
  InputLeftElement,
  useWhyDidYouUpdate,
  InputRightElement,
  Center,
  Text,
} from "@chakra-ui/react";

import { CloseIcon, SearchIcon } from "@chakra-ui/icons";
import { Map } from ".";
import { useSignInAnonymously } from "../hooks";
// import { Steps, Hints } from "intro.js-react";
import Joyride, { STATUS } from "react-joyride";
// import { IsNewUserContext } from "../contexts";

const steps = [
  {
    target: ".first-step",
    content: <Text>投票したい施設を検索！</Text>,
    disableBeacon: true,
  },
];

type GoogleMapProps = {
  googleMap: typeof google;
};

export const GoogleMap = memo(({ googleMap }: GoogleMapProps) => {
  useWhyDidYouUpdate("GoogleMap", { googleMap });
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  // const mapContainerEl = useMemo(() => {
  //   if (!mapContainerRef.current) return;
  //   return mapContainerRef.current;
  // }, [mapContainerRef]);
  const [mapContainerEl, setMapContainerEl] = useState<HTMLDivElement>();
  const [inputEl, setInputEl] = useState<HTMLInputElement>();

  //TODO: useMemo?

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

  const [query, setQuery] = useState("");

  // const isNewUser = useContext(IsNewUserContext);

  return (
    <>
      {/* {isNewUser && inputRef.current && (
        <Joyride
          steps={steps}
          spotlightPadding={3}
          styles={{
            buttonNext: {
              display: "none",
            },
            buttonClose: {
              display: "none",
            },
            tooltipContent: {
              padding: 10,
            },
            tooltip: {
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            },
          }}
          callback={({ status }) => {
            if (inputRef && status === STATUS.FINISHED) {
              inputRef.current?.focus();
            }
          }}
        />
      )} */}

      <Box pos="relative">
        <Box w="100%" h="100vh" ref={mapContainerRef} />
        <Box m="2" pos="absolute" top="0" left="0" right="0" zIndex={30}>
          <InputGroup>
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
      {/* </Joyride> */}
    </>
  );
});

GoogleMap.displayName = "GoogleMap";

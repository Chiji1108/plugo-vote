import { memo, useState } from "react";
import {
  Text,
  Heading,
  Stack,
  Image,
  Button,
  Skeleton,
  useWhyDidYouUpdate,
} from "@chakra-ui/react";

import { CheckIcon } from "@chakra-ui/icons";
import {
  useMap,
  useAutocomplete,
  useMapReducer,
  usePlacesService,
  useAutocompleteListener,
  useMapListener,
} from "../hooks";
import Sheet from "react-modal-sheet";

type MapProps = {
  googleMap: typeof google;
  mapContainerEl: HTMLDivElement;
  inputEl: HTMLInputElement;
};

export const Map = memo(({ googleMap, mapContainerEl, inputEl }: MapProps) => {
  useWhyDidYouUpdate("Map", { googleMap, mapContainerEl, inputEl });
  const map = useMap({ googleMap, mapContainerEl });
  const autocomplete = useAutocomplete({ googleMap, inputEl });
  const placesService = usePlacesService({ map });
  const { state, dispatch } = useMapReducer({
    map,
    placesService,
  });
  useAutocompleteListener({ googleMap, autocomplete, dispatch });
  useMapListener({ googleMap, map, dispatch });

  const [isClicked, setClick] = useState(false);

  return (
    <Sheet
      isOpen={state.isFocused}
      onClose={() => dispatch({ type: "blur" })}
      // snapPoints={[-50, 100, 0]}
      snapPoints={[370, 200]}
      initialSnap={1}
    >
      <Sheet.Container>
        <Sheet.Header />
        <Sheet.Content>
          {/* Your sheet content goes here */}
          {state.placeResult ? (
            <Stack mx="3" spacing="3">
              <Stack spacing="1">
                <Heading
                  fontSize="xl"
                  whiteSpace="nowrap"
                  overflow="auto"
                  lineHeight="unset"
                >
                  {state.placeResult.name}
                </Heading>

                <Text
                  color="gray.400"
                  fontSize="xs"
                  whiteSpace="nowrap"
                  overflow="auto"
                  lineHeight="unset"
                >
                  {state.placeResult.formatted_address}
                </Text>
              </Stack>

              <Button
                colorScheme={isClicked ? "pink" : "pink"}
                onClick={() => setClick(true)}
                variant={isClicked ? "outline" : "solid"}
              >
                {isClicked ? (
                  <Stack direction="row" alignItems="baseline">
                    <Text>10</Text>
                    <CheckIcon w={3} h={3} justifySelf="center" />
                  </Stack>
                ) : (
                  <>投票する</>
                )}
              </Button>

              {state.placeResult.photos && (
                // <LightGallery>
                <Stack h="200px" direction="row" overflow="scroll">
                  {state.placeResult.photos.map((photo) => (
                    <Image
                      key={photo.getUrl()}
                      src={photo.getUrl()}
                      // alt="photo"
                      borderRadius="md"
                    />
                  ))}
                </Stack>
                // </LightGallery>
              )}
            </Stack>
          ) : (
            <Stack mx="3" spacing="3">
              <Stack spacing="1">
                <Skeleton height="20px" />
                <Skeleton height="16px" />
              </Stack>
              <Skeleton height="40px" />
              <Skeleton height="200px" />
            </Stack>
          )}
        </Sheet.Content>
      </Sheet.Container>
    </Sheet>
  );
});

Map.displayName = "Map";

import { memo, useEffect, useState } from "react";
import {
  Text,
  Heading,
  Stack,
  Image,
  Button,
  Skeleton,
  useWhyDidYouUpdate,
  useDisclosure,
} from "@chakra-ui/react";

import { CheckCircleIcon, CheckIcon, DownloadIcon } from "@chakra-ui/icons";
import {
  useMap,
  useAutocomplete,
  useMapReducer,
  usePlacesService,
  useAutocompleteListener,
  useMapListener,
} from "../hooks";
import { CompleteModal, ConfirmModal } from ".";
import Sheet from "react-modal-sheet";

import styled from "@emotion/styled";

const StyledSheet = styled(Sheet)`
  z-index: 100 !important;
`;

/*TODO: modal

Share ogp url

*/

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
  const {
    isOpen: isConfirmOpen,
    onOpen: onConfirmOpen,
    onClose: onConfirmClose,
  } = useDisclosure();
  const {
    isOpen: isCompleteOpen,
    onOpen: onCompleteOpen,
    onClose: onCompleteClose,
  } = useDisclosure();
  return (
    <>
      {state.placeResult && (
        <ConfirmModal
          placeResult={state.placeResult}
          isOpen={isConfirmOpen}
          onClose={onConfirmClose}
          onConfirm={() => {
            onConfirmClose();
            onCompleteOpen();
          }}
        />
      )}

      <CompleteModal isOpen={isCompleteOpen} onClose={onCompleteClose} />
      <StyledSheet
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
                  colorScheme={"pink"}
                  onClick={onConfirmOpen}
                  // variant={"outline"}
                  bgGradient="linear(to-l, #7928CA, #FF0080)"
                >
                  投票する
                  {/* {isClicked ? (
                    <Stack direction="row" alignItems="baseline">
                      <Text>10</Text>
                      <CheckIcon w={3} h={3} justifySelf="center" />
                    </Stack>
                  ) : (
                    <>投票する</>
                  )} */}
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
      </StyledSheet>
    </>
  );
});

Map.displayName = "Map";

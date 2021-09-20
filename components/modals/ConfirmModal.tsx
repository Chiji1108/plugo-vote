import { Button } from "@chakra-ui/button";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogCloseButton,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
} from "@chakra-ui/modal";
import { Text, Stack, Box } from "@chakra-ui/react";
import { useRef } from "react";

type ConfirmModalProps = {
  placeResult: google.maps.places.PlaceResult;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
};

export const ConfirmModal = ({
  placeResult,
  isOpen,
  onClose,
  onConfirm,
}: ConfirmModalProps) => {
  const cancelRef = useRef(null);

  return (
    <AlertDialog
      leastDestructiveRef={cancelRef}
      isOpen={isOpen}
      onClose={onClose}
      isCentered
      size="xs"
    >
      <AlertDialogOverlay />
      <AlertDialogContent>
        {/* <AlertDialogHeader>投票しますか？</AlertDialogHeader> */}
        <AlertDialogHeader />
        <AlertDialogCloseButton />
        <AlertDialogBody>
          <Stack textAlign="center">
            <Box mt="2">
              <Text
                fontSize="xl"
                fontWeight="black"
                overflow="auto"
                whiteSpace="nowrap"
              >
                {placeResult.name}
              </Text>
              <Text>に投票します</Text>
            </Box>
            <Text>※投票は一日一回しかできません</Text>
          </Stack>
        </AlertDialogBody>
        <AlertDialogFooter>
          <Button ref={cancelRef} onClick={onClose}>
            戻る
          </Button>
          <Button
            colorScheme="pink"
            onClick={onConfirm}
            ml={3}
            bgGradient="linear(to-l, #7928CA, #FF0080)"
          >
            投票する
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

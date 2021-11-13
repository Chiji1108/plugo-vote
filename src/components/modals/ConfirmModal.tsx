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
import { Text, Stack, Box, Checkbox } from "@chakra-ui/react";
import { useRef, useState } from "react";
import { Link } from "@chakra-ui/layout";
import NextLink from "next/link";

//TODO: error実装

type ConfirmModalProps = {
  placeResult: google.maps.places.PlaceResult;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  loading?: boolean;
  error?: Error;
};

export const ConfirmModal = ({
  placeResult,
  isOpen,
  onClose,
  onConfirm,
  loading = false,
}: ConfirmModalProps) => {
  const cancelRef = useRef(null);
  //TODO: プライバシーポリシー
  //TODO: 一度voteした人は最初からtrue？
  const [isChecked, setCheck] = useState(false);

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
          <Stack mt="4">
            <Box my="8" textAlign="center">
              <Text
                fontSize="xl"
                fontWeight="black"
                overflow="auto"
                whiteSpace="nowrap"
                // mx="auto"
              >
                {placeResult.name}
              </Text>
              <Text>に投票します</Text>
            </Box>
            <Box fontSize="sm">
              <Text>※投票は一日一回しかできません</Text>
              {/* <Checkbox
              isChecked={isChecked}
              onChange={(e) => {
                //TODO: preventDefault
                // e.preventDefault();
                setCheck(e.target.checked);
              }}
            > */}
              <Text>
                ※<Link>プライバシーポリシー</Link>に同意したことになります
              </Text>
              {/* </Checkbox> */}
            </Box>
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
            // disabled={!isChecked}
            isLoading={loading}
          >
            投票する
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

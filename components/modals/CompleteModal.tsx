import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Box,
  Center,
  IconButton,
  Stack,
  Heading,
  Text,
} from "@chakra-ui/react";

import { CheckCircleIcon, CheckIcon, DownloadIcon } from "@chakra-ui/icons";

import {
  FacebookShareButton,
  FacebookIcon,
  TwitterShareButton,
  TwitterIcon,
} from "react-share";
import confetti from "canvas-confetti";
import { memo, useEffect } from "react";

type CompleteModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export const CompleteModal = memo(({ isOpen, onClose }: CompleteModalProps) => {
  useEffect(() => {
    if (!isOpen) return;
    confetti({ zIndex: 9999 });
    return () => {
      confetti.reset();
    };
  }, [isOpen]);
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xs" isCentered>
      <ModalOverlay />
      <ModalContent overflow="hidden">
        {/* <ModalHeader /> */}
        <Box
          height="220px"
          width="100%"
          bg="gray.200"
          pos="relative"
          borderRadius="md"
        >
          <Center height="full">OGP (static map with markers)</Center>
          <Stack
            direction="row"
            bottom="0"
            right="0"
            pos="absolute"
            m="3"
            alignItems="flex-end"
          >
            <FacebookShareButton url="TODO:">
              <FacebookIcon size={40} round />
            </FacebookShareButton>
            <TwitterShareButton url="TODO:">
              <TwitterIcon size={40} round />
            </TwitterShareButton>
            <IconButton
              aria-label="download"
              icon={<DownloadIcon />}
              size="md"
              isRound
            />
          </Stack>
        </Box>
        <ModalCloseButton />
        <ModalBody py="4">
          <Stack mb="1">
            <Center m="3">
              <Stack alignItems="center">
                <CheckCircleIcon color="limegreen" w={16} h={16} />
                <Heading fontSize="md" fontWeight="black" mt="4">
                  投票しました
                </Heading>
              </Stack>
            </Center>
            <Text fontSize="sm" textAlign="center">
              明日の投票をお待ちしております
            </Text>
          </Stack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
});

CompleteModal.displayName = "CompleteModal";

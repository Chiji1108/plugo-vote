import {
  memo,
  RefObject,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { Box } from "@chakra-ui/react";
import { useMap } from "../hooks/useMap";

const Map = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const map = useMap(mapRef);
  return <Box w="100%" h="100vh" ref={mapRef}></Box>;
};

export default memo(Map);

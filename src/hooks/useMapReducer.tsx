import { useWhyDidYouUpdate } from "@chakra-ui/react";
import { Reducer, useCallback, useEffect, useReducer } from "react";
import { useMarker } from ".";
// import { FIELDS } from "../constants";
import { isValidPlaceResult } from "../utils/isValidPlaceResult";

type useMapReducerProps = {
  map: google.maps.Map;
  placesService: google.maps.places.PlacesService;
};

type State = {
  isFocused: boolean;
  placeResult?: google.maps.places.PlaceResult;
  placeId?: string;
};

export type Action =
  | {
      type: "focus";
      payload:
        | {
            placeResult: google.maps.places.PlaceResult;
          }
        | { placeId: string };
    }
  | { type: "blur" };

const initialState: State = {
  isFocused: false,
  placeResult: undefined,
  placeId: undefined,
};

const reducer: Reducer<State, Action> = (state, action) => {
  switch (action.type) {
    case "focus":
      if ("placeResult" in action.payload) {
        return {
          ...state,
          isFocused: true,
          placeResult: action.payload.placeResult,
        };
      } else if ("placeId" in action.payload) {
        return { ...state, isFocused: true, placeId: action.payload.placeId };
      } else {
        throw new Error();
      }
    case "blur":
      return {
        ...initialState,
      };
    default:
      throw new Error();
  }
};

// export const useMapReducer = ({ map, placesService }: useMapReducerProps) => {
//   useWhyDidYouUpdate("useFocus", { map, placesService });
//   const [state, dispatch] = useReducer(reducer, initialState);
//   const marker = useMarker({ map });

//   const placePinAndPanTo = useCallback(
//     (ll: google.maps.LatLng) => {
//       if (!map || !marker) return;
//       if (marker.getMap() === null) marker.setMap(map);
//       marker.setPosition(ll);
//       map.setCenter(ll);
//       map.setZoom(15);
//       map.panTo(ll);
//     },
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//     [map]
//   );

//   // when latlng is changed
//   // useEffect(() => {
//   //   if (!state.latlng || !placePinAndPanTo) return;
//   //   placePinAndPanTo(state.latlng);
//   //   // eslint-disable-next-line react-hooks/exhaustive-deps
//   // }, [state.latlng]);

//   // set placeResult when placeId is changed
//   useEffect(() => {
//     if (!state.placeId) return;
//     placesService.getDetails(
//       { placeId: state.placeId, fields: FIELDS },
//       (
//         p: google.maps.places.PlaceResult | null,
//         s: google.maps.places.PlacesServiceStatus
//       ) => {
//         if (s === "OK" && p && p.geometry && p.geometry.location) {
//           dispatch({ type: "focus", payload: { placeResult: p } });
//         }
//       }
//     );
//   }, [state.placeId]);

//   useEffect(() => {
//     if (!state.placeResult || !placePinAndPanTo) return;
//     if (
//       state.placeResult.geometry &&
//       state.placeResult.geometry.location &&
//       isValidPlaceResult(state.placeResult)
//     ) {
//       placePinAndPanTo(state.placeResult.geometry.location);
//     }
//   }, [state.placeResult]);

//   useEffect(() => {
//     if (!marker) return;
//     if (!state.isFocused) {
//       marker.setMap(null);
//     }
//   }, [state.isFocused]);

//   return { state, dispatch };
// };

import create from "zustand";
import shallow from "zustand/shallow";
import { createSelectorFunctions } from "auto-zustand-selectors-hook";
import { FIELDS, LOADER_OPTIONS, MAP_OPTIONS, TOKYO_BOUNDS } from "./googleMap";
import { Loader } from "@googlemaps/js-api-loader";
import { autocomplete, AutocompleteApi } from "@algolia/autocomplete-js";
import { createLocalStorageRecentSearchesPlugin } from "@algolia/autocomplete-plugin-recent-searches";
import debounce from "debounce-promise";
import { CupertinoPane, CupertinoSettings } from "cupertino-pane";
/** @jsx h */
import { h } from "preact";
// import { debounce } from "lodash-es";
// import { h, Fragment } from "preact";

// import { debounce } from "lodash-es";

// function debouncePromise<T>(fn: (...args: T[]) => void, time: number) {
//   let timerId: NodeJS.Timeout;

//   return function debounced(...args: T[]) {
//     if (timerId) {
//       clearTimeout(timerId);
//     }

//     return new Promise((resolve) => {
//       timerId = setTimeout(() => resolve(fn(...args)), time);
//     });
//   };
// }
// const debounced = debouncePromise((items) => Promise.resolve(items), 300);

type AutocompleteItem = {
  description: string;
  place_id?: string;
};

const recentSearchesPlugin = createLocalStorageRecentSearchesPlugin({
  key: "RECENT_SEARCH",
  // limit: 5,
});

const useStoreBase = create<{
  google: typeof google | null;
  init: () => void;
  map: google.maps.Map | null;
  mapEl: HTMLElement | null;
  setMapEl: (el: HTMLElement) => void;
  // autocompleteEl: HTMLElement | null;
  // setAutocompleteEl: (el: HTMLElement) => void;
  // autocompleteService: google.maps.places.AutocompleteService | null;
  autocompleteApi: AutocompleteApi<AutocompleteItem> | null;
  placeId: string | null;
  // setPlaceId: (id: string) => void;
  // initMap: (g: typeof google, el: HTMLElement) => void;
  placeResult: google.maps.places.PlaceResult | null;
}>((set, get) => ({
  google: null,
  init: async () => {
    // if (get().google !== null) return;
    const g = await new Loader(LOADER_OPTIONS).load();
    set({ google: g });
  },
  map: null,
  mapEl: null,
  setMapEl: (el: HTMLElement) => {
    set({ mapEl: el });
  },
  // autocompleteEl: null,
  // setAutocompleteEl: (el: HTMLElement) => {
  //   set({ autocompleteEl: el });
  // },
  // autocompleteService: null,
  autocompleteApi: null,

  placeId: null,
  // setPlaceId: (id: string) => {
  //   set({ placeId: id });
  // },
  placeResult: null,
}));

export const useStore = createSelectorFunctions(useStoreBase);

const unsub1 = useStore.subscribe<{
  google: typeof google | null;
  mapEl: HTMLElement | null;
}>(
  ({ google, mapEl }) => {
    if (google === null || mapEl === null) return;
    useStore.setState({ map: new google.maps.Map(mapEl, MAP_OPTIONS) });
    // useStore.destroy();
  },
  (state) => ({ google: state.google, mapEl: state.mapEl }),
  shallow
);

const unsub2 = useStore.subscribe<{
  google: typeof google | null;
  autocompleteApi: AutocompleteApi<AutocompleteItem> | null;
  // autocompleteEl: HTMLElement | null;
}>(
  ({ google, autocompleteApi }) => {
    if (google === null || autocompleteApi) return;
    const autocompleteService = new google.maps.places.AutocompleteService();
    // const debounced = debounce(autocompleteService.getQueryPredictions, 300, {
    //   leading: true,
    // });

    const asyncQueryPredictions = (input: string) => {
      return new Promise<google.maps.places.QueryAutocompletePrediction[]>(
        (resolve, reject) => {
          autocompleteService.getQueryPredictions(
            {
              input: input,
              bounds: TOKYO_BOUNDS,
            },
            (place, status) => {
              if (status != google.maps.places.PlacesServiceStatus.OK) {
                reject(new Error(status));
              } else if (!place) {
                reject();
              } else {
                console.log(place);
                resolve(place);
              }
            }
          );
        }
      );
    };
    const debounced = debounce(asyncQueryPredictions, 1000, { leading: true });
    const api = autocomplete<AutocompleteItem>({
      container: "#autocomplete",
      plugins: [recentSearchesPlugin],
      openOnFocus: true,
      placeholder: "場所を検索",
      // defaultActiveItemId: 0,
      getSources() {
        return [
          {
            sourceId: "places",
            getItems: async ({ query }) => {
              if (query === "") return [];

              try {
                const predictions = await debounced(query);
                return predictions.map((p) => ({
                  description: p.description,
                  place_id: p.place_id,
                }));
              } catch (error) {
                return [];
              }
            },
            getItemInputValue({ item }) {
              return item.description;
            },
            onSelect({ item }) {
              if (!item.place_id) return;
              // setQuery(item.description);
              useStore.setState({ placeId: item.place_id });
              // refine
            },
            templates: {
              item({ item }) {
                return item.description;
              },

              // noResults() {
              //   return "No results.";
              // },
            },
          },
        ];
      },
    });
    useStore.setState({ autocompleteApi: api });
  },
  (state) => ({ google: state.google, autocompleteApi: state.autocompleteApi }),
  // (state) => ({ google: state.google, autocompleteEl: state.autocompleteEl }),
  shallow
);

const unsub3 = useStore.subscribe<{
  placeId: string | null;
  map: google.maps.Map | null;
  google: typeof google | null;
}>(
  ({ placeId, map, google }) => {
    if (!placeId || !map || !google) return;
    console.log("placeId: ", placeId);
    const ps = new google.maps.places.PlacesService(map);
    ps.getDetails({ placeId: placeId, fields: FIELDS }, (pr) => {
      useStore.setState({ placeResult: pr });
    });
  },
  (state) => ({ placeId: state.placeId, map: state.map, google: state.google }),
  shallow
);

const unsub4 = useStore.subscribe<{
  placeResult: google.maps.places.PlaceResult | null;
}>(
  async ({ placeResult }) => {
    if (!placeResult) return;
    console.log(placeResult);
    const pane = new CupertinoPane(".cupertino-pane");
    await pane.present({ animate: true });
  },
  (state) => ({ placeResult: state.placeResult }),
  shallow
);

import { createStore } from "@modules/GlobalStore";
import { createBasicListStore } from "@modules/GlobalStore/Factories";
import { SearchRequest } from "./types";

type LoadingState = "ready" | "loading" | "finished";

export interface SearchResultsStore {
    results : string[],
    state: LoadingState,
    actions: {
        reset() : void;
        add(item : string) : void;
        setState(s : LoadingState) : void;
    }
}

const TEST_VALUES = [
    "Joe Biden: The Life and Career of the 47th President of the United States",
    "Joe Biden: An American Journey",
    "Joe Biden: The Path to the White House",
    "Joe Biden: A Biography",
    "Joe Biden: A Political Biography"
]

export const useSearchResultsStore = createStore<SearchResultsStore>((get, set) => ({
    results: TEST_VALUES,
    state: "finished",
    actions: {
        reset: () => set(store => ({
            ...store,
            results: [],
            state: "ready"
        })),
        add: (...items : string[]) => set(store => ({
            ...store,
            results: [...store.results, ...items]
        })),
        setState: (s : LoadingState) => set(store => ({
            ...store,
            state: s
        }))
    }
}));

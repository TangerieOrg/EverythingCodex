import { ImmerStore, createImmerStore, createStore } from "@modules/GlobalStore";
import { useCallback } from "preact/hooks";
import { getUrl, createResponseReader } from "./API";

type LoadingState = "ready" | "loading" | "finished";

export type SearchResultsStore = ImmerStore<{
    results : string[],
    state: LoadingState,
    actions: {
        reset() : void;
        add(...items : string[]) : void;
        setState(s : LoadingState) : void;
    }
}>;

export const [useSearchResultsStore] = createImmerStore<SearchResultsStore>((get, set) => ({
    results: [],
    state: "ready",
    actions: {
        reset: () => set(store => {
            store.results = [];
            store.state = "ready"
        }),
        add: (...items) => set(store => {
            store.results.push(...items);
        }),
        setState: (s) => set(store => {
            store.state = s
        })
    }
}));

export const useSearchRequest = (search : string) => {
    const isSearching = search.length > 0;
    const { actions } = useSearchResultsStore();

    return useCallback(() => {
        const controller = new AbortController();

        actions.reset();
        if (!isSearching) return;

        actions.setState("loading");

        fetch(getUrl("/search"), {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                term: search
            }),
            signal: controller.signal
        }).then(createResponseReader(
            data => actions.add(data.trim()),
            () => actions.setState("finished")
        )).catch(err => console.log("[ERR]", err));

        return () => {
            controller.abort();
            actions.setState("ready");
        }
    }, [search]);
}

export const SearchFormatOptions = [
    "Article",
    "Essay",
    "Poem",
    "Story",
    "Scientific Paper",
    "Guide"
] as const;
import { ImmerStore, createImmerStore } from "@modules/GlobalStore";
import { getUrl, createResponseReader } from "./API";
import { getSearchStore } from "@modules/SearchStore";

type LoadingState = "ready" | "loading" | "finished";

export type SearchResultsStore = ImmerStore<{
    results : string[],
    state: LoadingState,
    controller?: AbortController,
    actions: {
        reset() : void;
        add(...items : string[]) : void;
        setState(s : LoadingState) : void;
        request() : void;
        abort() : void;
    }
}>;

export const [useSearchResultsStore] = createImmerStore<SearchResultsStore>((get, set) => ({
    results: [],
    state: "ready",
    actions: {
        reset: () => set(store => {
            store.results = [];
            store.state = "ready";
            store.controller?.abort();
            delete store.controller;
        }),
        add: (...items) => set(store => {
            store.results.push(...items);
        }),
        setState: (s) => set(store => {
            store.state = s
        }),
        request: () => set(store => {
            store.controller?.abort();
            store.controller = new AbortController();
            store.state = "loading";
            
            const searchStore = getSearchStore();

            fetch(getUrl("/search"), {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(searchStore.value),
                signal: store.controller.signal
            }).then(createResponseReader(
                data => get().actions.add(data.trim()),
                () => get().actions.setState("finished")
            )).catch(err => console.log("[ERR]", err))
        }),
        abort: () => set(store => {
            store.controller?.abort();
            store.state = "ready";
            delete store.controller;
        })
    }
}));

export const SearchFormatOptions = [
    "Essay",
    "Story",
    "Scientific Paper",
    "Guide",
    "Blog",
    "Poem",
    "Novel",
    "Forum Post"
] as const;
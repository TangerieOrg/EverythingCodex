import { ImmerStore, createImmerStore, createStore } from "@modules/GlobalStore";
import { useCallback } from "preact/hooks";
import { getUrl, createResponseReader } from "./API";
import { RelatedRequest } from "./types";

type LoadingState = "ready" | "loading" | "finished";

export type RelatedResultsStore = ImmerStore<{
    results : string[],
    state: LoadingState,
    actions: {
        reset() : void;
        add(...items : string[]) : void;
        setState(s : LoadingState) : void;
    }
}>;

export const [useRelatedResultsStore] = createImmerStore<RelatedResultsStore>((get, set) => ({
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
            store.state = s;
        })
    }
}));

export const useRelatedRequest = (req : RelatedRequest) => {
    const { actions } = useRelatedResultsStore();

    return useCallback(() => {
        const controller = new AbortController();
        actions.reset();

        actions.setState("loading");

        fetch(getUrl("/related"), {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(req),
            signal: controller.signal
        }).then(createResponseReader(
            data => actions.add(data.trim()),
            () => actions.setState("finished")
        ));

        return () => {
            controller.abort();
            actions.setState("ready");
        }
    }, [req]);
}
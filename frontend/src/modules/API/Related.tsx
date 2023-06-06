import { createStore } from "@modules/GlobalStore";
import { useCallback } from "preact/hooks";
import { getUrl, createResponseReader } from "./API";

type LoadingState = "ready" | "loading" | "finished";

export interface RelatedResultsStore {
    results : string[],
    state: LoadingState,
    actions: {
        reset() : void;
        add(...items : string[]) : void;
        setState(s : LoadingState) : void;
    }
}

export const useRelatedResultsStore = createStore<RelatedResultsStore>((get, set) => ({
    results: [],
    state: "ready",
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

export const useRelatedRequest = (title : string) => {
    const { actions } = useRelatedResultsStore();

    return useCallback(() => {
        actions.reset();

        actions.setState("loading");

        fetch(getUrl("/related"), {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                title
            })
        }).then(createResponseReader(
            data => actions.add(data.trim()),
            () => actions.setState("finished")
        ));
    }, [title]);
}
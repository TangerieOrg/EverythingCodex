import { createStore } from "@modules/GlobalStore";
import { useCallback } from "preact/hooks";
import { getUrl, createResponseReader } from "./API";

type LoadingState = "ready" | "loading" | "finished";

export interface ViewPageResultsStore {
    text: string;
    state: LoadingState;
    actions: {
        reset() : void;
        append(data : string) : void;
        setState(s : LoadingState) : void;
    }
}

export const useViewPageResultsStore = createStore<ViewPageResultsStore>((get, set) => ({
    text: "",
    state: "ready",
    actions: {
        reset: () => set(store => ({
            ...store,
            state: "ready",
            text: ""
        })),
        append: (data : string) => set(store => ({
            ...store,
            text: store.text + data
        })),
        setState: (s : LoadingState) => set(store => ({
            ...store,
            state: s
        }))
    }
}))

export const useViewPageRequest = (title : string) => {
    const { actions } = useViewPageResultsStore();

    return useCallback(() => {
        actions.reset();
        actions.setState("loading");

        fetch(getUrl("/view"), {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                title
            })
        }).then(createResponseReader(
            data => actions.append(data),
            () => actions.setState("finished")
        ));
    }, [title]);
}
import { ImmerStore, createImmerStore, createStore } from "@modules/GlobalStore";
import { useCallback } from "preact/hooks";
import { getUrl, createResponseReader } from "./API";
import { ViewRequest } from "./types";

type LoadingState = "ready" | "loading" | "finished";

export type ViewPageResultsStore = ImmerStore<{
    text: string;
    state: LoadingState;
    actions: {
        reset() : void;
        append(data : string) : void;
        setState(s : LoadingState) : void;
    }
}>;

export const [useViewPageResultsStore] = createImmerStore<ViewPageResultsStore>((get, set) => ({
    text: "",
    state: "ready",
    actions: {
        reset: () => set(store => {
            store.state = "ready",
            store.text = ""
        }),
        append: (data) => set(store => {
            store.text += data;
        }),
        setState: (s) => set(store => {
            store.state = s
        })
    }
}))

export const useViewPageRequest = (req : ViewRequest) => {
    const { actions } = useViewPageResultsStore();

    return useCallback(() => {
        const controller = new AbortController();
        actions.reset();
        actions.setState("loading");

        fetch(getUrl("/gpt/view"), {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(req),
            credentials: 'include',
            signal: controller.signal
        }).then(createResponseReader(
            data => actions.append(data),
            () => actions.setState("finished")
        ));

        return () => {
            controller.abort();
            actions.setState("ready");
        }
    }, [req]);
}
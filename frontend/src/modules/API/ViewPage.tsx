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

const EXAMPLE_VIEW_PAGE = `Joe Biden was a man with a mission: to become the President of the United States of America. He had been in politics for many years and had served as both Senator and Vice President. Now, he was ready to take on the challenge of a lifetime: running for the highest office in the land.
## Chapter 1
He had the support of the Democratic Party, and his platform was one of unity and progress. He promised to bring the country together and to tackle the big issues facing the nation. But to reach the White House, he would have to defeat the incumbent, President Donald Trump.

### Chapter 1.1
The race for the White House was a grueling one. Biden had to battle through a crowded primary field and then take on Trump in the general election. He had to fight against the forces of division and negative campaigning. But in the end, he prevailed.

## Summary
On November 3rd, 2020, Joe Biden was declared the President-elect. He had won the election with a clear
`

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
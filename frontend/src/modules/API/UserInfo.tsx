import { ImmerStore, createImmerStore } from "@modules/GlobalStore";
import { HistoryItem, HistoryResponse } from "./types";
import { getUrl } from "./API";

type LoadingState = "empty" | "ready" | "loading" | "finished";

export type UserInfoStore = ImmerStore<{
    history: HistoryItem[];
    offset: number;
    state: LoadingState;
    actions: {
        reset() : void;
        next() : void;
        update(s : LoadingState, offset : number, items : HistoryItem[]) : void;
    }
}>


export const [useUserInfoStore] = createImmerStore<UserInfoStore>((get, set) => ({
    history: [],
    offset: 0,
    state: "empty",
    actions: {
        reset: () => set(store => {
            store.history = [];
            store.offset = 0;
            store.state = "empty";
        }),
        update: (s, offset, items) => set(store => {
            store.state = s;
            store.offset = offset;
            store.history.push(...items);
        }),
        next: () => set(store => {
            if(store.state === "loading" || store.state === "finished") return;

            store.state = "loading";
            
            const params = new URLSearchParams({
                offset: store.offset.toString(),
                limit: "100"
            })

            fetch(`${getUrl("/user/history")}?${params.toString()}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: "include"
            })
            .then(response => response.json())
            .then((data : HistoryResponse) => {
                const finished = data.next === -1;
                if(finished) get().actions.update("finished", -1, data.results);
                else get().actions.update("ready", data.next, data.results);
            })
        })
    }
}))
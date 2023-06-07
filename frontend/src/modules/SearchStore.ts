import { SearchRequest } from "./API/types";
import { createRawStore } from "./GlobalStore";
import { omit, pick } from "lodash";
import { toQueryString } from "./Util/Query";

export interface SearchStore {
    value: Partial<SearchRequest>;
    actions: {
        reset(): void;
        set<K extends keyof SearchRequest>(key: K, value: SearchRequest[K]): void;
        delete<K extends keyof SearchRequest>(key: K): void;
    }
}

const getValueFromURL = () : Partial<SearchRequest> => {
    const params = new URLSearchParams(window.location.search);
    const v = Object.fromEntries(params.entries());
    // @ts-ignore
    return pick(v, ["term", "format", "category"]);
}

export const [useSearchStore, getSearchStore] = createRawStore<SearchStore>((get, set) => ({
    value: getValueFromURL(),
    actions: {
        reset: () => set(store => ({
            ...store,
            value: {}
        })),
        set: (key, value) => set(store => ({
            ...store,
            value: {
                ...store.value,
                [key]: value
            }
        })),
        delete: (key) => set(store => ({
            ...store,
            value: omit(store.value, key)
        }))
    }
}));

export const getSearchURL = () => {
    const { value } = getSearchStore();
    if (value.term === undefined) return "/";

    else return `/search?${toQueryString(value)}`
}
import { SearchRequest } from "./API/types";
import { createImmerStore } from "./GlobalStore";
import { pick } from "lodash";
import { toQueryString } from "./Util/Query";

export interface SearchStore {
    value: Partial<SearchRequest>;
    actions: {
        reset(...keysToKeep : (keyof SearchRequest)[]): void;
        set<K extends keyof SearchRequest>(key: K, value: SearchRequest[K]): void;
        delete<K extends keyof SearchRequest>(key: K): void;
    }
}

const getValueFromURL = () : Partial<SearchRequest> => {
    const params = new URLSearchParams(window.location.search);
    const v = Object.fromEntries(params.entries()) as Partial<SearchRequest>;
    return pick(v, ["term", "format", "category"]);
}

export const [useSearchStore, getSearchStore, searchStoreEmitter] = createImmerStore<SearchStore>((get, set) => ({
    value: getValueFromURL(),
    actions: {
        reset: (...keysToKeep) => set(store => {
            store.value = pick(store.value, keysToKeep)
        }),
        set: (key, value) => set(store => {
            store.value[key] = value
        }),
        delete: (key) => set(store => {
            delete store.value[key]
        })
    }
}))

export const getSearchURL = () => {
    const { value } = getSearchStore();
    if (value.term === undefined) return "/";
    return `/search?${toQueryString(value)}`
}
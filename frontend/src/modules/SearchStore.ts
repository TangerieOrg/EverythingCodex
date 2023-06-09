import { SearchRequest } from "./API/types";
import { ImmerStore, createImmerStore } from "./GlobalStore";
import { pick } from "lodash";
import { toQueryString } from "./Util/Query";

type SearchStoreValue = ImmerStore<Partial<SearchRequest>>;
interface SearchStoreActions {
    reset(...keysToKeep : (keyof SearchStoreValue)[]): void;
    set<K extends keyof SearchStoreValue>(key: K, value: SearchStoreValue[K]): void;
    delete<K extends keyof SearchStoreValue>(key: K): void;
}

export interface SearchStore {
    value: SearchStoreValue;
    actions: SearchStoreActions;
}

const getValueFromURL = () : Partial<SearchRequest> => {
    const params = new URLSearchParams(window.location.search);
    const v = Object.fromEntries(params.entries()) as Partial<SearchRequest>;
    return pick(v, ["term", "format", "category", "length"]);
}

export const [useSearchStore, getSearchStore, searchStoreEmitter] = createImmerStore<ImmerStore<SearchStore>>((get, set) => ({
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
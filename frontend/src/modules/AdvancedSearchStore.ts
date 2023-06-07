import { TextMetadata } from "./API/types";
import { createRawStore } from "./GlobalStore";
import { omit } from "lodash";

export interface AdvancedSearchStore {
    value : Partial<TextMetadata>;
    actions: {
        reset() : void;
        set<K extends keyof TextMetadata>(key : K, value : TextMetadata[K]) : void;
        delete<K extends keyof TextMetadata>(key : K) : void;
    }
}


export const [useAdvancedSearchStore, getAdvancedSearchStore] = createRawStore<AdvancedSearchStore>((get, set) => ({
    value: {},
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
}))
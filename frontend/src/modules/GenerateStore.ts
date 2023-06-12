import { ImmerStore, createImmerStore } from "./GlobalStore";

type StoreValue = ImmerStore<Partial<{
    title : string;
    format : string;
    summary : string;
    category : string;
}>>;

type StoreActions = ImmerStore<{
    reset() : void;
    set<K extends keyof StoreValue>(key : K, value : StoreValue[K]) : void;
    delete<K extends keyof StoreValue>(key : K) : void;
}>;

export type GenerateStore = ImmerStore<{
    value: StoreValue;
    actions: StoreActions;
}>;

export const [useGenerateStore, getGenerateStore] = createImmerStore<GenerateStore>((get, set) => ({
    value: {},
    actions: {
        reset: () => set(store => {
            store.value = {}
        }),
        set: (key, value) => set(store => {
            if(value === undefined) delete store.value[key];
            else store.value[key] = value
        }),
        delete: (key) => set(store => {
            delete store.value[key];
        })
    }
}))
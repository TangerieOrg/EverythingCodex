import { useEffect, useState } from "preact/hooks";

type StoreGet<Store extends object> = () => Store;
type StoreSetter<Store extends object> = (s : Store) => Store;
type StoreSet<Store extends object> = (setter : StoreSetter<Store>) => void;

export type StoreInit<Store extends object> = (get : StoreGet<Store>, set : StoreSet<Store>) => Store;
export type StoreOperation<Store extends object> = (store : Store) => Store;
export type StoreCallback<Store extends object> = (v : Store) => any;

const createEmitter = <Store extends object>() => {
    const subs = new Map<Symbol, StoreCallback<Store>>();
    return {
        emit: (v : Store) => subs.forEach(fn => fn(v)),
        subscribe: (fn : StoreCallback<Store>) => {
            const key = Symbol();
            subs.set(key, fn);
            return () => subs.delete(key);
        }
    }
}

/**
import { createStore } from "@modules/GlobalStore";

interface TestStore {
    value: number,
    add: () => void
}

const useTestStore = createStore<TestStore>((get, set) => ({
    value: 0,
    add: () => set(store => ({...store, value: store.value + 1}))
}));
 */
export const createStore = <Store extends {}>(init : StoreInit<Store>) => {
    const emitter = createEmitter<Store>();

    let store : Store;
    const get : StoreGet<Store> = () => store;
    const set : StoreSet<Store> = (op) => {
        store = op(store);

        emitter.emit(store);
    };

    store = init(get, set);

    const useStore = () => {
        const [localStore, setLocalStore] = useState(get());

        useEffect(() => emitter.subscribe(setLocalStore), []);

        return localStore;
    };

    return useStore;
}
import { useEffect, useState } from "preact/hooks";
import { produce } from "immer";

type StoreGet<Store extends object> = () => Store;
type StoreSetter<Store extends object> = (s : Store) => Store;
type StoreSet<Store extends object> = (setter : StoreSetter<Store>) => void;

export type StoreInit<Store extends object> = (get : StoreGet<Store>, set : StoreSet<Store>) => Store;
export type StoreOperation<Store extends object> = (store : Store) => Store;
export type StoreCallback<Store extends object> = (v : Store) => any;

export interface StoreEmitter<Store extends object> {
    emit(v : Store): void;
    subscribe(fn : StoreCallback<Store>): () => boolean;
}

const createEmitter = <Store extends object>() : StoreEmitter<Store> => {
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

type UseStore<Store extends object> = () => Store;

export const createRawStore = <Store extends {}>(init : StoreInit<Store>) : [useStore : UseStore<Store>, get : StoreGet<Store>, emitter : StoreEmitter<Store>] => {
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

    return [useStore, get, emitter];
}

type ImmerStoreSetter<Store extends object> = (s : Store) => void;
type ImmerStoreSet<Store extends object> = (setter : ImmerStoreSetter<Store>) => void;
type ImmerStoreInit<Store extends object> = (get : StoreGet<Store>, set : ImmerStoreSet<Store>) => Store;

export const createImmerStore = <Store extends {}>(init : ImmerStoreInit<Store>) : [useStore : UseStore<Store>, get : StoreGet<Store>, emitter : StoreEmitter<Store>] => {
    const emitter = createEmitter<Store>();

    let store : Store;
    const get : StoreGet<Store> = () => store;
    const set : ImmerStoreSet<Store> = (op) => {
        store = produce(store, op);
        emitter.emit(store);
    };

    store = init(get, set);

    const useStore = () => {
        const [localStore, setLocalStore] = useState(get());

        useEffect(() => emitter.subscribe(setLocalStore), []);

        return localStore;
    };

    return [useStore, get, emitter];
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
export const createStore = <Store extends {}>(init : StoreInit<Store>) => createRawStore<Store>(init)[0]
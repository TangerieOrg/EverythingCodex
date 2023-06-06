import { createStore } from "./GlobalStore";

export interface BasicListStore<T> {
    values : T[],
    actions: {
        clear() : void;
        add(...items : T[]) : void;
        set(items : T[]) : void;
    }
}

export function createBasicListStore<T>(initial : T[] = []) {
    return createStore<BasicListStore<T>>((get, set) => ({
        values: initial,
        actions: {
            clear: () => set(store => ({
                ...store,
                values: []
            })),
            add: (...items : T[]) => set(store => ({
                ...store,
                values: [...store.values, ...items]
            })),
            set: (items : T[]) => set(store => ({
                ...store,
                values: items
            }))
        }
    }))
}

export interface GetSetStore<T> {
    value : T;
    setValue(v : T) : void;
}

export function createGetSetStore<T>(initial : T) {
    return createStore<GetSetStore<T>>((get, set) => ({
        value: initial,
        setValue: (v : T) => set(store => ({
            ...store,
            value: v
        })),
    }))
}
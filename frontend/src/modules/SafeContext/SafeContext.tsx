import { Context, createContext } from "preact";
import { useContext } from "preact/hooks";

const EMPTY_STATE = Symbol();
type EmptyState = typeof EMPTY_STATE;

export type SafeContext<T> = Context<T | EmptyState>;


export const createSafeContext = <T,>() => {
    return createContext<T | EmptyState>(EMPTY_STATE) as SafeContext<T>;
}

export const useSafeContext = <T,>(context : SafeContext<T>) => {
    const value = useContext(context);
    if(value === EMPTY_STATE) throw new Error("Context not provided");
    return value as T;
}


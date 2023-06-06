export type EventCallback<TArgs extends unknown[]> = (...args : TArgs) => any;

export default class EventEmitter<TEventMap extends Record<string, unknown[]>> {
    private listeners = new Map<keyof TEventMap, EventCallback<any[]>[]>();

    public on<K extends keyof TEventMap>(type : K, callback : EventCallback<TEventMap[K]>) {
        if(!this.listeners.has(type)) this.listeners.set(type, []);
        this.listeners.get(type)!.push(callback);
        return () => this.remove(type, callback);
    }

    public emit<K extends keyof TEventMap>(type : K, ...args : TEventMap[K]) {
        this.listeners.get(type)?.forEach(cb => cb(...args));
    }

    public remove<K extends keyof TEventMap>(type : K, callback : EventCallback<TEventMap[K]>) {
        if(!this.listeners.has(type)) this.listeners.set(type, []);
        this.listeners.set(type, this.listeners.get(type)!.filter(cb => cb !== callback));
    }
}
import { useMemo } from "preact/hooks";
import { useLocation } from "react-router-dom";

export function useQuery() {
    const { search } = useLocation();
    return useMemo(() => new URLSearchParams(search), [search]);
}

export function useQueryParameter(key : string, defaultValue : string) : string;
export function useQueryParameter(key : string, defaultValue?: string) {
    const q = useQuery();
    return useMemo(() => q.get(key) ?? defaultValue, [q]);
}

export function toQueryString(data : Record<string, string>) {
    const params = new URLSearchParams();
    for(const key in data) params.set(key, data[key])
    return params.toString();
}
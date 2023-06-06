import { useQuery } from "@modules/Util/Query"
import { useCallback } from "preact/hooks";
import { JSX } from "preact";

export default function SearchBar() {
    const query = useQuery();
    const onChange = useCallback((ev : JSX.TargetedEvent<HTMLInputElement, Event>) => {
        console.log(ev);
    }, [query]);

    return <input type="text"
        class="form-input rounded-lg text-xl w-full focus:ring-purple-600 focus:ring-opacity-50"
        value={query.get("q") ?? ""}
        onChange={onChange}
    />
}
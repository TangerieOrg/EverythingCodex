import { useQuery } from "@modules/Util/Query"
import { useCallback, useRef, useState } from "preact/hooks";
import { JSX } from "preact";

export default function SearchBar() {
    const query = useQuery();
    const inputRef = useRef<HTMLInputElement | null>(null);

    const onKeyDown = useCallback((ev : JSX.TargetedEvent<HTMLInputElement, Event>) => {
        // @ts-ignore
        if(ev.key === 'Enter') {
            console.log("Submitting", inputRef.current!.value);
        }
    }, []);

    return <input type="text"
        class="form-input rounded-lg text-xl w-full focus:ring-purple-600 focus:ring-opacity-50"
        value={query.get("q") ?? ""}
        ref={inputRef}
        onKeyDown={onKeyDown}
        placeholder="Enter search term..."
    />
}
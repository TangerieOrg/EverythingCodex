import { useQueryParameter } from "@modules/Util/Query"
import { useCallback, useRef } from "preact/hooks";
import { JSX } from "preact";
import { useNavigate } from "react-router-dom";

export default function SearchBar() {
    const search = useQueryParameter("q", "");
    const navigate = useNavigate();
    const inputRef = useRef<HTMLInputElement | null>(null);

    const onKeyDown = useCallback((ev : JSX.TargetedEvent<HTMLInputElement, Event>) => {
        // @ts-ignore
        if(ev.key === 'Enter') {
            const v = inputRef.current!.value;
            if(v.length === 0) navigate("/")
            else {
                const params = new URLSearchParams();
                params.set("q", v);
                navigate(`/search?${params.toString()}`)
            }
        }
    }, []);

    return <input type="text"
        class="form-input rounded-lg text-xl w-full focus:ring-purple-600 focus:ring-opacity-50"
        value={search}
        ref={inputRef}
        onKeyDown={onKeyDown}
        placeholder="Enter search term..."
    />
}
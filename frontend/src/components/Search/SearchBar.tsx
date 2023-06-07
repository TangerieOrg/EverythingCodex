import { toQueryString, useQueryParameter } from "@modules/Util/Query"
import { useCallback, useEffect, useRef, useState } from "preact/hooks";
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
            if(v.length === 0) navigate("/");
            else navigate(`/search?${toQueryString({q: v})}`)
        }
    }, []);

    return <input type="text"
        class="form-input text-xl w-full input-themed"
        defaultValue={search}
        ref={inputRef}
        onKeyDown={onKeyDown}
        placeholder="Enter search term..."
    />
}
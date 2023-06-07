import { useCallback, useState } from "preact/hooks";
import { JSX } from "preact";
import { useNavigate } from "react-router-dom";
import { getSearchURL, useSearchStore } from "@modules/SearchStore";

export default function SearchBar() {
    const { value, actions } = useSearchStore();
    const [input, setInput] = useState(value.term ?? "");
    const navigate = useNavigate();

    const setTerm = (v : string) => {
        if(v === undefined || v.length === 0) actions.delete("term");
        else actions.set("term", v)
    }

    const onKeyDown : JSX.KeyboardEventHandler<HTMLInputElement> = (ev) => {
        if(ev.key === 'Enter') {
            setTerm(input)
            navigate(getSearchURL());
        }
    };

    return <input type="text"
        class="form-input text-xl w-full input-themed"
        value={input}
        onKeyDown={onKeyDown}
        onInput={(ev : any) => setInput(ev.target.value.trim()) }
        placeholder="Enter search term..."
    />
}
import { useCallback, useState } from "preact/hooks";
import { JSX } from "preact";
import { useNavigate } from "react-router-dom";
import { getSearchURL, useSearchStore } from "@modules/SearchStore";

export default function SearchBar() {
    const { value, actions } = useSearchStore();
    const [input, setInput] = useState(value.term ?? "");
    const navigate = useNavigate();

    const onKeyDown = (ev : JSX.TargetedEvent<HTMLInputElement, Event>) => {
        // @ts-ignore
        if(ev.key === 'Enter') {
            if(input.length === 0) actions.delete("term")
            else actions.set("term", input)

            navigate(getSearchURL());
        }
    };

    return <input type="text"
        class="form-input text-xl w-full input-themed"
        value={input}
        onKeyDown={onKeyDown}
        // @ts-ignore
        onInput={ev => setInput(ev.target!.value.trim()) }
        placeholder="Enter search term..."
    />
}
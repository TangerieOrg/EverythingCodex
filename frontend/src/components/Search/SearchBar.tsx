import { JSX } from "preact";
import { useNavigate } from "react-router-dom";
import { getSearchURL, useSearchStore } from "@modules/SearchStore";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import StyledButton from "@components/StyledButton";

export default function SearchBar() {
    const { value, actions } = useSearchStore();
    const navigate = useNavigate();

    const search = () => navigate(getSearchURL())

    const setTerm = (v : string) => {
        if(v === undefined || v.length === 0) actions.delete("term");
        else actions.set("term", v)
    }

    const onKeyDown : JSX.KeyboardEventHandler<HTMLInputElement> = (ev) => {
        if(ev.key === 'Enter') search()
    };

    return <span class="flex flex-row">
        <input type="text"
            class="form-input text-xl w-full input-themed"
            value={value.term ?? ""}
            onKeyDown={onKeyDown}
            onInput={(ev : any) => setTerm(ev.target.value.trim()) }
            placeholder="Enter search term..."
        />
        <button
            onClick={() => search()}
            class="md:px-6 px-5 py-3 rounded-lg border-2 hover:text-white transition
            h-full whitespace-nowrap ml-2
            border-purple-600 text-purple-600 hover:bg-purple-600"
        > 
            <FontAwesomeIcon icon={solid("magnifying-glass")} className="inline"/>
            <span class="md:ml-2 ml-2 md:inline hidden">
                Search
            </span>
        </button>
    </span>
}
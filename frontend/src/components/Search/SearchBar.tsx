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
        <StyledButton style="Purple" class="h-full whitespace-nowrap md:block md:ml-4 hidden" onClick={() => search()}>
            <FontAwesomeIcon icon={solid("magnifying-glass")} className="inline"/>
            <span class="ml-2">
                Search
            </span>
        </StyledButton>
    </span>
}
import { SearchFormatOptions } from "@modules/API/Search"
import { getSearchURL, useSearchStore } from "@modules/SearchStore";
import { useNavigate } from "react-router-dom";

export default function AdvancedSearch() {
    const { actions, value } = useSearchStore();
    const navigate = useNavigate();

    const setKey = <K extends keyof typeof value>(k : K, v : (typeof value)[K] | undefined) => {
        if(v === undefined || v.length === 0) actions.delete(k);
        else actions.set(k, v)
    }

    return <div class="w-full h-fit grid grid-cols-1 gap-y-4">
        <div>
            <label htmlFor="format">Format</label>
            <select
                value={value.format}
                onInput={(ev: any) => setKey("format", ev.target.value)} 
                class={`form-select input-themed light mt-2 block w-full ${value.format === undefined ? "text-gray-500" : ""}`}
                placeholder="Format"
            >
                <option value="" class="text-black" selected={value.format === undefined}>Any</option>
                {
                    SearchFormatOptions.map(format => (
                        <option value={format} class="text-black">{format}</option>
                    ))
                }
            </select>
        </div>
        <div>
            <label htmlFor="category">Category</label>
            <input 
                type="text"
                placeholder="Category"
                value={value.category ?? ""}
                className="form-input input-themed light mt-2 block w-full"
                onChange={(ev: any) => setKey("category", ev.target.value)}
            />
        </div>

        <button 
            class="text-gray-600 mt-2 hover:underline text-left ml-1"
            onClick={() => {
                actions.reset();
                navigate(getSearchURL());
            }}
        >
            Reset Search
        </button>
    </div>
}
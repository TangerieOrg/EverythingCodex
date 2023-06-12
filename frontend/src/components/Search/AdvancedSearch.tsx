import { LengthOptions, SearchFormatOptions } from "@modules/API/Search"
import { getSearchURL, useSearchStore } from "@modules/SearchStore";
import { toQueryString } from "@modules/Util/Query";
import { useState } from "preact/hooks";
import { Link, useNavigate } from "react-router-dom";

const _isCustomFormat = (value: string) => !(SearchFormatOptions.includes(value as any) || value == undefined || value.length == 0)

export default function AdvancedSearch() {
    const { actions, value } = useSearchStore();
    const [isCustomFormat, setIsCustomFormat] = useState(_isCustomFormat(value.format as any));
    const navigate = useNavigate();

    const setKey = <K extends keyof typeof value>(k: K, v: (typeof value)[K] | undefined) => {
        if (v === undefined || v.length === 0) actions.delete(k);
        else actions.set(k, v)
    }

    const setFormat = (v: string | undefined) => {
        if (v === "Custom") {
            setIsCustomFormat(true);
            setKey("format", "")
        } else {
            setKey("format", v)
            setIsCustomFormat(false);
        }
    }

    return <div class="w-full h-fit grid grid-cols-1 gap-y-4">
        <div>
            <label htmlFor="format">Format</label>
            <select
                value={isCustomFormat ? "Custom" : value.format}
                onInput={(ev: any) => setFormat(ev.target.value)}
                class={`form-select input-themed light mt-2 block w-full ${(value.format === undefined && !isCustomFormat) ? "text-gray-500" : ""}`}
                placeholder="Format"
            >
                <option value="" class="text-black" selected={value.format === undefined}>Any</option>
                {
                    SearchFormatOptions.map(format => (
                        <option value={format} class="text-black">{format}</option>
                    ))
                }
                <option value="Custom" class="text-black">Custom</option>
            </select>
            {
                isCustomFormat && (
                    <input
                        type="text"
                        placeholder="Custom Format"
                        value={value.format ?? ""}
                        className="form-input input-themed light mt-2 block w-full"
                        onChange={(ev: any) => setKey("format", ev.target.value)}
                    />
                )
            }
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

        <div>
            <label htmlFor="length">Length</label>
            <select
                value={value.length}
                onInput={(ev: any) => setKey("length", ev.target.value)}
                class={`form-select input-themed light mt-2 block w-full ${(value.length === undefined) ? "text-gray-500" : ""}`}
                placeholder="Format"
            >
                <option value="" class="text-black" selected={value.length === undefined}>Any</option>
                {
                    LengthOptions.map(length => (
                        <option value={length} class="text-black">{length}</option>
                    ))
                }
            </select>
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
        <div class="flex flex-row">
            <div class="w-full h-full flex flex-col justify-center">
                <div class="w-full border-b-2 border-gray-400 h-0"></div>
            </div>
            <div class="block px-4 text-gray-400">OR</div>
            <div class="w-full h-full flex flex-col justify-center">
                <div class="w-full border-b-2 border-gray-400 h-0"></div>
            </div>
        </div>

        <Link
            class="md:px-6 px-5 py-3 rounded-lg border-2 hover:text-white transition
            h-full whitespace-nowrap text-center
            border-purple-600 text-purple-600 hover:bg-purple-600"
            to="/generate"
        > 
            Generate Custom Page
        </Link>
    </div>
}
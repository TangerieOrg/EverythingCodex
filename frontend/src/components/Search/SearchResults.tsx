import { useSearchResultsStore } from "@modules/API/Search";
import { toQueryString, useQueryParameter } from "@modules/Util/Query";
import { Link } from "react-router-dom";


export default function SearchResults() {
    const search = useQueryParameter("q", "");
    const { results, state } = useSearchResultsStore();

    return <div class="flex flex-col w-full text-lg">
        <h1 class="text-2xl font-light mb-8 -ml-4">
            {
                state === "loading" ? "Loading " : "Found "
            } 
            {results.length} results for "{search}"
        </h1>
        {
            results.map((title, i) => (
                <div key={i} class="pb-4 animate-in fade-in slide-in-from-left-4 duration-500">
                    <Link 
                        // to={`/view?${toQueryString({ title })}`}
                        class="hover:text-purple-700 transition"
                    >
                        {title}
                    </Link>
                </div>
            ))
        }
    </div>
}
import SearchBanner from '@components/Search/SearchBanner';
import SearchResults from '@components/Search/SearchResults';
import { createResponseReader, getUrl } from '@modules/API';
import { useSearchResultsStore } from '@modules/API/Search';
import { useQueryParameter } from '@modules/Util/Query';
import { useCallback, useEffect } from 'preact/hooks';
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function SearchRoute() {
    const search = useQueryParameter("q", "");
    const isSearching = search.length > 0;
    const { actions, state } = useSearchResultsStore();

    const makeRequest = useCallback(() => {
        actions.reset();
        if (!isSearching) return;

        actions.setState("loading");

        console.log("Starting Fetch");

        fetch(getUrl("/search"), {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                term: search
            })
        }).then(createResponseReader(
            data => actions.add(data),
            () => actions.setState("finished")
        ));
    }, [search]);

    useEffect(() => {
        if (!isSearching) return;
        makeRequest();
    }, [search]);

    return <div class="min-h-screen w-screen">
        {/* TODO => Fix for phones */}
        <div class={`w-full relative transition-all duration-1000 ${isSearching ? "-top-[4.5rem]" : "top-44"}`}>
            <SearchBanner />
        </div>
        {
            isSearching && <div class="max-w-2xl mx-auto px-8 animate-in fade-in delay-1000">
                <SearchResults/>

                {
                    state === "finished" && <div class="pt-8 w-full flex flex-row justify-center text-center">
                        <button 
                            class="animate-in fade-in duration-500 mx-auto px-6 py-3 rounded-lg border-2 border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white transition slide-in-from-left-4"
                            onClick={() => makeRequest()}
                        >
                            <FontAwesomeIcon icon={solid("arrows-rotate")} className="pr-2"/>
                            Regenerate
                        </button>
                    </div>
                }
            </div>
        }
    </div>
}
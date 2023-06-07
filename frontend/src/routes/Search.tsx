import SearchBanner from '@components/Search/SearchBanner';
import SearchResults from '@components/Search/SearchResults';
import { useSearchRequest, useSearchResultsStore } from '@modules/API/Search';
import { useQueryParameter } from '@modules/Util/Query';
import { useEffect } from 'preact/hooks';
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import StyledButton from '@components/StyledButton';

export default function SearchRoute() {
    const search = useQueryParameter("q", "");
    const isSearching = search.length > 0;
    const { state } = useSearchResultsStore();

    const makeRequest = useSearchRequest(search);

    useEffect(() => {
        if (!isSearching) return;
        return makeRequest();
    }, [search]);

    return <div class="min-h-screen w-screen">
        {/* TODO => Fix for phones */}
        <div class={`w-full relative transition-all duration-1000 ${isSearching ? "md:-top-[4.5rem] -top-[3.5rem]" : "top-44"}`}>
            <SearchBanner />
        </div>
        {
            isSearching && <div class="max-w-2xl mx-auto px-8">
                <SearchResults/>

                {
                    state === "finished" && <div class="pt-8 w-full flex flex-row justify-center text-center">
                        <StyledButton
                            style="Purple"
                            class="animate-in fade-in duration-500 mx-auto slide-in-from-left-4"
                            onClick={() => makeRequest()}
                        >
                            <FontAwesomeIcon icon={solid("arrows-rotate")} className="pr-2"/>
                            Regenerate
                        </StyledButton>
                    </div>
                }
            </div>
        }
    </div>
}
import SearchBanner from '@components/Search/SearchBanner';
import SearchResults from '@components/Search/SearchResults';
import { useSearchRequest, useSearchResultsStore } from '@modules/API/Search';
import { useEffect } from 'preact/hooks';
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import StyledButton from '@components/StyledButton';
import { useSearchStore } from '@modules/SearchStore';

export default function SearchRoute() {
    const searchStore = useSearchStore();
    const isSearching = searchStore.value.term !== undefined;
    const { state } = useSearchResultsStore();

    const makeRequest = useSearchRequest(searchStore.value.term ?? "");

    useEffect(() => {
        if (!isSearching) return;
        return makeRequest();
    }, [searchStore.value]);

    return <div class="min-h-screen w-screen">
        <div class={`w-full transition-all duration-1000 ${isSearching ? "md:-mt-[4.5rem] -mt-[3.5rem]" : "mt-44"}`}>
            <SearchBanner/>
        </div>
        {
            isSearching && <div class="max-w-2xl mx-auto px-8 mt-8">
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
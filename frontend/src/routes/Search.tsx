import SearchBanner from '@components/Search/SearchBanner';
import SearchResults from '@components/Search/SearchResults';
import { useSearchResultsStore } from '@modules/API/Search';
import { useEffect, useState } from 'preact/hooks';
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import StyledButton from '@components/StyledButton';
import { useSearchStore } from '@modules/SearchStore';
import { useLocation } from 'react-router-dom';

export default function SearchRoute() {
    const { pathname, search } = useLocation();
    const isSearching = pathname === '/search';

    const { state, actions } = useSearchResultsStore();

    useEffect(() => {
        if(isSearching) {
            actions.reset();
            actions.request();
        }
    }, [search])

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
                            onClick={() => {
                                actions.reset();
                                actions.request();
                            }}
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
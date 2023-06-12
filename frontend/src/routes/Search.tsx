import SearchBanner from '@components/Search/SearchBanner';
import SearchResults from '@components/Search/SearchResults';
import { useSearchResultsStore } from '@modules/API/Search';
import { useEffect } from 'preact/hooks';
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import StyledButton from '@components/StyledButton';
import { Link, useLocation } from 'react-router-dom';
import { If, Then } from "react-if";
import { useSearchStore } from '@modules/SearchStore';
import { useSubtitle } from '@modules/useTitle';

// clock-rotate-left

const mediaQuery = window.matchMedia('(min-width: 768px)')


export default function SearchRoute() {
    const { pathname, search } = useLocation();
    const isSearching = pathname === '/search';
    const searchStore = useSearchStore();
    const { state, actions } = useSearchResultsStore();

    useSubtitle(isSearching ? "Search" : undefined);

    useEffect(() => {
        if (isSearching) {
            searchStore.actions.updateFromUrl();
            actions.reset();
            actions.request();
        }
    }, [search])

    return <div class="min-h-screen w-screen pb-4">
        <div class={`w-full transition-all duration-1000 ${isSearching ? "md:-mt-[4.5rem] -mt-[3.5rem]" : "pt-44"}`}>
            <SearchBanner />
        </div>
        <If condition={isSearching}>
            <Then>
                <div class="max-w-2xl mx-auto px-8 mt-8">
                    <SearchResults />
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
                                <FontAwesomeIcon icon={solid("arrows-rotate")} className="pr-2" />
                                Regenerate
                            </StyledButton>
                        </div>
                    }
                </div>
            </Then>
        </If>
        <Link class={`fixed ${mediaQuery.matches ? "bottom-4" : "top-4"} right-4 group transition duration-500 ${isSearching ? "pointer-events-none opacity-0" : "opacity-100"}`} to="/history">
            <FontAwesomeIcon icon={solid("clock-rotate-left")} className="text-2xl transition duration-500 group-hover:-rotate-[20deg]" />
        </Link>
    </div>
}
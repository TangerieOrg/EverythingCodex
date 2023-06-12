import { useMemo, useState } from 'preact/hooks';
import { TypeAnimation } from 'react-type-animation';
import SearchBar from './SearchBar';
import Expandable from '@components/Expandable';
import AdvancedSearch from './AdvancedSearch';
import { useSearchStore } from '@modules/SearchStore';
import { useLocation } from 'react-router-dom';
import TypedTitle from '@components/TypedTitle';


export default function SearchBanner() {
    const { pathname } = useLocation();
    const isSearching = pathname === '/search';
    const { value } = useSearchStore();
    const [advancedShown, setAdvancedShown] = useState(value.format !== undefined || value.category !== undefined);

    return <>
        <TypedTitle hidden={isSearching}/>
        <div class="mx-auto max-w-2xl w-full px-8">
            <div class="flex flex-col w-full">
                <SearchBar />
                <div class={`transition duration-300 mt-4 rounded-lg w-full bg-opacity-50 ${advancedShown ? "bg-gray-300" : "bg-gray-200 delay-200"}`}>
                    <button
                        class={`transition w-full rounded-t-lg group p-4 ${advancedShown ? "" : "hover:underline"}`}
                        onClick={() => setAdvancedShown(!advancedShown)}
                    >
                        Advanced Options
                    </button>
                    
                    <Expandable open={advancedShown} class="duration-500" openClass='delay-100' closedClass=''>
                        <div class="p-4">
                            <AdvancedSearch />
                        </div>
                    </Expandable>
                </div>
            </div>
        </div>
    </>
}
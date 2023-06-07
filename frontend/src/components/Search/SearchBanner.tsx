import { useEffect, useMemo, useState } from 'preact/hooks';
import { TypeAnimation } from 'react-type-animation';
import SearchBar from './SearchBar';
import { useQueryParameter } from '@modules/Util/Query';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import Expandable from '@components/Expandable';
import AdvancedSearch from './AdvancedSearch';

const WORDS = [
    "Search for Everything",
    "Search for Anything",
    "Explore Infinity"
];

export default function SearchBanner() {
    const [advancedShown, setAdvancedShown] = useState(true);
    const search = useQueryParameter("q", "");
    const isSearching = search.length > 0;


    const sequence = useMemo(() => {
        const seq: (string | number)[] = [];

        for (const w of WORDS) {
            seq.push(w, 2000);
        }

        return seq;
    }, []);

    return <>
        <h1 class={`text-center text-3xl md:text-6xl mb-8 font-extralight transition ${isSearching ? "opacity-0" : "opacity-100"}`}>
            {/* @ts-ignore */}
            <TypeAnimation key={isSearching} sequence={isSearching ? ["", 100] : sequence} speed={40} repeat={Infinity} />
        </h1>
        <div class="mx-auto max-w-2xl w-full px-8">
            <div class="flex flex-col w-full">
                <SearchBar/>
                <button class="text-right text-gray-600 mt-2 hover:underline" onClick={() => setAdvancedShown(!advancedShown)}>
                    Advanced Search
                </button>
                <Expandable open={advancedShown}>
                    <AdvancedSearch/>
                </Expandable>
            </div>
        </div>
    </>
}
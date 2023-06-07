import { useMemo, useState } from 'preact/hooks';
import { TypeAnimation } from 'react-type-animation';
import SearchBar from './SearchBar';
import Expandable from '@components/Expandable';
import AdvancedSearch from './AdvancedSearch';
import { useSearchStore } from '@modules/SearchStore';

const WORDS = [
    "Search for Everything",
    "Search for Anything",
    "Explore Infinity"
];

export default function SearchBanner() {
    const [advancedShown, setAdvancedShown] = useState(false);
    const { value } = useSearchStore();
    const isSearching = value.term !== undefined;

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
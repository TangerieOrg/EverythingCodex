import { useEffect, useMemo } from 'preact/hooks';
import { TypeAnimation } from 'react-type-animation';
import SearchBar from './SearchBar';
import { useQueryParameter } from '@modules/Util/Query';

const WORDS = [
    "Search for Everything",
    "Search for Anything",
    "Explore Infinity"
];

export default function SearchBanner() {
    const search = useQueryParameter("q", "");
    const isSearching = search.length > 0;
    
    useEffect(() => {
        console.log("Search", search);
    }, [search])

    const sequence = useMemo(() => {
        const seq: (string | number)[] = [];

        for (const w of WORDS) {
            seq.push(w, 2000);
        }

        return seq;
    }, []);

    return <>
        <h1 class={`text-center text-3xl md:text-6xl mb-8 font-extralight transition ${isSearching ? "opacity-0" : "opacity-100"}`}>
            <TypeAnimation key={isSearching} sequence={isSearching ? ["", 100] : sequence} speed={40} repeat={Infinity} />
        </h1>
        <div class="mx-auto max-w-2xl w-full px-8">
            <SearchBar/>
        </div>
    </>
}
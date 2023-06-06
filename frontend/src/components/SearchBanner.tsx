
import { useMemo } from 'preact/hooks';
import { TypeAnimation } from 'react-type-animation';
import SearchBar from './SearchBar';

const WORDS = [
    "for Everything",
    "for Anything",
    "Infinity"
];

export default function SearchBanner() {
    const sequence = useMemo(() => {
        const seq: (string | number)[] = [];

        for (const w of WORDS) {
            seq.push(w, 2000);
        }

        return seq;
    }, []);

    return <>
        <h1 class="text-center text-6xl md:text-6xl mb-8 font-extralight">
            Search <TypeAnimation sequence={sequence} speed={40} repeat={Infinity}></TypeAnimation>
        </h1>
        <div class="mx-auto max-w-2xl w-full">
            <SearchBar/>
        </div>
    </>
}
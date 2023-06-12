import { useMemo } from 'preact/hooks';
import { TypeAnimation } from 'react-type-animation';

const WORDS = [
    "Search for Everything",
    "Search for Anything",
    "Explore Infinity"
];

interface Props {
    hidden : boolean;
}

export default function TypedTitle({ hidden } : Props) {
    const sequence = useMemo(() => {
        const seq: (string | number)[] = [];

        for (const w of WORDS) {
            seq.push(w, 2000);
        }

        return seq;
    }, []);

    return <h1 class={`text-center text-3xl md:text-6xl mb-8 font-extralight transition ${hidden ? "opacity-0" : "opacity-100"}`}>
        <TypeAnimation key={hidden} sequence={hidden ? ["", 100] : sequence} speed={40} repeat={Infinity} />
    </h1>
}
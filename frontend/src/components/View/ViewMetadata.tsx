import { useSearchStore } from "@modules/SearchStore";

export default function ViewMetadata() {
    const { value: { term, ...metadata } } = useSearchStore();

    return <>
        {
            Object.keys(metadata).sort().map(key => <div class="my-2">
                <h1 class="font-bold mr-2 inline capitalize">{key}</h1>
                <span class="inline">{metadata[key as keyof typeof metadata]}</span>
            </div>)
        }
    </>
}
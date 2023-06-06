import { useRelatedRequest, useRelatedResultsStore } from "@modules/API/Related";
import { toQueryString } from "@modules/Util/Query";
import { useEffect } from "preact/hooks";
import { Link } from "react-router-dom";

interface Props {
    title: string;
}

export default function RelatedTexts({ title }: Props) {
    const { results, state } = useRelatedResultsStore();

    const makeRequest = useRelatedRequest(title);

    useEffect(() => {
        makeRequest();
    }, [title])

    return <div>
        <h1 class="text-2xl font-light mb-8 -ml-4">
            {
                state === "loading" ? "Loading " : "Found "
            }
            {results.length} Related Texts
        </h1>
        {
            results.map((title, i) => (
                <div key={i} class="pb-4 animate-in fade-in slide-in-from-left-4 duration-500">
                    <Link 
                        to={`/view?${toQueryString({ title })}`}
                        className="hover:text-purple-700 transition"
                    >
                        {title}
                    </Link>
                </div>
            ))
        }
    </div>
}
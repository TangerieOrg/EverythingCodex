import RelatedTexts from "@components/RelatedTexts";
import StyledButton from "@components/StyledButton";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useViewPageRequest, useViewPageResultsStore } from "@modules/API/ViewPage";
import { useSearchStore } from "@modules/SearchStore";
import { useQueryParameter } from "@modules/Util/Query";
import { useCallback, useEffect, useState } from "preact/hooks";
import ReactMarkdown from 'react-markdown'
import { Link } from "react-router-dom";

export default function ViewRoute() {
    const title = useQueryParameter("title", "");
    const [isViewingRelated, setIsViewingRelated] = useState(false);
    const { state, text } = useViewPageResultsStore();
    const { actions: searchActions, value: { category, format, term, length } } = useSearchStore();

    const returnToSearch = () => {
        if(!term) searchActions.reset();
    }
    
    const makeRequest = useViewPageRequest({ title, category, format, length });
    const regenerate = useCallback(() => {
        setIsViewingRelated(false);
        return makeRequest()
    }, [title]);

    useEffect(() => {
        return regenerate();
    }, [title]);

    return <div class="min-h-screen w-screen">
        <div class="max-w-3xl mx-auto px-8 py-12">
            <Link to="/" className="text-lg hover:text-purple-700 transition mb-6 block group" onClick={() => returnToSearch()}>
                <FontAwesomeIcon icon={solid("arrow-left")} className="pr-2 group-hover:-translate-x-0.5 transition" />
                Return to Search
            </Link>
            <h1 class="text-3xl font-medium mb-6">{title}</h1>
            {
                category && <div class="my-2">
                    <h1 class="font-bold mr-2 inline">Category</h1>
                    <span class="inline">{category}</span>
                </div>
            }
            {
                format && <div class="my-2">
                    <h1 class="font-bold mr-2 inline">Format</h1>
                    <span class="inline">{format}</span>
                </div>
            }
            {
                length && <div class="my-2">
                    <h1 class="font-bold mr-2 inline">Length</h1>
                    <span class="inline">{length}</span>
                </div>
            }
            {
                text.length > 0 && <div class="prose lg:prose-lg p-4 rounded-lg bg-gray-300 bg-opacity-50 mt-6">
                    <ReactMarkdown children={text} />
                </div>
            }
            {
                state === "finished" && <div class="pt-8 w-full flex flex-col space-y-4 md:space-y-0 md:space-x-4 md:flex-row md:justify-center md:text-center">
                    <StyledButton
                        style="Purple"
                        class="animate-in fade-in duration-500"
                        onClick={() => regenerate()}
                    >
                        <FontAwesomeIcon icon={solid("arrows-rotate")} className="pr-2" />
                        Regenerate
                    </StyledButton>

                    <StyledButton
                        style="Blue"
                        class="animate-in fade-in duration-500"
                        onClick={() => setIsViewingRelated(true)}
                    >
                        <FontAwesomeIcon icon={solid("magnifying-glass")} className="pr-2" />
                        Find Related Texts
                    </StyledButton>
                </div>
            }
            {
                isViewingRelated && <div class="w-full mt-8">
                    <RelatedTexts req={{ title, category, format, length }}/>
                </div>
            }
        </div>
    </div>
}
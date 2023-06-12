import RelatedTexts from "@components/RelatedTexts";
import StyledButton from "@components/StyledButton";
import ViewMetadata from "@components/View/ViewMetadata";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useViewPageRequest, useViewPageResultsStore } from "@modules/API/ViewPage";
import { useGenerateStore } from "@modules/GenerateStore";
import { useSearchStore } from "@modules/SearchStore";
import { useQueryParameter } from "@modules/Util/Query";
import { pick } from "lodash";
import { useCallback, useEffect, useState } from "preact/hooks";
import ReactMarkdown from 'react-markdown'
import { Link, useNavigate } from "react-router-dom";

export default function ViewRoute() {
    const title = useQueryParameter("title", "");
    const [isViewingRelated, setIsViewingRelated] = useState(false);
    const [isEditingTitle, setIsEditingTitle] = useState(false);
    const generateStore = useGenerateStore();
    const navigate = useNavigate();

    const { state, text } = useViewPageResultsStore();
    const { actions: searchActions, value: { term, ...metadata } } = useSearchStore();

    const returnToSearch = () => {
        if(!term) searchActions.reset();
    }

    const returnToGenerate = () => {
        generateStore.actions.set("title", title);
        const m = pick(metadata, ["format", "category", "summary"]);
        for(const key in m) {
            const v = m[key as keyof typeof m]!;
            if(v.length > 0) generateStore.actions.set(key as any, v);
        }
        navigate("/generate");
    }
    
    const makeRequest = useViewPageRequest({ title, ...metadata });
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
            <h1 class={`text-3xl font-medium mb-6`} contentEditable={isEditingTitle}>{title}</h1>
            <ViewMetadata/>
            {
                text.length > 0 && <div class="prose lg:prose-lg p-4 rounded-lg bg-gray-300 bg-opacity-50 mt-6 w-full">
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

                    <StyledButton
                        style="Green"
                        class="animate-in fade-in duration-500"
                        onClick={returnToGenerate}
                    >
                        <FontAwesomeIcon icon={solid("pen-to-square")} className="pr-2" />
                        Edit
                    </StyledButton>
                </div>
            }
            {
                isViewingRelated && <div class="w-full mt-8">
                    <RelatedTexts req={{ title, ...metadata }}/>
                </div>
            }
        </div>
    </div>
}
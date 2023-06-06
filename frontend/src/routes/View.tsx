import StyledButton from "@components/StyledButton";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useViewPageRequest, useViewPageResultsStore } from "@modules/API/ViewPage";
import { useQueryParameter } from "@modules/Util/Query";
import { useEffect } from "preact/hooks";
import ReactMarkdown from 'react-markdown'

export default function ViewRoute() {
    const title = useQueryParameter("title", "");
    
    const { state, text } = useViewPageResultsStore();

    const makeRequest = useViewPageRequest(title);

    useEffect(() => {
        makeRequest();
    }, [title]);

    return <div class="min-h-screen w-screen">
        <div class="max-w-3xl mx-auto px-8 py-16">
            <h1 class="text-3xl font-medium mb-8">{title}</h1>
            
            {
                text.length > 0 && <div class="prose lg:prose-lg p-4 rounded-lg bg-gray-300 bg-opacity-50">
                    <ReactMarkdown children={text}/>
                </div>
            }
            {
                    state === "finished" && <div class="pt-8 w-full flex flex-row justify-center text-center">
                        <StyledButton
                            style="Purple"
                            class="animate-in fade-in duration-500 mx-auto slide-in-from-left-4"
                            onClick={() => makeRequest()}
                        >
                            <FontAwesomeIcon icon={solid("arrows-rotate")} className="pr-2"/>
                            Regenerate
                        </StyledButton>
                    </div>
                }
        </div>
    </div>
}
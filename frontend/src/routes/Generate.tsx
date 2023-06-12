import GenerateForm from "@components/Generate/GenerateForm";
import StyledButton from "@components/StyledButton";
import TypedTitle from "@components/TypedTitle";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useGenerateStore } from "@modules/GenerateStore";
import { toQueryString } from "@modules/Util/Query";
import { Link, useNavigate } from "react-router-dom";

export default function GenerateRoute() {
    const { value } = useGenerateStore();
    const navigate = useNavigate();
    
    const goToPage = () => {
        if((value.title ?? "").trim().length === 0) return;
        const url = `/view?${toQueryString(value)}`;
        navigate(url);
    }

    return <div class="min-h-screen w-screen pb-4 pt-4 md:pt-0">
        <div class="w-full">
            <div class="p-8 mx-auto w-full max-w-2xl">
                <TypedTitle hidden={false} />
                <Link to="/" className="text-lg hover:text-purple-700 transition mb-6 block group">
                    <FontAwesomeIcon icon={solid("arrow-left")} className="pr-2 group-hover:-translate-x-0.5 transition" />
                    Return to Search
                </Link>
                <div class="w-full h-full p-4 bg-gray-300 bg-opacity-50 rounded-lg">
                    <GenerateForm />
                </div>
                <StyledButton
                    style="Purple"
                    class="w-full mt-4"
                    onClick={goToPage}
                >
                    View Page
                </StyledButton>
            </div>
        </div>
    </div>
}
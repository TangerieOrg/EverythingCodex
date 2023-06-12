import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useUserInfoStore } from "@modules/API/UserInfo";
import { useEffect, useState } from "preact/hooks";
import { Link } from "react-router-dom";
import { JSX } from "preact";
import { HistoryItem } from "@modules/API/types";
import { toQueryString } from "@modules/Util/Query";
import { useSubtitle } from "@modules/useTitle";

const HistoryItemMap: Record<"search" | "view", ({ request }: { request: any }) => JSX.Element> = {
    search: ({ request }) => <Link
        className="hover:text-purple-700 transition"
        to={`/search?${toQueryString(request)}`}
    >
        <span class="font-bold mr-4">Search</span>
        <span>{request.term}</span>
    </Link>,
    view: ({ request }) => <Link
        className="hover:text-purple-700 transition"
        to={`/view?${toQueryString(request)}`}
    >
        <span class="font-bold mr-4">View</span>
        <span>{request.title}</span>
    </Link>
}

const HistoryItemComponent = ({item, index} : {item : HistoryItem, index : number}) => {
    const Component = HistoryItemMap[item.path.slice(1) as keyof typeof HistoryItemMap];
    const [isActive, setIsActive] = useState(false);

    useEffect(() => {
        const hdl = setTimeout(() => {
            setIsActive(true);
        }, index * 75);
        return () => clearTimeout(hdl);
    }, []);

    if(!isActive) return null;
    return <div class="pb-4 animate-in fade-in slide-in-from-left-4 duration-500">
        <Component request={item.request}/>
    </div>
}

export default function HistoryRoute() {
    useSubtitle("History");
    const { actions, history, state } = useUserInfoStore();

    useEffect(() => {
        if(state !== "ready") return;
        actions.next();
    }, [state, history]);

    useEffect(() => {
        actions.reset();
        actions.next();
    }, []);

    return <div class="min-h-screen w-screen">
        <div class="max-w-3xl mx-auto px-8 py-12">
            <Link to="/" className="text-lg hover:text-purple-700 transition mb-6 block group">
                <FontAwesomeIcon icon={solid("arrow-left")} className="pr-2 group-hover:-translate-x-0.5 transition" />
                Return to Search
            </Link>

            <h1 class="text-3xl font-medium mb-6">History</h1>
            <div class="max-w-2xl mx-auto mt-8 text-lg">
                {
                    history.filter(x => x.path !== "/related").map((item, i) => (
                        <HistoryItemComponent item={item} index={i} key={i}/>
                    ))
                }
            </div>
        </div>
    </div>
}
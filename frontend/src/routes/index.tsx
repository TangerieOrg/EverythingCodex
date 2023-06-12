import {
    Route,
    Routes,
} from "react-router-dom";
import SearchRoute from "./Search";
import FourOhFour from "./FourOhFour";
import ViewRoute from "./View";
import HistoryRoute from "./History";


export default function Router() {
    return <Routes>
        <Route path="*" element={<FourOhFour/>}/>
        <Route path="/" element={<SearchRoute/>}/>
        <Route path="/search" element={<SearchRoute/>}/>
        <Route path="/view" element={<ViewRoute/>}/>
        <Route path="/history" element={<HistoryRoute/>}/>
    </Routes>
}
import withHOCs from "@modules/Util/withHOCs";
import { useEffect } from "preact/hooks";

if (process.env.NODE_ENV==='development') {
    // Must use require here as import statements are only allowed
    // to exist at top-level.
    require("preact/debug");
}


function App() {

    return (
        <div class="min-h-screen w-screen bg-gray-950">
        </div>
    )
}

// export default withHOCs(App);
export default App;
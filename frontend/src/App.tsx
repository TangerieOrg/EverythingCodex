import withHOCs from "@modules/Util/withHOCs";
import Router from "./routes";


if (process.env.NODE_ENV === 'development') {
    // Must use require here as import statements are only allowed
    // to exist at top-level.
    require("preact/debug");
}



function App() {

    return (
        <div class="min-h-screen w-screen bg-slate-200 text-black">
            <Router/>
        </div>
    )
}

// export default withHOCs(App);
export default App;
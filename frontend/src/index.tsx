if (process.env.NODE_ENV === 'development') {
    // Must use require here as import statements are only allowed
    // to exist at top-level.
    require("preact/debug");
}

import { BrowserRouter } from "react-router-dom";
import { render } from "preact";
import App from "./App";

render(<BrowserRouter>
    <App />
</BrowserRouter>
, document.getElementById("root")!);
if (process.env.NODE_ENV === 'development') {
    // Must use require here as import statements are only allowed
    // to exist at top-level.
    require("preact/debug");
}

import { BrowserRouter } from "react-router-dom";
import { render } from "preact";
import App from "./App";
import { Flowbite } from 'flowbite-react';
import FlowbiteTheme from "./styles/FlowbiteTheme";

render(<BrowserRouter basename={process.env.NODE_ENV === "production" ? "/codex" : undefined}>
    <Flowbite theme={{ theme: FlowbiteTheme }}>
        <App />
    </Flowbite>
</BrowserRouter>
, document.getElementById("root")!);
import { Link } from "react-router-dom";

export default function FourOhFour() {
    return <div class="h-screen w-screen flex flex-col justify-center text-center">
        <h1 class="text-8xl font-extralight -mt-24">Four Oh Four</h1>
        <h2 class="mt-8 text-xl italic">Oh no! This page doesn't exist</h2>
        <span class="mx-auto mt-8">
            <Link to="/">
                <button class="rounded-lg transition duration-200 border-2 border-black hover:border-purple-600 hover:bg-purple-600 hover:text-white px-6 py-3 text-2xl font-light">Home</button>
            </Link>
        </span>
    </div>
}
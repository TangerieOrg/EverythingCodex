/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/**/*.{html,js,ts,jsx,tsx,css,less}",
        'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}'
    ],
    theme: {
        extend: {},
    },
    plugins: [
        require("@tailwindcss/forms")({
            strategy: 'class'
        }),
        require("tailwindcss-animate"),
        require('@tailwindcss/typography'),
        require('flowbite/plugin')
    ],
    darkMode: "class"
}

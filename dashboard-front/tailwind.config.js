/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ["Inter", "sans-serif"],
            },
            colors: {
                primary: {
                    50: "#00a3ab",
                    100: "#009399",
                },
                background: '#222831',
                text: '#eeeeee',
            }
        },
    },
    plugins: [],
}

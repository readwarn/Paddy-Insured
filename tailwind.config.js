const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
    content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
    theme: {
        screens: {
            xs: "400px",
            ...defaultTheme.screens,
        },
        extend: {
            transitionProperty: {
                position: "left right top bottom",
                sizing: "width height",
            },
        },
    },
    plugins: [],

    variants: {
        extend: {
            border: ["group-active"],
            borderColor: ["disabled"],
            borderWidth: ["hover"],
            backgroundColor: ["even", "odd", "disabled"],
        },
    },
};
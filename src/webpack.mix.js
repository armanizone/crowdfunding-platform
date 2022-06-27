const mix = require('laravel-mix');


mix.js('resources/react/app.js', 'public/js')
    .react()
    .postCss('resources/sass/index.css', 'public/css', [
        require('tailwindcss')
    ]);

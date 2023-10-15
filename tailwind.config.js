/** @type {import('tailwindcss').Config} */
export default {
   content: ['./src/**/*.{html,js,svelte,ts}'],
   theme: {
      fontFamily: {
         'sans': ['Josefin Sans', 'ui-sans-serif', 'sans-serif']
      },
      extend: {
         colors: {
            mainText: {
               light: 'hsl(235, 19%, 35%)',
               dark: 'hsl(234, 39%, 85%)',
            },
            fadedText: {
               light: 'hsl(236, 9%, 61%)',
               dark: 'hsl(234, 11%, 52%)',
               hover: {
                  light: 'hsl(235, 19%, 35%)',
                  dark: 'hsl(236, 33%, 92%)',
               },
            },
            lowContrast: {
               light: 'hsl(233, 11%, 84%)',
               dark: 'hsl(233, 14%, 35%)',
            },
            listBackground: {
               light: 'hsl(0, 0%, 98%)',
               dark: 'hsl(235, 24%, 19%)',
            },
            bodyBackground: {
               light: 'hsl(236, 33%, 92%)',
               dark: 'hsl(235, 21%, 11%)',
            },
            brightBlue: 'hsl(220, 98%, 61%)',
            inputBackground: 'linear-gradient(to bottom right, hsl(192, 100%, 67%), hsl(280, 87%, 65%)',
         },
      },
   },
   plugins: [],
}


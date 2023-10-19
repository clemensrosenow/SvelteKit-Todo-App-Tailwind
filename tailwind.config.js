//ts-check
import { join } from 'path';
import { skeleton } from '@skeletonlabs/tw-plugin';
/** @type {import('tailwindcss').Config} */
export default {
   darkMode: 'class',
   content: [
      './src/**/*.{html,js,svelte,ts}',
      join(require.resolve(
         '@skeletonlabs/skeleton'),
         '../**/*.{html,js,svelte,ts}'
      )],
   theme: {
      fontFamily: {
         'sans': ['Jost', 'ui-sans-serif', 'sans-serif']
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
            /*
            gradientBlue: 'hsl(192, 100%, 67%)',
            gradientPurple: 'hsl(280, 87%, 65%)',
            checkboxColor: 'hsl(236, 94%, 66%)'*/
         },
      },
   },
   plugins: [
      require('@tailwindcss/forms'),
      skeleton
   ],
}


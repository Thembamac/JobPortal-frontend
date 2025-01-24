// import { createTheme } from '@mui/material/styles';
import { blue, grey, lightBlue, deepOrange, orange } from '@mui/material/colors';

// export const theme = createTheme({
//     palette: {
//         primary: {
//             main: blue[500]
//         },
//         secondary: {
//             main: lightBlue[800],
//             midNightBlue: "#003366"
//         }
//     }
// });

export const themeColors = (mode) => ({
    palette: {
        mode,
        ...(mode === 'light'
            ? {
                // palette values for light mode
                primary: {
                    main: deepOrange[900],
                    white: "#fff5ee"
                },
                secondary: {
                    main: orange[900],
                    midNightBlue: "#ff9966"
                },
            }
            : {
                // palette values for dark mode
                primary: {
                    main: "#0f4d92",
                    white: "#0f4d92"
                },
                secondary: {
                    main: '#21abcd',
                    midNightBlue: "#21abcd"
                },
                background: {
                    default: "#1e1e1e",
                },
                text: {
                    primary: '#f0f8ff',
                    secondary: '#f0f8ff',
                },
            }),
    },
});

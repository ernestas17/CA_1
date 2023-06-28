export interface IColorTheme {
    background: string;
    activecolor: string;
    hovercolor: string;
    color: string;
}

export const colorThemes = {
    turquoise: {
        background: '#00d1b2',
        activecolor: '#00d1b2',
        hovercolor: '#00b89c',
        color: 'white',
    },

    purple: {
        background: '#485fc7',
        activecolor: '#485fc7',
        hovercolor: '#3a51bb',
        color: 'white',
    },
    blue: {
        background: '#3e8ed0',
        activecolor: '#3e8ed0',
        hovercolor: '#3082c5',
        color: 'white',
    },
    green: {
        background: '#48c78e',
        activecolor: '#48c78e',
        hovercolor: '#3abb81',
        color: 'white',
    },
    yellow: {
        background: '#ffe08a',
        activecolor: '#ffe08a',
        hovercolor: '#ffd970',
        color: 'black',
    },
    red: {
        background: '#f14668',
        activecolor: '#f14668',
        hovercolor: '#ef2e55',
        color: 'white',
    },
    black: {
        background: '#0a0a0a',
        activecolor: '#0a0a0a',
        hovercolor: '#000',
        color: 'white',
    },
    darkgray: {
        background: 'rgba(0,0,0,.7)',
        activecolor: 'rgba(0,0,0,.7)',
        hovercolor: 'rgba(0,0,0,1)',
        color: 'white',
    },
    lightgray: {
        background: '#f5f5f5',
        activecolor: '#f5f5f5',
        hovercolor: '#e8e8e8',
        color: 'rgba(0,0,0,.7)',
    },
    white: {
        background: '#fff',
        activecolor: '#f2f2f2',
        hovercolor: '#f2f2f2',
        color: '#0a0a0a',
    },
};

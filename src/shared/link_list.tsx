import AtlyginimoMokesciuSkaiciuokle from '../components/AtlyginimoMokesciuSkaiciuokle';
import IndividualiosVeiklosMokesciuSkaiciuokle from '../components/IndividualiosVeiklosMokesciuSkaiciuokle';
import Pagrindinis from '../components/Pagrindinis';
import PvmSkaiciuokle from '../components/PvmSkaiciuokle';
import SumaZodziuSkaiciuokle from '../components/SumaZodziuSkaiciuokle';
import ValiutuSkaiciuokle from '../components/ValiutuSkaiciuokle';
import { currentTheme } from './color_themes';

export interface ILinkListItem {
    name: string;
    url: string;
    key: number;
    isIndex?: boolean;
    element: JSX.Element;
}

export const LINK_LIST: ILinkListItem[] = [
    {
        name: 'Pagrindinis',
        url: '/',
        key: 1,
        isIndex: true,
        element: <Pagrindinis />,
    },
    {
        name: 'Atlyginimo ir mokesčių skaičiuoklė',
        url: '/atlyginimo-mokesciu-skaiciuokle',
        key: 2,
        element: <AtlyginimoMokesciuSkaiciuokle headingText='Atlyginimo ir mokesčių skaičiuoklė' theme={currentTheme} />,
    },
    {
        name: 'Individualios veiklos mokesčių skaičiuoklė',
        url: '/individualios-veiklos-skaiciuokle',
        key: 3,
        element: <IndividualiosVeiklosMokesciuSkaiciuokle headingText='Individualios veiklos mokesčių skaičiuoklė' theme={currentTheme} />,
    },
    {
        name: 'PVM skaičiuoklė',
        url: '/pvm-skaiciuokle',
        key: 4,
        element: <PvmSkaiciuokle headingText='PVM skaičiuoklė' theme={currentTheme} />,
    },
    {
        name: 'Valiutų skaičiuoklė',
        url: '/valiutu-skaiciuokle',
        key: 5,
        element: <ValiutuSkaiciuokle headingText='Valiutų skaičiuoklė' theme={currentTheme} />,
    },
    {
        name: 'Suma žodžiais',
        url: '/suma-zodziu-skaiciuokle',
        key: 6,
        element: <SumaZodziuSkaiciuokle headingText='Suma žodžiais' theme={currentTheme} />,
    },
];

import AtlyginimoMokesciuSkaiciuokle from '../components/AtlyginimoMokesciuSkaiciuokle';
import IndividualiosVeiklosMokesciuSkaiciuokle from '../components/IndividualiosVeiklosMokesciuSkaiciuokle';
import Pagrindinis from '../components/Pagrindinis';
import PvmSkaiciuokle from '../components/PvmSkaiciuokle';
import SumaZodziuSkaiciuokle from '../components/SumaZodziuSkaiciuokle';
import ValiutuSkaiciuokle from '../components/ValiutuSkaiciuokle';

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
        element: <AtlyginimoMokesciuSkaiciuokle />,
    },
    {
        name: 'Individualios veiklos mokesčių skaičiuoklė',
        url: '/individualios-veiklos-skaiciuokle',
        key: 3,
        element: <IndividualiosVeiklosMokesciuSkaiciuokle />,
    },
    {
        name: 'PVM skaičiuoklė',
        url: '/pvm-skaiciuokle',
        key: 4,
        element: <PvmSkaiciuokle />,
    },
    {
        name: 'Valiutų skaičiuoklė',
        url: '/valiutu-skaiciuokle',
        key: 5,
        element: <ValiutuSkaiciuokle />,
    },
    {
        name: 'Suma žodžiais',
        url: '/suma-zodziu-skaiciuokle',
        key: 6,
        element: <SumaZodziuSkaiciuokle />,
    },
];

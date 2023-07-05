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
    description?: string;
    element: JSX.Element;
    imagesrc?: string;
}

const layoutHeightBreakpoint = '768px';

export const LINK_LIST: ILinkListItem[] = [
    {
        name: 'Pagrindinis',
        url: '/',
        key: 1,
        isIndex: true,
        element: <Pagrindinis layoutbreakpoint={layoutHeightBreakpoint} />,
    },
    {
        name: 'Atlyginimo ir mokesčių skaičiuoklė',
        url: '/atlyginimo-mokesciu-skaiciuokle',
        key: 2,
        imagesrc: '../../images/atlyginimo_ir_mokesciu_skaiciuokle.png',
        description: 'Atlyginimo skaičiuoklė automatiškai paskaičiuos privalomus mokėti mokesčius bei atlyginimą prieš ir po mokesčių.',
        element: (
            <AtlyginimoMokesciuSkaiciuokle
                headingText='Atlyginimo ir mokesčių skaičiuoklė'
                theme={currentTheme}
                layoutbreakpoint={layoutHeightBreakpoint}
            />
        ),
    },
    {
        name: 'Individualios veiklos mokesčių skaičiuoklė',
        url: '/individualios-veiklos-skaiciuokle',
        key: 3,
        imagesrc: '../../images/individualios_veiklos_mokesciu_skaiciuokle.png',
        description:
            'Individualios veiklos skaičiuoklė dirbantiems individualiai. Sužinokite, kiek mokesčių privalote mokėti bei koks pelnas lieka Jums.',
        element: (
            <IndividualiosVeiklosMokesciuSkaiciuokle
                headingText='Individualios veiklos mokesčių skaičiuoklė'
                theme={currentTheme}
                layoutbreakpoint={layoutHeightBreakpoint}
            />
        ),
    },
    {
        name: 'PVM skaičiuoklė',
        url: '/pvm-skaiciuokle',
        key: 4,
        imagesrc: '../../images/pvm_skaiciuokle.png',
        description: 'PVM skaičiuoklė leis Jums lengvai ir greitai paskaičiuoti sumą su PVM ir be PVM.',
        element: <PvmSkaiciuokle headingText='PVM skaičiuoklė' theme={currentTheme} layoutbreakpoint={layoutHeightBreakpoint} />,
    },
    {
        name: 'Valiutų skaičiuoklė',
        url: '/valiutu-skaiciuokle',
        key: 5,
        imagesrc: '../../images/valiutu_skaiciuokle.jpg',
        description: 'Valiutų skačiuoklė leis greitai konvertuoti reikiamas valiutas ir sužinoti tikslų jų santykį.',
        element: <ValiutuSkaiciuokle headingText='Valiutų skaičiuoklė' theme={currentTheme} layoutbreakpoint={layoutHeightBreakpoint} />,
    },
    {
        name: 'Suma žodžiais',
        url: '/suma-zodziu-skaiciuokle',
        key: 6,
        imagesrc: '../../images/suma_zodziais.jpg',
        description:
            'Dažnai tenka įvairiose formose, sąskaitose ar kituose naudoti sumą žodžiais, todėl siūlome sumos žodžiais generatorių, kad palengvinti darbą.',
        element: <SumaZodziuSkaiciuokle headingText='Suma žodžiais' theme={currentTheme} layoutbreakpoint={layoutHeightBreakpoint} />,
    },
];

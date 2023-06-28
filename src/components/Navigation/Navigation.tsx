import { StyledBurgerWrapper, StyledNav } from './styles';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { ILinkListItem } from '../../shared/link_list';
import { IColorTheme } from '../../shared/color_themes';

export interface INavigationProps {
    breakpoint?: string;
    currentUrl?: string | null;
    linkList?: ILinkListItem[];
    burgeralign?: NAV_ALIGNMENT;
    desktopalign?: NAV_ALIGNMENT;
    theme: IColorTheme;
}

export enum NAV_ALIGNMENT {
    left = 'left',
    center = 'center',
    right = 'right',
}

const Navigation = ({ breakpoint, currentUrl, linkList, burgeralign, desktopalign, theme }: INavigationProps) => {
    const [navActive, setNavActive] = useState(false);

    return (
        <StyledNav breakpoint={breakpoint} burgeralign={burgeralign} desktopalign={desktopalign} theme={theme}>
            <StyledBurgerWrapper breakpoint={breakpoint} burgeralign={burgeralign} desktopalign={desktopalign}>
                <i className={`fa-solid ${navActive ? 'fa-xmark' : 'fa-bars'}`} onClick={() => setNavActive((prev) => !prev)}></i>
            </StyledBurgerWrapper>
            <ul className={navActive ? 'active' : ''}>
                {linkList &&
                    linkList.map((link) => {
                        return (
                            <li key={link.key} className={`${currentUrl === link.url ? 'active' : ''}`} onClick={() => setNavActive(() => false)}>
                                <Link to={link.url}>{link.name}</Link>
                            </li>
                        );
                    })}
            </ul>
        </StyledNav>
    );
};

export default Navigation;

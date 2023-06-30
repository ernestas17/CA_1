import { StyledHeader } from './styles';
import Navigation from '../Navigation';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { LINK_LIST } from '../../shared/link_list';
import { NAV_ALIGNMENT } from '../Navigation/Navigation';
import { IColorTheme, currentTheme } from '../../shared/color_themes';
// import { navBreakpoint, layoutHeightBreakpoint } from '../../shared/color_themes';

export interface IHeaderProps {
    breakpoint: string;
    layoutbreakpoint: string;
    theme: IColorTheme;
}

const navigationBreakpoint = '1220px';
const layoutHeightBreakpoint = '768px';

const Header = () => {
    const location = useLocation();
    const { pathname } = location;
    const [url, setUrl] = useState<string | null>(null);

    useEffect(() => {
        setUrl(pathname);
    }, [location, pathname]);

    return (
        <StyledHeader breakpoint={navigationBreakpoint} theme={currentTheme} layoutbreakpoint={layoutHeightBreakpoint}>
            <Navigation
                theme={currentTheme}
                breakpoint={navigationBreakpoint}
                currentUrl={url}
                linkList={LINK_LIST}
                burgeralign={NAV_ALIGNMENT.right}
                desktopalign={NAV_ALIGNMENT.center}
            />
        </StyledHeader>
    );
};

export default Header;

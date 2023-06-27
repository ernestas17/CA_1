import { StyledHeader } from './styles';
import Navigation from '../Navigation';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { LINK_LIST } from '../../shared/link_list';
import { BURGER_ALIGNMENT } from '../Navigation/Navigation';

const Header = () => {
    const location = useLocation();
    const { pathname } = location;
    const [url, setUrl] = useState<string | null>(null);

    useEffect(() => {
        setUrl(pathname);
    }, [location, pathname]);

    return (
        <StyledHeader>
            <Navigation breakpoint={'1024px'} currentUrl={url} linkList={LINK_LIST} burgeralign={BURGER_ALIGNMENT.right} />
        </StyledHeader>
    );
};

export default Header;

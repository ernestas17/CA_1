import { StyledMain } from './Pages/styles';
import { LINK_LIST } from '../shared/link_list';

import { IPageProps } from './Pages/types';

import CardsContainer from './organisms/CardsContainer';

const Pagrindinis = ({ layoutbreakpoint }: IPageProps) => {
    return (
        <StyledMain style={{ maxWidth: '1600px', justifyContent: 'center', alignItems: 'center' }} layoutbreakpoint={layoutbreakpoint}>
            <CardsContainer carddata={LINK_LIST} />
        </StyledMain>
    );
};

export default Pagrindinis;

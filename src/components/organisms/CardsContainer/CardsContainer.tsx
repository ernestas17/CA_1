import { StyledCardsContainer } from './styles';
import { Link } from 'react-router-dom';
import Card from '../../atoms/Card';
import { ILinkListItem } from '../../../shared/link_list';

interface ICardsContainerProps {
    carddata: ILinkListItem[];
}

const CardsContainer = ({ carddata }: ICardsContainerProps) => {
    return (
        <StyledCardsContainer className='cards-container'>
            {carddata.map((singleLink) => {
                if (!singleLink.isIndex) {
                    return (
                        <Link key={singleLink.key} to={singleLink.url}>
                            <Card title={singleLink.name} description={singleLink.description} imagesrc={singleLink?.imagesrc} />
                        </Link>
                    );
                }
            })}
        </StyledCardsContainer>
    );
};

export default CardsContainer;

import { StyledCardWrapper, StyledCardHeading, StyledCardImage, StyledCardDescription } from './style';

interface ICardProps {
    title?: string;
    imagesrc?: string;
    description?: string;
}

const Card = ({ title, imagesrc, description }: ICardProps) => {
    return (
        <StyledCardWrapper className='card'>
            {imagesrc && <StyledCardImage src={imagesrc} alt='card-image' className='card-image' />}
            {title && <StyledCardHeading className='card-heading'>{title}</StyledCardHeading>}

            {description && <StyledCardDescription className='card-description'>{description}</StyledCardDescription>}
        </StyledCardWrapper>
    );
};

export default Card;

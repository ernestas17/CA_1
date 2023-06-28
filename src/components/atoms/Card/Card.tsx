import {
  StyledCardWrapper,
  StyledCardWrapperInside,
  StyledCardContent,
} from './style';

interface ICardProps {
  title: string;
}

const Card = ({ title }: ICardProps) => {
  return (
    <StyledCardWrapper className='card'>
      <StyledCardWrapperInside className='card-content'>
        <StyledCardContent className='content'>{title}</StyledCardContent>
      </StyledCardWrapperInside>
    </StyledCardWrapper>
  );
};

export default Card;

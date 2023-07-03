import { styled } from 'styled-components';
import { ILoaderProps } from './Loader';

export const StyledLoaderWrapper = styled.div<ILoaderProps>`
    background-color: ${(props) => (props.backgroundClr ? props.backgroundClr : 'transparent')};
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;

    position: ${(props) => (props.fullScreen ? 'fixed' : 'relative')};
    left: 0;
    top: 0;

    i {
        font-size: ${(props) => (props.iconSize ? props.iconSize : '24px')};
        color: ${(props) => (props.iconColor ? props.iconColor : '#7700ff')};
        animation-name: spin;
        animation-duration: 2s;
        animation-iteration-count: infinite;
        animation-timing-function: ${(props) => (props.timingFunction ? props.timingFunction : 'cubic-bezier(0.68, -0.55, 0.265, 1.55)')};
        animation-direction: ${(props) => (props.direction ? props.direction : 'normal')};
    }

    @keyframes spin {
        from {
            transform: rotate(0deg);
        }
        to {
            transform: rotate(360deg);
        }
    }
`;

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { StyleSheetManager } from 'styled-components';
import isPropValid from '@emotion/is-prop-valid';
import './index.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <StyleSheetManager shouldForwardProp={isPropValid}>
        <React.StrictMode>
            <App />
        </React.StrictMode>
    </StyleSheetManager>
);

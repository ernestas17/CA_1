import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Header from '../components/Header';

describe('Header', () => {
    it('should have headlines', () => {
        render(
            <BrowserRouter>
                <Header />
            </BrowserRouter>
        );

        expect(screen.getByText(/Pagrindinis/i)).toBeInTheDocument();
        expect(screen.getByText(/Atlyginimo ir mokesčių skaičiuoklė/i)).toBeInTheDocument();
        expect(screen.getByText(/Individualios veiklos mokesčių skaičiuoklė/i)).toBeInTheDocument();
        expect(screen.getByText(/PVM skaičiuoklė/i)).toBeInTheDocument();
        expect(screen.getByText(/Valiutų skaičiuoklė/i)).toBeInTheDocument();
        expect(screen.getByText(/Suma žodžiais/i)).toBeInTheDocument();
    });
});

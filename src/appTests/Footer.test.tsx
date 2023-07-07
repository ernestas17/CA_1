import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Footer from '../components/Footer';

describe('Footer', () => {
    it('should have text and year', () => {
        render(
            <BrowserRouter>
                <Footer />
            </BrowserRouter>
        );

        expect(screen.getByText(/Visos teisės saugomos/i)).toBeInTheDocument();
        expect(screen.getByText(/2023/i)).toBeInTheDocument();
    });
});

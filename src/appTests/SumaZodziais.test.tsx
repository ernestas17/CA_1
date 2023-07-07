import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { currentTheme } from '../shared/color_themes';
import SumaZodziais from '../components/organisms/SumaZodziais';

describe('SumaZodziais', () => {
    it('numbers should change to text', async () => {
        const { container } = render(
            <BrowserRouter>
                <SumaZodziais theme={currentTheme} />
            </BrowserRouter>
        );

        const input = screen.getByDisplayValue('');
        const output = container.getElementsByClassName('output')[0];

        fireEvent.change(input, { target: { value: 55 } });
        expect(output).toHaveTextContent('penkiasdešimt penki');

        fireEvent.change(input, { target: { value: 3 } });
        expect(output).toHaveTextContent('trys');

        fireEvent.change(input, { target: { value: 2894 } });
        expect(output).toHaveTextContent('du tūkstančiai aštuoni šimtai devyniasdešimt keturi');
    });
});

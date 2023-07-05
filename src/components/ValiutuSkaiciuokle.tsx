import { ChangeEvent, useCallback, useEffect, useRef, useState } from 'react';
import currency_api from '../shared/api/currency_api';
import {
    StyledAddNewCurrencyContainer,
    StyledAddNewCurrencyWrapper,
    StyledDivider,
    StyledMain,
    StyledSection,
    StyledSectionContent,
    StyledSectionHeadingWrapper,
    StyledSelectedCurrencyWrapper,
    StyledWrapper,
    StyledYearSelectWrapper,
} from './Pages/styles';

export interface ICurrency {
    code: string;
    decimalDigits: number;
    name: string;
    namePlural: string;
    rounding: number;
    symbol: string;
    symbolNative: string;
}

import { IPageProps } from './Pages/types';

export interface ICurrencyObject {
    [key: string]: ICurrency;
}

const minDate = '2000-01-01';
const today = new Date().toLocaleDateString('en-CA');

const ValiutuSkaiciuokle = ({ headingText, theme, layoutbreakpoint }: IPageProps) => {
    const [availableCurrencies, setAvailableCurrencies] = useState<null | ICurrencyObject>(null);
    const [decimalNumbers, setDecimalNumbers] = useState<number>(2);
    const [currencyInputList, setCurrencyInputList] = useState<string[]>(['CAD', 'PLN', 'USD', 'NZD', 'MXN', 'SGD']);
    const [currentDate, setCurrentDate] = useState<string>(today);
    const [currencyCode, setCurrencyCode] = useState<string>('EUR');

    const currencyInputRef = useRef();

    const updateOutputValues = useCallback(
        async (target: HTMLInputElement | undefined) => {
            if (!target || !target.value) return;
            const targetInputValue = parseFloat(target.value);
            const targetInputCurrency = target.getAttribute('data-currency') as string;

            const { isToday, data } = await getCurrencyRates(currentDate, targetInputCurrency);

            const allCurrencyInputs: NodeListOf<HTMLInputElement> = document.querySelectorAll('.currency-output');

            allCurrencyInputs.forEach((input) => {
                const inputCurrency = input.getAttribute('data-currency') as string;
                const availableData = isToday ? parseFloat(data[inputCurrency]) : parseFloat(data[currentDate][inputCurrency]);

                input.value = (availableData * targetInputValue).toFixed(decimalNumbers);
            });
        },
        [currentDate, decimalNumbers]
    );

    const getCurrencyRates = async (date: string, currency: string) => {
        const isToday = today === date;

        const data = isToday ? await currency_api.getLatestRates(currency) : await currency_api.getHistoricalRates(date, currency);

        return { isToday, data };
    };

    const addNewCurrency = (e: ChangeEvent) => {
        const currencyValue = (e.target as HTMLSelectElement).value;
        if (currencyInputList.includes(currencyValue)) return console.log('Input already exists');

        if (currencyCode) setCurrencyInputList((prev) => [...prev, currencyValue]);

        updateOutputValues(currencyInputRef.current);
    };

    const removeCurrencyInput = (e: React.MouseEvent<HTMLElement>) => {
        const currentCurrency = (e.target as HTMLElement).getAttribute('data-currency') as string;

        const index = currencyInputList.indexOf(currentCurrency);

        console.log(currentCurrency);
        console.log(index);

        if (index < 0) return;
        const newCurrencyInputList = [...currencyInputList];
        newCurrencyInputList.splice(index, 1);

        setCurrencyInputList(() => newCurrencyInputList);
    };

    const currencyChangeHandler = (e) => {
        const index = currencyInputList.indexOf(currencyCode);

        if (index >= 0) [...currencyInputList].splice(index, 1);

        setCurrencyCode(() => e.target.value);
    };

    useEffect(() => {
        (async () => {
            const data = await currency_api.getAvailableCurrencies();
            setAvailableCurrencies(() => data);
        })();
    }, []);

    useEffect(() => {
        if (currencyInputRef.current) updateOutputValues(currencyInputRef.current);
    }, [currencyCode, updateOutputValues]);

    console.log('updating');

    return (
        <StyledMain layoutbreakpoint={layoutbreakpoint}>
            <StyledSection>
                <StyledSectionHeadingWrapper theme={theme}>
                    <h3>{headingText}</h3>
                </StyledSectionHeadingWrapper>

                <StyledSectionContent theme={theme}>
                    <StyledYearSelectWrapper>
                        <label htmlFor='date-select'>Valiutos kurso data: </label>
                        <input
                            id='date-select'
                            value={currentDate}
                            min={minDate}
                            max={today}
                            onChange={(e) => setCurrentDate(e.target.value)}
                            type='date'
                            name='date-select'
                        />
                    </StyledYearSelectWrapper>

                    <StyledDivider></StyledDivider>

                    <StyledWrapper>
                        <StyledSelectedCurrencyWrapper>
                            <div>
                                <label htmlFor='selected-currency'>Pasirinkta valiuta</label>
                                <select onChange={(e) => currencyChangeHandler(e)} name='selected-currency' id='selected-currency'>
                                    {availableCurrencies &&
                                        Object.keys(availableCurrencies).map((currency) => {
                                            const currentCurrency = availableCurrencies[currency];
                                            const { code, name } = currentCurrency;
                                            return (
                                                <option key={code} value={code}>
                                                    {`${name} (${code})`}
                                                </option>
                                            );
                                        })}
                                </select>
                            </div>

                            <div>
                                <label htmlFor='currency-input'>Suma</label>
                                <input
                                    ref={currencyInputRef}
                                    onChange={(e) => updateOutputValues(e.target)}
                                    className='currency-input'
                                    id='currency-input'
                                    name='currency-input'
                                    type='text'
                                    data-currency={currencyCode}
                                />
                            </div>
                        </StyledSelectedCurrencyWrapper>

                        <StyledAddNewCurrencyContainer>
                            <StyledAddNewCurrencyWrapper>
                                <div>
                                    <label htmlFor='currencies'>Pridėti valiutą</label>
                                    <select onChange={addNewCurrency} name='currencies' id='currencies'>
                                        {availableCurrencies &&
                                            Object.keys(availableCurrencies).map((currency) => {
                                                const currentCurrency = availableCurrencies[currency];
                                                const { code, name } = currentCurrency;
                                                if (currencyCode !== code) {
                                                    return (
                                                        <option key={code} value={code}>
                                                            {`${name} (${code})`}
                                                        </option>
                                                    );
                                                }
                                            })}
                                    </select>
                                </div>

                                <div>
                                    <label>Skaičiai po kablelio</label>
                                    <select
                                        onChange={(e) => setDecimalNumbers(() => parseInt((e.target as HTMLSelectElement).value))}
                                        name='decimal-numbers'
                                        id='decimal-numbers'
                                        defaultValue={2}
                                    >
                                        {[0, 1, 2, 3, 4, 5].map((num) => {
                                            return (
                                                <option key={'decimal-numbers-' + num} value={num}>
                                                    {num}
                                                </option>
                                            );
                                        })}
                                    </select>
                                </div>
                            </StyledAddNewCurrencyWrapper>

                            <div className='currency-output-list'>
                                {currencyInputList.map((currency) => {
                                    if (currencyCode !== currency) {
                                        return (
                                            <div
                                                style={{ display: 'flex', gap: '5px', alignItems: 'center' }}
                                                key={currency + '-' + 'input-wrapper'}
                                                className='currency-output-wrapper'
                                            >
                                                <i
                                                    onClick={(e) => removeCurrencyInput(e)}
                                                    data-currency={currency}
                                                    className='fa-solid fa-xmark currency-remove'
                                                ></i>
                                                <input
                                                    onChange={(e) => updateOutputValues(e.target)}
                                                    className='currency-output'
                                                    type='text'
                                                    data-currency={currency}
                                                />
                                                <div style={{ display: 'flex', gap: '5px', alignItems: 'center' }} className='currency-info-wrapper'>
                                                    <span className='currency-code'>{currency}</span>
                                                    <img
                                                        src={`https://wise.com/public-resources/assets/flags/rectangle/${currency.toLowerCase()}.png`}
                                                        alt='currency flag'
                                                    />
                                                </div>
                                            </div>
                                        );
                                    }
                                })}
                            </div>
                        </StyledAddNewCurrencyContainer>
                    </StyledWrapper>
                </StyledSectionContent>
            </StyledSection>
        </StyledMain>
    );
};

export default ValiutuSkaiciuokle;

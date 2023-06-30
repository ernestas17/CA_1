import { ChangeEvent, useCallback, useEffect, useRef, useState } from 'react';
import currency_api from '../shared/api/currency_api';
import {
    StyledAddNewCurrencyContainer,
    StyledAddNewCurrencyWrapper,
    StyledCurrencyOutputContainer,
    StyledCurrencyOutputInfoWrapper,
    StyledCurrencyOutputList,
    StyledDivider,
    StyledMain,
    StyledSection,
    StyledSectionContent,
    StyledSectionHeadingWrapper,
    StyledSelectedCurrencyWrapper,
    StyledSingleOutputWrapper,
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
import Input from './atoms/Input';
import Select from './atoms/Select';

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
                        <Input
                            type='date'
                            identifier='date-select'
                            changeEvent={(e) => setCurrentDate(e.target.value)}
                            min={minDate}
                            max={today}
                            value={currentDate}
                        />
                    </StyledYearSelectWrapper>

                    <StyledDivider></StyledDivider>

                    <StyledWrapper>
                        <StyledSelectedCurrencyWrapper>
                            <div>
                                <label htmlFor='selected-currency'>Pasirinkta valiuta</label>

                                <Select theme={theme} changeEvent={(e) => currencyChangeHandler(e)} identifier='selected-currency'>
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
                                </Select>
                            </div>

                            <div>
                                <label htmlFor='currency-input'>Suma</label>

                                <Input
                                    type='text'
                                    changeEvent={(e) => updateOutputValues(e?.target)}
                                    identifier='currency-input'
                                    innerRef={currencyInputRef}
                                    data={{ 'data-currency': currencyCode }}
                                />
                            </div>
                        </StyledSelectedCurrencyWrapper>

                        <StyledAddNewCurrencyContainer>
                            <StyledAddNewCurrencyWrapper>
                                <div>
                                    <label htmlFor='currencies'>Pridėti valiutą</label>

                                    <Select theme={theme} changeEvent={addNewCurrency} identifier='currencies'>
                                        <option disabled selected key='pasirinkite' value='pasirinkite'>
                                            - Pasirinkite -
                                        </option>
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
                                    </Select>
                                </div>

                                <div>
                                    <label>Skaičiai po kablelio</label>

                                    <Select
                                        value={2}
                                        theme={theme}
                                        changeEvent={(e) => setDecimalNumbers(() => parseInt((e.target as HTMLSelectElement).value))}
                                        identifier='decimal-numbers'
                                    >
                                        {[0, 1, 2, 3, 4, 5].map((num) => {
                                            return (
                                                <option key={'decimal-numbers-' + num} value={num}>
                                                    {num}
                                                </option>
                                            );
                                        })}
                                    </Select>
                                </div>
                            </StyledAddNewCurrencyWrapper>

                            <StyledCurrencyOutputList>
                                {currencyInputList.map((currency) => {
                                    if (currencyCode !== currency) {
                                        return (
                                            <StyledSingleOutputWrapper key={currency + '-' + 'input-wrapper'} className='currency-output-wrapper'>
                                                <StyledCurrencyOutputInfoWrapper className='currency-info-wrapper'>
                                                    <img
                                                        src={`https://wise.com/public-resources/assets/flags/rectangle/${currency.toLowerCase()}.png`}
                                                        alt='currency flag'
                                                    />
                                                    <span className='currency-code'>{currency}</span>
                                                </StyledCurrencyOutputInfoWrapper>

                                                <StyledCurrencyOutputContainer theme={theme}>
                                                    <Input type='text' disabled identifier='currency-output' data={{ 'data-currency': currency }} />

                                                    <i
                                                        onClick={(e) => removeCurrencyInput(e)}
                                                        data-currency={currency}
                                                        className='fa-solid fa-xmark currency-remove'
                                                    ></i>
                                                </StyledCurrencyOutputContainer>
                                            </StyledSingleOutputWrapper>
                                        );
                                    }
                                })}
                            </StyledCurrencyOutputList>
                        </StyledAddNewCurrencyContainer>
                    </StyledWrapper>
                </StyledSectionContent>
            </StyledSection>
        </StyledMain>
    );
};

export default ValiutuSkaiciuokle;

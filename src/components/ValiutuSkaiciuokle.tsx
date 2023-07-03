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
import Label from './atoms/Label';
import Loader from './atoms/Loader';

export interface ICurrencyObject {
    [key: string]: ICurrency;
}

const minDate = '2000-01-01';
const today = new Date().toLocaleDateString('en-CA');

const ValiutuSkaiciuokle = ({ headingText, theme, layoutbreakpoint }: IPageProps) => {
    const [availableCurrencies, setAvailableCurrencies] = useState<null | ICurrencyObject>(null);
    const [currencyRates, setCurrencyRates] = useState<null | ICurrencyObject>(null);
    const [decimalNumbers, setDecimalNumbers] = useState<number>(2);
    const [currencyInputList, setCurrencyInputList] = useState<string[]>(['CAD', 'PLN', 'USD', 'NZD', 'MXN', 'SGD']);
    const [currentDate, setCurrentDate] = useState<string>(today);
    const [currencyCode, setCurrencyCode] = useState<string>('EUR');

    const currencyInputRef = useRef();

    const getCurrencyRates = async (date: string, currency: string) => {
        const isToday = today === date;

        const data = isToday ? await currency_api.getLatestRates(currency) : await currency_api.getHistoricalRates(date, currency);

        setCurrencyRates(() => data);
    };
    const updateOutputValues = useCallback(
        async (target: HTMLInputElement | undefined) => {
            if (!target || !target.value) return;
            const targetInputValue = parseFloat(target.value);
            // if (targetInputValue < 0) return (target.value = 0);

            const isToday = today === currentDate;

            const allCurrencyInputs: NodeListOf<HTMLInputElement> = document.querySelectorAll('.currency-output');

            allCurrencyInputs.forEach((input) => {
                if (currencyRates) {
                    if (!isToday) if (!currencyRates[currentDate]) return;

                    const inputCurrency = input.getAttribute('data-currency') as string;

                    const availableData = isToday
                        ? parseFloat(currencyRates?.[inputCurrency])
                        : parseFloat(currencyRates?.[currentDate]?.[inputCurrency]);

                    input.value = (availableData * targetInputValue).toFixed(decimalNumbers);
                }
            });
        },
        [currentDate, decimalNumbers, currencyRates]
    );

    const addNewCurrency = (e: ChangeEvent) => {
        const currencyValue = (e.target as HTMLSelectElement).value;
        if (currencyInputList.includes(currencyValue)) return;

        if (currencyCode) setCurrencyInputList((prev) => [...prev, currencyValue]);

        updateOutputValues(currencyInputRef.current);
    };

    const removeCurrencyInput = (e: React.MouseEvent<HTMLElement>) => {
        const currentCurrency = (e.target as HTMLElement).getAttribute('data-currency') as string;

        const index = currencyInputList.indexOf(currentCurrency);

        if (index < 0) return;
        const newCurrencyInputList = [...currencyInputList];
        newCurrencyInputList.splice(index, 1);

        setCurrencyInputList(() => newCurrencyInputList);
    };

    const currencyChangeHandler = (e: ChangeEvent) => {
        const target = e.target as HTMLSelectElement;

        const index = currencyInputList.indexOf(currencyCode);

        if (index >= 0) [...currencyInputList].splice(index, 1);

        setCurrencyCode(() => target.value);
    };

    useEffect(() => {
        (async () => {
            const data = await currency_api.getAvailableCurrencies();
            setAvailableCurrencies(() => data);
        })();
    }, []);

    useEffect(() => {
        if (currencyInputRef.current) updateOutputValues(currencyInputRef.current);
    }, [currencyCode, updateOutputValues, currencyInputList, currentDate]);

    useEffect(() => {
        getCurrencyRates(currentDate, currencyCode);
    }, [currentDate, currencyCode]);

    return (
        <StyledMain layoutbreakpoint={layoutbreakpoint}>
            <StyledSection>
                <StyledSectionHeadingWrapper theme={theme}>
                    <h3>{headingText}</h3>
                </StyledSectionHeadingWrapper>

                <StyledSectionContent theme={theme}>
                    {!currencyRates && <Loader iconSize='50px' iconColor={theme?.background} />}
                    {currencyRates && (
                        <>
                            <StyledYearSelectWrapper>
                                <Label targetinput='date-select' size='18px'>
                                    Valiutos kurso data:
                                </Label>
                                <Input
                                    theme={theme}
                                    type='date'
                                    identifier='date-select'
                                    changeEvent={(e) => setCurrentDate(() => e.target.value)}
                                    min={minDate}
                                    max={today}
                                    value={currentDate}
                                />
                            </StyledYearSelectWrapper>

                            <StyledDivider></StyledDivider>

                            <StyledWrapper>
                                <StyledSelectedCurrencyWrapper>
                                    <div>
                                        <Label targetinput='selected-currency' size='18px'>
                                            Pasirinkta valiuta
                                        </Label>

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
                                        <Label targetinput='currency-input' size='18px'>
                                            Suma
                                        </Label>
                                        <Input
                                            type='number'
                                            changeEvent={(e) => updateOutputValues(e?.target)}
                                            identifier='currency-input'
                                            innerRef={currencyInputRef}
                                            data={{ 'data-currency': currencyCode }}
                                            theme={theme}
                                            min='0'
                                        />
                                    </div>
                                </StyledSelectedCurrencyWrapper>

                                <StyledAddNewCurrencyContainer>
                                    <StyledAddNewCurrencyWrapper>
                                        <div>
                                            <Label targetinput='currencies' size='18px'>
                                                Pridėti valiutą
                                            </Label>

                                            <Select theme={theme} changeEvent={addNewCurrency} identifier='currencies' defaultvalue={'pasirinkite'}>
                                                <option disabled key='pasirinkite' value='pasirinkite'>
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
                                            <Label targetinput='decimal-numbers' size='18px'>
                                                Skaičiai po kablelio
                                            </Label>

                                            <Select
                                                defaultvalue={2}
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
                                                    <StyledSingleOutputWrapper
                                                        key={currency + '-' + 'input-wrapper'}
                                                        className='currency-output-wrapper'
                                                    >
                                                        <StyledCurrencyOutputInfoWrapper className='currency-info-wrapper'>
                                                            <img
                                                                src={`https://wise.com/public-resources/assets/flags/rectangle/${currency.toLowerCase()}.png`}
                                                                alt='currency flag'
                                                            />
                                                            <span className='currency-code'>{currency}</span>
                                                        </StyledCurrencyOutputInfoWrapper>

                                                        <StyledCurrencyOutputContainer theme={theme}>
                                                            <Input
                                                                theme={theme}
                                                                type='text'
                                                                disabled
                                                                identifier='currency-output'
                                                                data={{ 'data-currency': currency }}
                                                            />

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
                        </>
                    )}
                </StyledSectionContent>
            </StyledSection>
        </StyledMain>
    );
};

export default ValiutuSkaiciuokle;

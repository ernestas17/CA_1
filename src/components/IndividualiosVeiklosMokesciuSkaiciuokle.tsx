import { useState, ChangeEvent, useEffect } from 'react';
import {
  StyledMain,
  StyledSection,
  StyledSectionHeadingWrapper,
  StyledSectionContent,
  StyledDivider,
} from './Pages/styles';
import { IPageProps } from './Pages/types';
import Input from './atoms/Input';

const IndividualiosVeiklosMokesciuSkaiciuokle = ({
  headingText,
  theme,
  layoutbreakpoint,
}: IPageProps) => {
  const [incomeReceived, setIncomeReceived] = useState<null | number>(null);
  const [radioValue, setRadioValue] = useState<null | number>(null);
  const [expensesValue, setExpensesValue] = useState<null | number>(null);
  const [checkboxValue, setCheckboxValue] = useState<null | number>(null);
  const [paidSSI, setPaidSSI] = useState<null | number>(null);
  const [paidCHI, setPaidCHI] = useState<null | number>(null);
  const [taxableIncome, setTaxableIncome] = useState<number>(0);
  const [calcSSI, setCalcSSI] = useState<number>(0);
  const [calcCHI, setCalcCHI] = useState<number>(0);
  const [payableSSI, setPayableSSI] = useState<number>(0);
  const [payableCHI, setPayableCHI] = useState<number>(0);
  const [taxableProfit, setTaxableProfit] = useState<number>(0);
  const [calcPIT, setCalcPIT] = useState<number>(0);

  useEffect(() => {
    const calckSSI =
      checkboxValue === 1
        ? (
            Math.round(
              (incomeReceived - incomeReceived * 0.3) * 0.9 * 0.1552 * 100
            ) / 100
          ).toFixed(2) > 11244.35
          ? 11244.35
          : (
              Math.round(
                (incomeReceived - incomeReceived * 0.3) * 0.9 * 0.1552 * 100
              ) / 100
            ).toFixed(2)
        : (
            Math.round(
              (incomeReceived - incomeReceived * 0.3) * 0.9 * 0.1252 * 100
            ) / 100
          ).toFixed(2) > 9070.83
        ? 9070.83
        : (
            Math.round(
              (incomeReceived - incomeReceived * 0.3) * 0.9 * 0.1252 * 100
            ) / 100
          ).toFixed(2);

    const calcCHI = (
      Math.round((incomeReceived - incomeReceived * 0.3) * 0.9 * 0.0698 * 100) /
      100
    ).toFixed(2);

    const finalCalcCHI =
      calcCHI < 703.56 ? 703.56 : calcCHI > 5057.06 ? 5057.06 : calcCHI;

    const taxableProfit =
      radioValue === 0.3
        ? incomeReceived - incomeReceived * 0.3
        : incomeReceived - expensesValue - payableSSI - payableCHI;
    setCheckboxValue(checkboxValue);
    setCalcSSI(calckSSI);
    setCalcCHI(finalCalcCHI);

    if (taxableProfit <= 20000) {
      setCalcPIT(taxableProfit * 0.15 - taxableProfit * 0.1);
    } else if (taxableProfit > 20000 && taxableProfit < 35000) {
      setCalcPIT(
        taxableProfit * 0.15 -
          taxableProfit * (0.1 - (2 / 300000) * (taxableProfit - 20000))
      );
    } else {
      setCalcPIT(taxableProfit * 0.15 - 0);
    }
  }, [incomeReceived]);

  const handleIncomeReceivedChange = (event: ChangeEvent<HTMLInputElement>) => {
    const inputValue = parseFloat(event.target.value);
    setIncomeReceived(inputValue);
  };

  const handleRadioValueChange = (value: number) => {
    if (value === 0.3) {
      setRadioValue(value);
      setExpensesValue(expensesValue);
      setTaxableIncome(taxableIncome);
      setCalcSSI(calcSSI);
      setCalcCHI(calcCHI);
    } else {
      setRadioValue(value);
      setExpensesValue(expensesValue);
      setTaxableIncome(taxableIncome);
      setCalcSSI(calcSSI);
      setCalcCHI(calcCHI);
    }
  };

  const handleExpensesChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    setExpensesValue(value);
  };
  const handlePaidSSI = (e: ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    setPaidSSI(value);
  };
  const handlePaidCHI = (e: ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    setPaidCHI(value);
  };
  const handleCheckboxChenge = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.checked ? 1 : 0;

    if (value === 1) {
      setCalcSSI(calcSSI);
      setPayableSSI(payableSSI);
    } else {
      setCalcSSI(calcSSI);
      setPayableSSI(payableSSI);
    }

    setCheckboxValue(value);
  };

  const handleCalcSSI = (e: ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    setCalcSSI(value);
  };

  const handleCalcCHI = (e: ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    // const chiValue = value < 703.56 ? 703.56 : value;
    setCalcCHI(value);
  };

  const handlePayableSSI = (e: ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    setPayableSSI(value);
  };

  const handlePayableCHI = (e: ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    // const payableChiValue = value < 703.56 ? 703.56 : value;
    setPayableCHI(value);
  };

  const handleTaxableProfit = (value: number) => {
    setCalcPIT(calcPIT);
    setTaxableProfit(value);
  };

  return (
    <StyledMain layoutbreakpoint={layoutbreakpoint}>
      <StyledSection>
        <StyledSectionHeadingWrapper theme={theme}>
          <h3>{headingText}</h3>
        </StyledSectionHeadingWrapper>

        {radioValue === 0.3 ? (
          checkboxValue === 1 ? (
            <StyledSectionContent theme={theme}>
              <h1>PSD ĮMOKOS IR VSD ĮMOKOS:</h1>
              <h1>INDIVIDUALIOS VEIKLOS APMOKESTINIMO APSKAIČIAVIMAI</h1>
              <StyledDivider></StyledDivider>
              <div>
                <div>
                  <Input
                    type='number'
                    value={incomeReceived}
                    changeEvent={handleIncomeReceivedChange}
                  />
                  <label>Gautos pajamos</label>
                </div>
                <div>
                  <Input
                    type='radio'
                    identifier='radio-0.3'
                    value={0.3}
                    checked={radioValue === 0.3}
                    changeEvent={() => handleRadioValueChange(0.3)}
                  />
                  <label htmlFor='radio-0.3'>30% nuo pajamų</label>
                </div>
                <div>
                  <Input
                    type='radio'
                    identifier='radio-0'
                    value={0}
                    checked={radioValue === 0}
                    changeEvent={() => handleRadioValueChange(0)}
                  />
                  <label htmlFor='radio-0'>faktinės išlaidos</label>
                </div>

                <div>
                  <label>Patirtos sąnaudos</label>
                  <Input
                    type='number'
                    value={(incomeReceived ?? 0) * 0.3}
                    changeEvent={handleExpensesChange}
                    disabled
                  />
                </div>

                <div>
                  <label>Sumokėta VSD</label>
                  <Input
                    type='number'
                    value={paidSSI}
                    changeEvent={handlePaidSSI}
                  />
                </div>
                <div>
                  <label>Sumokėta PSD</label>
                  <Input
                    type='number'
                    value={paidCHI}
                    changeEvent={handlePaidCHI}
                  />
                </div>
                <div>
                  <Input
                    type='checkbox'
                    value={checkboxValue}
                    changeEvent={handleCheckboxChenge}
                  />
                  <label>3% kaupiu pensijai</label>
                </div>
              </div>
              <div>
                <div>
                  <label>Pajamų suma:</label>
                  <Input
                    type='number'
                    value={incomeReceived}
                    onChange={handleIncomeReceivedChange}
                  />
                </div>
                <div>
                  <label>
                    „Sodros“ įmokų bazė (suma nuo kurios skaičiuojamos VSD ir
                    PSD įmokos):
                  </label>
                  <Input
                    type='number'
                    value={(incomeReceived - incomeReceived * 0.3) * 0.9}
                    onChange={handleIncomeReceivedChange}
                  />
                </div>
                <div>
                  <label>Apskaičiuota VSD įmokų suma:</label>
                  <Input
                    type='number'
                    value={calcSSI}
                    changeEvent={() => handleCalcSSI}
                  />
                </div>
                <div>
                  <label>Apskaičiuota PSD įmokų suma:</label>
                  <Input
                    type='number'
                    value={calcCHI}
                    changeEvent={() => handleCalcCHI}
                  />
                </div>
                <div>
                  <label>Mokėtina VSDĮ suma:</label>
                  <Input
                    type='number'
                    value={
                      (
                        Math.round(
                          ((incomeReceived - incomeReceived * 0.3) *
                            0.9 *
                            0.1552 -
                            paidSSI) *
                            100
                        ) / 100
                      ).toFixed(2) > 11244.35
                        ? 11244.35
                        : (
                            Math.round(
                              ((incomeReceived - incomeReceived * 0.3) *
                                0.9 *
                                0.1552 -
                                paidSSI) *
                                100
                            ) / 100
                          ).toFixed(2)
                    }
                    changeEvent={handlePayableSSI}
                  />
                </div>
                <div>
                  <label>Mokėtina PSDĮ suma:</label>
                  <Input
                    type='number'
                    value={
                      (
                        Math.round(
                          ((incomeReceived - incomeReceived * 0.3) *
                            0.9 *
                            0.0698 -
                            paidCHI) *
                            100
                        ) / 100
                      ).toFixed(2) < 703.56
                        ? 703.56
                        : (
                            Math.round(
                              ((incomeReceived - incomeReceived * 0.3) *
                                0.9 *
                                0.0698 -
                                paidCHI) *
                                100
                            ) / 100
                          ).toFixed(2)
                    }
                    changeEvent={handlePayableCHI}
                  />
                </div>
                <div>GYVENTOJŲ PAJAMŲ MOKESTIS:</div>
                <StyledDivider></StyledDivider>
                <div>
                  <label>Individualios veiklos pajamų suma:</label>
                  <Input
                    type='number'
                    value={incomeReceived}
                    changeEvent={handleIncomeReceivedChange}
                  />
                </div>
                <div>
                  <label>
                    Apmokestinamas pelnas, nuo kurio skaičiuojamas GPM:
                  </label>
                  <Input
                    type='number'
                    value={(
                      Math.round(
                        (incomeReceived - incomeReceived * 0.3) * 100
                      ) / 100
                    ).toFixed(2)}
                    changeEvent={() => handleTaxableProfit}
                  />
                </div>
                <div>
                  <label>Apskaičiuota GPM suma (`${}`):</label>
                  <Input
                    type='number'
                    value={calcPIT}
                    changeEvent={() => handleTaxableProfit}
                  />
                </div>
              </div>
            </StyledSectionContent>
          ) : (
            <StyledSectionContent theme={theme}>
              <h1>PSD ĮMOKOS IR VSD ĮMOKOS:</h1>
              <h1>INDIVIDUALIOS VEIKLOS APMOKESTINIMO APSKAIČIAVIMAI</h1>
              <StyledDivider></StyledDivider>
              <div>
                <div>
                  <Input
                    type='number'
                    value={incomeReceived}
                    changeEvent={handleIncomeReceivedChange}
                  />
                  <label>Gautos pajamos</label>
                </div>

                <div>
                  <Input
                    type='radio'
                    identifier='radio-0.3'
                    value={0.3}
                    checked={radioValue === 0.3}
                    changeEvent={() => handleRadioValueChange(0.3)}
                  />
                  <label htmlFor='radio-0.3'>30% nuo pajamų</label>
                </div>
                <div>
                  <Input
                    type='radio'
                    identifier='radio-0'
                    value={0}
                    checked={radioValue === 0}
                    changeEvent={() => handleRadioValueChange(0)}
                  />
                  <label htmlFor='radio-0'>faktinės išlaidos</label>
                </div>

                <div>
                  <label>Patirtos sąnaudos</label>
                  <Input
                    type='number'
                    value={(incomeReceived ?? 0) * 0.3}
                    changeEvent={handleExpensesChange}
                    disabled
                  />
                </div>

                <div>
                  <label>Sumokėta VSD</label>
                  <Input
                    type='number'
                    value={paidSSI}
                    changeEvent={handlePaidSSI}
                  />
                </div>
                <div>
                  <label>Sumokėta PSD</label>
                  <Input
                    type='number'
                    value={paidCHI}
                    changeEvent={handlePaidCHI}
                  />
                </div>
                <div>
                  <Input
                    type='checkbox'
                    value={checkboxValue}
                    changeEvent={handleCheckboxChenge}
                  />
                  <label>3% kaupiu pensijai</label>
                </div>
              </div>
              <div>
                <div>
                  <label>Pajamų suma:</label>
                  <Input
                    type='number'
                    value={incomeReceived}
                    onChange={handleIncomeReceivedChange}
                  />
                </div>

                <div>
                  <label>
                    „Sodros“ įmokų bazė (suma nuo kurios skaičiuojamos VSD ir
                    PSD įmokos):
                  </label>
                  <Input
                    type='number'
                    value={(incomeReceived - incomeReceived * 0.3) * 0.9}
                    onChange={handleIncomeReceivedChange}
                  />
                </div>

                <div>
                  <label>Apskaičiuota VSD įmokų suma:</label>
                  <Input
                    type='number'
                    value={
                      (
                        Math.round(
                          (incomeReceived - incomeReceived * 0.3) *
                            0.9 *
                            0.1252 *
                            100
                        ) / 100
                      ).toFixed(2) > 9070.83
                        ? 9070.83
                        : (
                            Math.round(
                              (incomeReceived - incomeReceived * 0.3) *
                                0.9 *
                                0.1252 *
                                100
                            ) / 100
                          ).toFixed(2)
                    }
                    changeEvent={handleCalcSSI}
                  />
                </div>
                <div>
                  <label>Apskaičiuota PSD įmokų suma:</label>
                  <Input
                    type='number'
                    value={
                      (
                        Math.round(
                          (incomeReceived - incomeReceived * 0.3) *
                            0.9 *
                            0.0698 *
                            100
                        ) / 100
                      ).toFixed(2) < 703.56
                        ? 703.56
                        : (
                            Math.round(
                              (incomeReceived - incomeReceived * 0.3) *
                                0.9 *
                                0.0698 *
                                100
                            ) / 100
                          ).toFixed(2)
                    }
                    changeEvent={handleCalcCHI}
                  />
                </div>

                <div>
                  <label>Mokėtina VSDĮ suma:</label>
                  <Input
                    type='number'
                    value={
                      (
                        Math.round(
                          ((incomeReceived - incomeReceived * 0.3) *
                            0.9 *
                            0.1252 -
                            paidSSI) *
                            100
                        ) / 100
                      ).toFixed(2) > 9070.83
                        ? 9070.83
                        : (
                            Math.round(
                              ((incomeReceived - incomeReceived * 0.3) *
                                0.9 *
                                0.1252 -
                                paidSSI) *
                                100
                            ) / 100
                          ).toFixed(2)
                    }
                    changeEvent={handlePayableSSI}
                  />
                </div>
                <div>
                  <label>Mokėtina PSDĮ suma:</label>
                  <Input
                    type='number'
                    value={
                      (
                        Math.round(
                          ((incomeReceived - incomeReceived * 0.3) *
                            0.9 *
                            0.0698 -
                            paidCHI) *
                            100
                        ) / 100
                      ).toFixed(2) < 703.56
                        ? 703.56
                        : (
                            Math.round(
                              ((incomeReceived - incomeReceived * 0.3) *
                                0.9 *
                                0.0698 -
                                paidCHI) *
                                100
                            ) / 100
                          ).toFixed(2)
                    }
                    changeEvent={handlePayableCHI}
                  />
                </div>
                <div>GYVENTOJŲ PAJAMŲ MOKESTIS:</div>
                <StyledDivider></StyledDivider>
                <div>
                  <label>Individualios veiklos pajamų suma:</label>
                  <Input
                    type='number'
                    value={incomeReceived}
                    changeEvent={handleIncomeReceivedChange}
                  />
                </div>

                <div>
                  <label>
                    Apmokestinamas pelnas, nuo kurio skaičiuojamas GPM:
                  </label>
                  <Input
                    type='number'
                    value={(
                      Math.round(
                        (incomeReceived - incomeReceived * 0.3) * 100
                      ) / 100
                    ).toFixed(2)}
                    changeEvent={handleIncomeReceivedChange}
                  />
                </div>

                <div>
                  <label>Apskaičiuota GPM suma (`${}`):</label>
                  <Input
                    type='number'
                    value={calcPIT}
                    changeEvent={() => handleTaxableProfit}
                  />
                </div>
              </div>
            </StyledSectionContent>
          )
        ) : checkboxValue === 1 ? (
          <StyledSectionContent theme={theme}>
            <h1>PSD ĮMOKOS IR VSD ĮMOKOS:</h1>
            <h1>INDIVIDUALIOS VEIKLOS APMOKESTINIMO APSKAIČIAVIMAI</h1>
            <StyledDivider></StyledDivider>
            <div>
              <div>
                <Input
                  type='number'
                  value={incomeReceived}
                  changeEvent={handleIncomeReceivedChange}
                />
                <label>Gautos pajamos</label>
              </div>

              <div>
                <Input
                  type='radio'
                  identifier='radio-0.3'
                  value={0.3}
                  checked={radioValue === 0.3}
                  changeEvent={() => handleRadioValueChange(0.3)}
                />
                <label htmlFor='radio-0.3'>30% nuo pajamų</label>
              </div>
              <div>
                <Input
                  type='radio'
                  identifier='radio-0'
                  value={0}
                  checked={radioValue === 0}
                  changeEvent={() => handleRadioValueChange(0)}
                />
                <label htmlFor='radio-0'>faktinės išlaidos</label>
              </div>

              <div>
                <label>Patirtos sąnaudos</label>
                <Input
                  type='number'
                  value={expensesValue ?? ''}
                  changeEvent={handleExpensesChange}
                />
              </div>

              <div>
                <label>Sumokėta VSD</label>
                <Input
                  type='number'
                  value={paidSSI}
                  changeEvent={handlePaidSSI}
                />
              </div>
              <div>
                <label>Sumokėta PSD</label>
                <Input
                  type='number'
                  value={paidCHI}
                  changeEvent={handlePaidCHI}
                />
              </div>
              <div>
                <Input
                  type='checkbox'
                  value={checkboxValue}
                  changeEvent={handleCheckboxChenge}
                />
                <label>3% kaupiu pensijai</label>
              </div>
            </div>
            <div>
              <div>
                <label>Pajamų suma:</label>
                <Input
                  type='number'
                  value={incomeReceived}
                  onChange={handleIncomeReceivedChange}
                />
              </div>

              <div>
                <label>
                  „Sodros“ įmokų bazė (suma nuo kurios skaičiuojamos VSD ir PSD
                  įmokos):
                </label>
                <Input
                  type='number'
                  value={(
                    Math.round(
                      (incomeReceived - (expensesValue ?? 0)) * 0.9 * 100
                    ) / 100
                  ).toFixed(2)}
                  onChange={handleIncomeReceivedChange}
                />
              </div>

              <div>
                <label>Apskaičiuota VSD įmokų suma:</label>
                <Input
                  type='number'
                  value={
                    (
                      Math.round(
                        (incomeReceived - expensesValue) * 0.9 * 0.1552 * 100
                      ) / 100
                    ).toFixed(2) > 11244.35
                      ? 11244.35
                      : (
                          Math.round(
                            (incomeReceived - expensesValue) *
                              0.9 *
                              0.1552 *
                              100
                          ) / 100
                        ).toFixed(2)
                  }
                  changeEvent={handleCalcSSI}
                />
              </div>

              <div>
                <label>Apskaičiuota PSD įmokų suma:</label>
                <Input
                  type='number'
                  value={
                    (
                      Math.round(
                        (incomeReceived - expensesValue) * 0.9 * 0.0698 * 100
                      ) / 100
                    ).toFixed(2) < 703.56
                      ? 703.56
                      : (
                          Math.round(
                            (incomeReceived - expensesValue) *
                              0.9 *
                              0.0698 *
                              100
                          ) / 100
                        ).toFixed(2)
                  }
                  changeEvent={handleCalcCHI}
                />
              </div>

              <div>
                <label>Mokėtina VSDĮ suma:</label>
                <Input
                  type='number'
                  value={
                    (
                      Math.round(
                        ((incomeReceived - expensesValue) * 0.9 * 0.1552 -
                          paidSSI) *
                          100
                      ) / 100
                    ).toFixed(2) > 11244.35
                      ? 11244.35
                      : (
                          Math.round(
                            ((incomeReceived - expensesValue) * 0.9 * 0.1552 -
                              paidSSI) *
                              100
                          ) / 100
                        ).toFixed(2)
                  }
                  changeEvent={handlePayableSSI}
                />
              </div>

              <div>
                <label>Mokėtina PSDĮ suma:</label>
                <Input
                  type='number'
                  value={
                    (
                      Math.round(
                        ((incomeReceived - expensesValue) * 0.9 * 0.0698 -
                          paidCHI) *
                          100
                      ) / 100
                    ).toFixed(2) < 703.56
                      ? 703.56
                      : (
                          Math.round(
                            ((incomeReceived - expensesValue) * 0.9 * 0.0698 -
                              paidCHI) *
                              100
                          ) / 100
                        ).toFixed(2)
                  }
                  changeEvent={handlePayableCHI}
                />
              </div>
              <div>GYVENTOJŲ PAJAMŲ MOKESTIS:</div>
              <StyledDivider></StyledDivider>
              <div>
                <label>Individualios veiklos pajamų suma:</label>
                <Input
                  type='number'
                  value={incomeReceived}
                  changeEvent={handleIncomeReceivedChange}
                />
              </div>

              <div>
                <label>
                  Apmokestinamas pelnas, nuo kurio skaičiuojamas GPM:
                </label>
                <Input
                  type='number'
                  value={(
                    Math.round((incomeReceived - expensesValue) * 100) / 100
                  ).toFixed(2)}
                  changeEvent={handleIncomeReceivedChange}
                />
              </div>

              <div>
                <label>Apskaičiuota GPM suma (`${}`):</label>
                <Input
                  type='number'
                  value={calcPIT}
                  changeEvent={() => handleTaxableProfit}
                />
              </div>
            </div>
          </StyledSectionContent>
        ) : (
          <StyledSectionContent theme={theme}>
            <h1>PSD ĮMOKOS IR VSD ĮMOKOS:</h1>
            <h1>INDIVIDUALIOS VEIKLOS APMOKESTINIMO APSKAIČIAVIMAI</h1>
            <StyledDivider></StyledDivider>
            <div>
              <div>
                <Input
                  type='number'
                  value={incomeReceived}
                  changeEvent={handleIncomeReceivedChange}
                />
                <label>Gautos pajamos</label>
              </div>

              <div>
                <Input
                  type='radio'
                  identifier='radio-0.3'
                  value={0.3}
                  checked={radioValue === 0.3}
                  changeEvent={() => handleRadioValueChange(0.3)}
                />
                <label htmlFor='radio-0.3'>30% nuo pajamų</label>
              </div>
              <div>
                <Input
                  type='radio'
                  identifier='radio-0'
                  value={0}
                  checked={radioValue === 0}
                  changeEvent={() => handleRadioValueChange(0)}
                />
                <label htmlFor='radio-0'>faktinės išlaidos</label>
              </div>

              <div>
                <label>Patirtos sąnaudos</label>
                <Input
                  type='number'
                  value={expensesValue ?? ''}
                  changeEvent={handleExpensesChange}
                />
              </div>

              <div>
                <label>Sumokėta VSD</label>
                <Input
                  type='number'
                  value={paidSSI}
                  changeEvent={handlePaidSSI}
                />
              </div>
              <div>
                <label>Sumokėta PSD</label>
                <Input
                  type='number'
                  value={paidCHI}
                  changeEvent={handlePaidCHI}
                />
              </div>
              <div>
                <Input
                  type='checkbox'
                  value={checkboxValue}
                  changeEvent={handleCheckboxChenge}
                />
                <label>3% kaupiu pensijai</label>
              </div>
            </div>
            <div>
              <div>
                <label>Pajamų suma:</label>
                <Input
                  type='number'
                  value={incomeReceived}
                  onChange={handleIncomeReceivedChange}
                />
              </div>

              <div>
                <label>
                  „Sodros“ įmokų bazė (suma nuo kurios skaičiuojamos VSD ir PSD
                  įmokos):
                </label>
                <Input
                  type='number'
                  value={(
                    Math.round(
                      (incomeReceived - (expensesValue ?? 0)) * 0.9 * 100
                    ) / 100
                  ).toFixed(2)}
                  onChange={handleIncomeReceivedChange}
                />
              </div>

              <div>
                <label>Apskaičiuota VSD įmokų suma:</label>
                <Input
                  type='number'
                  value={
                    (
                      Math.round(
                        (incomeReceived - expensesValue) * 0.9 * 0.1252 * 100
                      ) / 100
                    ).toFixed(2) > 9070.83
                      ? 9070.83
                      : (
                          Math.round(
                            (incomeReceived - expensesValue) *
                              0.9 *
                              0.1252 *
                              100
                          ) / 100
                        ).toFixed(2)
                  }
                  changeEvent={handleCalcSSI}
                />
              </div>

              <div>
                <label>Apskaičiuota PSD įmokų suma:</label>
                <Input
                  type='number'
                  value={
                    (
                      Math.round(
                        (incomeReceived - expensesValue) * 0.9 * 0.0698 * 100
                      ) / 100
                    ).toFixed(2) < 703.56
                      ? 703.56
                      : (
                          Math.round(
                            (incomeReceived - expensesValue) *
                              0.9 *
                              0.0698 *
                              100
                          ) / 100
                        ).toFixed(2)
                  }
                  changeEvent={handleCalcCHI}
                />
              </div>

              <div>
                <label>Mokėtina VSDĮ suma:</label>
                <Input
                  type='number'
                  value={
                    (
                      Math.round(
                        ((incomeReceived - expensesValue) * 0.9 * 0.1252 -
                          paidSSI) *
                          100
                      ) / 100
                    ).toFixed(2) > 9070.83
                      ? 9070.83
                      : (
                          Math.round(
                            ((incomeReceived - expensesValue) * 0.9 * 0.1252 -
                              paidSSI) *
                              100
                          ) / 100
                        ).toFixed(2)
                  }
                  changeEvent={handlePayableSSI}
                />
              </div>

              <div>
                <label>Mokėtina PSDĮ suma:</label>
                <Input
                  type='number'
                  value={
                    (
                      Math.round(
                        ((incomeReceived - expensesValue) * 0.9 * 0.0698 -
                          paidCHI) *
                          100
                      ) / 100
                    ).toFixed(2) < 703.56
                      ? 703.56
                      : (
                          Math.round(
                            ((incomeReceived - expensesValue) * 0.9 * 0.0698 -
                              paidCHI) *
                              100
                          ) / 100
                        ).toFixed(2)
                  }
                  changeEvent={handlePayableCHI}
                />
              </div>
              <div>GYVENTOJŲ PAJAMŲ MOKESTIS:</div>
              <StyledDivider></StyledDivider>
              <div>
                <label>Individualios veiklos pajamų suma:</label>
                <Input
                  type='number'
                  value={incomeReceived}
                  changeEvent={handleIncomeReceivedChange}
                />
              </div>

              <div>
                <label>
                  Apmokestinamas pelnas, nuo kurio skaičiuojamas GPM:
                </label>
                <Input
                  type='number'
                  value={(
                    Math.round((incomeReceived - expensesValue) * 100) / 100
                  ).toFixed(2)}
                  changeEvent={handleIncomeReceivedChange}
                />
              </div>

              <div>
                <label>Apskaičiuota GPM suma (`${}`):</label>
                <Input
                  type='number'
                  value={calcPIT}
                  changeEvent={() => handleTaxableProfit}
                />
              </div>
            </div>
          </StyledSectionContent>
        )}
      </StyledSection>
    </StyledMain>
  );
};

export default IndividualiosVeiklosMokesciuSkaiciuokle;

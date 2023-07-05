import { useState, ChangeEvent, useEffect } from 'react';
import {
  StyledWrapper,
  StyledIputsWrapper,
  StyledRadiosWrapper,
  StyledOutputsWrapper,
  StyledDivider,
} from './styles';

import { IColorTheme } from '../../../shared/color_themes';

import Input from '../../atoms/Input';
import Label from '../../atoms/Label';

interface IIndvVeiklosMokesciuSkaiciuokleProps {
  theme?: IColorTheme;
}

const IndividualiosVeiklosMokesciuSkaiciuokleOrganism = ({
  theme,
}: IIndvVeiklosMokesciuSkaiciuokleProps) => {
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
    // Patirtos sanaudos
    const expenses =
      radioValue === 0.3 ? (incomeReceived ?? 0) * 0.3 : expensesValue ?? '';
    setExpensesValue(expenses);

    // Apmokestinamos pajamos
    const taxableIncome = (incomeReceived - expenses) * 0.9;
    setTaxableIncome((Math.round(taxableIncome * 100) / 100).toFixed(2));
    // Apskaiciuota VSD ir moketina VSD

    const taxRate = checkboxValue === 1 ? 0.1552 : 0.1252;
    const maxSSI = checkboxValue === 1 ? 11244.35 : 9070.83;
    const calculatedSSI = Math.round(taxableIncome * taxRate * 100) / 100;
    const finalSSI = Math.min(calculatedSSI.toFixed(2), maxSSI);
    setCalcSSI(finalSSI);

    const payableSsi =
      Math.round((taxableIncome * taxRate - (paidSSI ? paidSSI : 0)) * 100) /
      100;
    const finalPayableSSI = Math.min(payableSsi.toFixed(2), maxSSI);

    setPayableSSI((Math.round(finalPayableSSI) * 100) / 100);

    // Apskaiciuota PSD ir moketina PSD
    const calcCHI = (Math.round(taxableIncome * 0.0698 * 100) / 100).toFixed(2);
    // const finalCalcCHI =
    if (calcCHI < 703.56) {
      setCalcCHI(703.56);
    } else if (calcCHI > 5057.06) {
      setCalcCHI(5057.06);
    } else {
      setCalcCHI((Math.round(calcCHI * 100) / 100).toFixed(2));
    }

    setCalcCHI((Math.round(calcCHI * 100) / 100).toFixed(2));

    const finalpayableChi = calcCHI - (paidCHI ? paidCHI : 0);
    setPayableCHI((Math.round(finalpayableChi * 100) / 100).toFixed(2));

    console.log(taxableIncome);
    console.log(taxRate);
    console.log(paidSSI);

    console.log(payableSsi);
    console.log(finalPayableSSI);
    console.log(finalpayableChi);

    // Apmokestinamas pelnas
    const taxableProfit =
      radioValue === 0.3
        ? (Math.round((incomeReceived - expenses) * 100) / 100).toFixed(2)
        : (
            Math.round(
              (incomeReceived - expenses - payableSSI - payableCHI) * 100
            ) / 100
          ).toFixed(2);
    setTaxableProfit(taxableProfit);
    // Apskaiciuotas GPM

    if (taxableProfit <= 20000) {
      setCalcPIT(
        (
          Math.round((taxableProfit * 0.15 - taxableProfit * 0.1) * 100) / 100
        ).toFixed(2)
      );
    } else if (taxableProfit > 20000 && taxableProfit < 35000) {
      setCalcPIT(
        (
          Math.round(
            (taxableProfit * 0.15 -
              taxableProfit * (0.1 - (2 / 300000) * (taxableProfit - 20000))) *
              100
          ) / 100
        ).toFixed(2)
      );
    } else {
      setCalcPIT(
        (Math.round((taxableProfit * 0.15 - 0) * 100) / 100).toFixed(2)
      );
    }

    setCheckboxValue(checkboxValue);
  }, [
    incomeReceived,
    radioValue,
    expensesValue,
    paidSSI,
    paidCHI,
    checkboxValue,
    taxableIncome,
    calcSSI,
    calcCHI,
    payableSSI,
    payableCHI,
    taxableProfit,
    calcPIT,
  ]);
  const procGPM = (
    Math.round(((calcPIT * 100) / taxableProfit) * 100) / 100
  ).toFixed(2);
  const handleIncomeReceivedChange = (event: ChangeEvent<HTMLInputElement>) => {
    const inputValue = parseFloat(event.target.value);
    setIncomeReceived(inputValue);
  };

  const handleRadioValueChange = (value: number) => {
    setRadioValue(value);
    // if (value === 0.3) {
    //   setRadioValue(value);
    //   setExpensesValue(expensesValue);
    //   setTaxableIncome(taxableIncome);
    //   setCalcSSI(calcSSI);
    //   setCalcCHI(calcCHI);
    // } else {
    //   setRadioValue(value);
    //   setExpensesValue(expensesValue);
    //   setTaxableIncome(taxableIncome);
    //   setCalcSSI(calcSSI);
    //   setCalcCHI(calcCHI);
    // }
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

    // if (value === 1) {
    //   setCalcSSI(calcSSI);
    //   setPayableSSI(payableSSI);
    // } else {
    //   setCalcSSI(calcSSI);
    //   setPayableSSI(payableSSI);
    // }
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
    console.log(value);
  };

  const handlePayableCHI = (e: ChangeEvent<HTMLInputElement>) => {
    // const value = parseFloat(e.target.value);
    // const payableChiValue = value < 703.56 ? 703.56 : value;
    // setPayableCHI(value);
  };

  const handleTaxableProfit = (value: number) => {
    setCalcPIT(calcPIT);
    setTaxableProfit(value);
  };

  return (
    <StyledWrapper>
      {radioValue === 0.3 ? (
        checkboxValue === 1 ? (
          <div>
            <h1>Individualios veiklos sumų įvedimas:</h1>
            <StyledDivider></StyledDivider>
            <StyledIputsWrapper>
              <div>
                <Label targetinput='income-received' size='18px'>
                  Gautos pajamos
                </Label>
                <Input
                  theme={theme}
                  identifier='income-received'
                  type='number'
                  value={incomeReceived}
                  changeEvent={() => handleIncomeReceivedChange}
                />
              </div>
              <div>
                <StyledRadiosWrapper>
                  <Input
                    theme={theme}
                    type='radio'
                    identifier='radio-0.3'
                    value={0.3}
                    checked={radioValue === 0.3}
                    changeEvent={() => handleRadioValueChange(0.3)}
                  />
                  <Label targetinput='radio-0.3' size='18px'>
                    30% nuo pajamų
                  </Label>
                </StyledRadiosWrapper>
                <div>
                  <Input
                    theme={theme}
                    type='radio'
                    identifier='radio-0'
                    value={0}
                    checked={radioValue === 0}
                    changeEvent={() => handleRadioValueChange(0)}
                  />
                  <Label targetinput='radio-0' size='18px'>
                    faktinės išlaidos
                  </Label>
                </div>
              </div>
              <div>
                <Label targetinput='expenses-value' size='18px'>
                  Patirtos sąnaudos
                </Label>
                <Input
                  theme={theme}
                  identifier='expenses-value'
                  type='number'
                  value={expensesValue}
                  changeEvent={handleExpensesChange}
                  disabled
                />
              </div>
              <div>
                <Label targetinput='paid-SSI' size='18px'>
                  Sumokėta VSD
                </Label>
                <Input
                  theme={theme}
                  identifier='paid-SSI'
                  type='number'
                  value={paidSSI}
                  changeEvent={handlePaidSSI}
                />
              </div>
              <div>
                <Label targetinput='paid-CHI' size='18px'>
                  Sumokėta PSD
                </Label>
                <Input
                  theme={theme}
                  identifier='paid-CHI'
                  type='number'
                  value={paidCHI}
                  changeEvent={handlePaidCHI}
                />
              </div>
              <div>
                <Input
                  theme={theme}
                  identifier='pansion'
                  type='checkbox'
                  value={checkboxValue}
                  changeEvent={handleCheckboxChenge}
                />
                <Label targetinput='pension' size='18px'>
                  3% kaupiu pensijai
                </Label>
              </div>
            </StyledIputsWrapper>
            <StyledOutputsWrapper>
              <h1>PSD įmokos ir VSD įmokos:</h1>
              <h1>Individualios veiklos apmokestinimo apskaičiavimai:</h1>
              <StyledDivider></StyledDivider>
              <div>
                <Label targetinput='income-received' size='18px'>
                  Pajamų suma:
                </Label>
                <Input
                  theme={theme}
                  identifier='income-received'
                  type='number'
                  value={incomeReceived}
                  changeEvent={handleIncomeReceivedChange}
                />
              </div>
              <div>
                <Label targetinput='taxable-income' size='18px'>
                  „Sodros“ įmokų bazė (suma nuo kurios skaičiuojamos VSD ir PSD
                  įmokos):
                </Label>
                <Input
                  theme={theme}
                  identifier='taxable-income'
                  type='number'
                  value={taxableIncome}
                  changeEvent={handleIncomeReceivedChange}
                />
              </div>
              <div>
                <Label targetinput='calc-SSI' size='18px'>
                  Apskaičiuota VSD įmokų suma:
                </Label>
                <Input
                  theme={theme}
                  identifier='calc-SSI'
                  type='number'
                  value={calcSSI}
                  changeEvent={() => handleCalcSSI}
                />
              </div>
              <div>
                <Label targetinput='calc-CHI' size='18px'>
                  Apskaičiuota PSD įmokų suma:
                </Label>
                <Input
                  theme={theme}
                  identifier='calc-CHI'
                  type='number'
                  value={calcCHI}
                  changeEvent={() => handleCalcCHI}
                />
              </div>
              <div>
                <Label targetinput='payable-SSI' size='18px'>
                  Mokėtina VSDĮ suma:
                </Label>
                <Input
                  theme={theme}
                  identifier='payable-SSI'
                  type='number'
                  value={payableSSI}
                  changeEvent={handlePayableSSI}
                />
              </div>
              <div>
                <Label targetinput='payable-CHI' size='18px'>
                  Mokėtina PSDĮ suma:
                </Label>
                <Input
                  theme={theme}
                  identifier='payable-CHI'
                  type='number'
                  value={payableCHI}
                  changeEvent={handlePayableCHI}
                />
              </div>
              <div>GYVENTOJŲ PAJAMŲ MOKESTIS:</div>
              <StyledDivider></StyledDivider>
              <div>
                <Label targetinput='income-received' size='18px'>
                  Individualios veiklos pajamų suma:
                </Label>
                <Input
                  theme={theme}
                  identifier='income-received'
                  type='number'
                  value={incomeReceived}
                  changeEvent={handleIncomeReceivedChange}
                />
              </div>
              <div>
                <Label targetinput='taxable-profit' size='18px'>
                  Apmokestinamas pelnas, nuo kurio skaičiuojamas GPM:
                </Label>
                <Input
                  theme={theme}
                  identifier='taxable-profit'
                  type='number'
                  value={taxableProfit}
                  changeEvent={handleTaxableProfit}
                />
              </div>
              <div>
                <Label targetinput='calc-PIT' size='18px'>
                  Apskaičiuota GPM suma ({procGPM}%):
                </Label>
                <Input
                  theme={theme}
                  identifier='calc-PIT'
                  type='number'
                  value={calcPIT}
                  changeEvent={() => handleTaxableProfit}
                />
              </div>
            </StyledOutputsWrapper>
          </div>
        ) : (
          <div>
            <h1>Individualios veiklos sumų įvedimas:</h1>
            <StyledDivider></StyledDivider>
            <StyledIputsWrapper>
              <div>
                <Label targetinput='income-received' size='18px'>
                  Gautos pajamos
                </Label>
                <Input
                  theme={theme}
                  identifier='income-received'
                  type='number'
                  value={incomeReceived}
                  changeEvent={() => handleIncomeReceivedChange}
                />
              </div>
              <div>
                <Input
                  theme={theme}
                  type='radio'
                  identifier='radio-0.3'
                  value={0.3}
                  checked={radioValue === 0.3}
                  changeEvent={() => handleRadioValueChange(0.3)}
                />
                <Label targetinput='radio-0.3' size='18px'>
                  30% nuo pajamų
                </Label>
              </div>
              <div>
                <Input
                  theme={theme}
                  type='radio'
                  identifier='radio-0'
                  value={0}
                  checked={radioValue === 0}
                  changeEvent={() => handleRadioValueChange(0)}
                />
                <Label targetinput='radio-0' size='18px'>
                  faktinės išlaidos
                </Label>
              </div>
              <div>
                <Label targetinput='expenses-value' size='18px'>
                  Patirtos sąnaudos
                </Label>
                <Input
                  theme={theme}
                  identifier='expenses-value'
                  type='number'
                  value={expensesValue}
                  changeEvent={handleExpensesChange}
                  disabled
                />
              </div>
              <div>
                <Label targetinput='paid-SSI' size='18px'>
                  Sumokėta VSD
                </Label>
                <Input
                  theme={theme}
                  identifier='paid-SSI'
                  type='number'
                  value={paidSSI}
                  changeEvent={handlePaidSSI}
                />
              </div>
              <div>
                <Label targetinput='paid-CHI' size='18px'>
                  Sumokėta PSD
                </Label>
                <Input
                  theme={theme}
                  identifier='paid-CHI'
                  type='number'
                  value={paidCHI}
                  changeEvent={handlePaidCHI}
                />
              </div>
              <div>
                <Input
                  theme={theme}
                  identifier='pansion'
                  type='checkbox'
                  value={checkboxValue}
                  changeEvent={handleCheckboxChenge}
                />
                <Label targetinput='pension' size='18px'>
                  3% kaupiu pensijai
                </Label>
              </div>
            </StyledIputsWrapper>
            <StyledOutputsWrapper>
              <h1>PSD įmokos ir VSD įmokos:</h1>
              <h1>Individualios veiklos apmokestinimo apskaičiavimai:</h1>
              <StyledDivider></StyledDivider>
              <div>
                <Label targetinput='income-received' size='18px'>
                  Pajamų suma:
                </Label>
                <Input
                  theme={theme}
                  identifier='income-received'
                  type='number'
                  value={incomeReceived}
                  changeEvent={handleIncomeReceivedChange}
                />
              </div>
              <div>
                <Label targetinput='taxable-income' size='18px'>
                  „Sodros“ įmokų bazė (suma nuo kurios skaičiuojamos VSD ir PSD
                  įmokos):
                </Label>
                <Input
                  theme={theme}
                  identifier='taxable-income'
                  type='number'
                  value={taxableIncome}
                  changeEvent={handleIncomeReceivedChange}
                />
              </div>
              <div>
                <Label targetinput='calc-SSI' size='18px'>
                  Apskaičiuota VSD įmokų suma:
                </Label>
                <Input
                  theme={theme}
                  identifier='calc-SSI'
                  type='number'
                  value={calcSSI}
                  changeEvent={() => handleCalcSSI}
                />
              </div>
              <div>
                <Label targetinput='calc-CHI' size='18px'>
                  Apskaičiuota PSD įmokų suma:
                </Label>
                <Input
                  theme={theme}
                  identifier='calc-CHI'
                  type='number'
                  value={calcCHI}
                  changeEvent={() => handleCalcCHI}
                />
              </div>
              <div>
                <Label targetinput='payable-SSI' size='18px'>
                  Mokėtina VSDĮ suma:
                </Label>
                <Input
                  theme={theme}
                  identifier='payable-SSI'
                  type='number'
                  value={payableSSI}
                  changeEvent={handlePayableSSI}
                />
              </div>
              <div>
                <Label targetinput='payable-CHI' size='18px'>
                  Mokėtina PSDĮ suma:
                </Label>
                <Input
                  theme={theme}
                  identifier='payable-CHI'
                  type='number'
                  value={payableCHI}
                  changeEvent={handlePayableCHI}
                />
              </div>
              <div>GYVENTOJŲ PAJAMŲ MOKESTIS:</div>
              <StyledDivider></StyledDivider>
              <div>
                <Label targetinput='income-received' size='18px'>
                  Individualios veiklos pajamų suma:
                </Label>
                <Input
                  theme={theme}
                  identifier='income-received'
                  type='number'
                  value={incomeReceived}
                  changeEvent={handleIncomeReceivedChange}
                />
              </div>
              <div>
                <Label targetinput='taxable-profit' size='18px'>
                  Apmokestinamas pelnas, nuo kurio skaičiuojamas GPM:
                </Label>
                <Input
                  theme={theme}
                  identifier='taxable-profit'
                  type='number'
                  value={taxableProfit}
                  changeEvent={handleTaxableProfit}
                />
              </div>
              <div>
                <Label targetinput='calc-PIT' size='18px'>
                  Apskaičiuota GPM suma ({procGPM}%):
                </Label>
                <Input
                  theme={theme}
                  identifier='calc-PIT'
                  type='number'
                  value={calcPIT}
                  changeEvent={() => handleTaxableProfit}
                />
              </div>
            </StyledOutputsWrapper>
          </div>
        )
      ) : checkboxValue === 1 ? (
        <div>
          <h1>Individualios veiklos sumų įvedimas:</h1>
          <StyledDivider></StyledDivider>
          <StyledIputsWrapper>
            <div>
              <Label targetinput='income-received' size='18px'>
                Gautos pajamos
              </Label>
              <Input
                theme={theme}
                identifier='income-received'
                type='number'
                value={incomeReceived}
                changeEvent={handleIncomeReceivedChange}
              />
            </div>
            <div>
              <Input
                theme={theme}
                type='radio'
                identifier='radio-0.3'
                value={0.3}
                checked={radioValue === 0.3}
                changeEvent={() => handleRadioValueChange(0.3)}
              />
              <Label targetinput='radio-0.3' size='18px'>
                30% nuo pajamų
              </Label>
            </div>
            <div>
              <Input
                theme={theme}
                type='radio'
                identifier='radio-0'
                value={0}
                checked={radioValue === 0}
                changeEvent={() => handleRadioValueChange(0)}
              />
              <Label targetinput='radio-0' size='18px'>
                faktinės išlaidos
              </Label>
            </div>
            <div>
              <Label targetinput='expenses-value' size='18px'>
                Patirtos sąnaudos
              </Label>
              <Input
                theme={theme}
                identifier='expenses-value'
                type='number'
                value={expensesValue}
                changeEvent={handleExpensesChange}
              />
            </div>
            <div>
              <Label targetinput='paid-SSI' size='18px'>
                Sumokėta VSD
              </Label>
              <Input
                theme={theme}
                identifier='paid-SSI'
                type='number'
                value={paidSSI}
                changeEvent={handlePaidSSI}
              />
            </div>
            <div>
              <Label targetinput='paid-CHI' size='18px'>
                Sumokėta PSD
              </Label>
              <Input
                theme={theme}
                identifier='paid-CHI'
                type='number'
                value={paidCHI}
                changeEvent={handlePaidCHI}
              />
            </div>
            <div>
              <Input
                theme={theme}
                identifier='pansion'
                type='checkbox'
                value={checkboxValue}
                changeEvent={handleCheckboxChenge}
              />
              <Label targetinput='pension' size='18px'>
                3% kaupiu pensijai
              </Label>
            </div>
          </StyledIputsWrapper>
          <StyledOutputsWrapper>
            <h1>PSD ĮMOKOS IR VSD ĮMOKOS:</h1>
            <h1>INDIVIDUALIOS VEIKLOS APMOKESTINIMO APSKAIČIAVIMAI</h1>
            <StyledDivider></StyledDivider>
            <div>
              <Label targetinput='income-received' size='18px'>
                Pajamų suma:
              </Label>
              <Input
                theme={theme}
                identifier='income-received'
                type='number'
                value={incomeReceived}
                onChange={handleIncomeReceivedChange}
              />
            </div>
            <div>
              <Label targetinput='taxable-income' size='18px'>
                „Sodros“ įmokų bazė (suma nuo kurios skaičiuojamos VSD ir PSD
                įmokos):
              </Label>
              <Input
                theme={theme}
                identifier='taxable-income'
                type='number'
                value={taxableIncome}
                changeEvent={handleIncomeReceivedChange}
              />
            </div>
            <div>
              <Label targetinput='calc-SSI' size='18px'>
                Apskaičiuota VSD įmokų suma:
              </Label>
              <Input
                theme={theme}
                identifier='calc-SSI'
                type='number'
                value={calcSSI}
                changeEvent={handleCalcSSI}
              />
            </div>
            <div>
              <Label targetinput='calc-CHI' size='18px'>
                Apskaičiuota PSD įmokų suma:
              </Label>
              <Input
                theme={theme}
                identifier='calc-CHI'
                type='number'
                value={calcCHI}
                changeEvent={() => handleCalcCHI}
              />
            </div>
            <div>
              <Label targetinput='payable-SSI' size='18px'>
                Mokėtina VSDĮ suma:
              </Label>
              <Input
                theme={theme}
                identifier='payable-SSI'
                type='number'
                value={payableSSI}
                changeEvent={handlePayableSSI}
              />
            </div>
            <div>
              <Label targetinput='payable-CHI' size='18px'>
                Mokėtina PSDĮ suma:
              </Label>
              <Input
                theme={theme}
                identifier='payable-CHI'
                type='number'
                value={payableCHI}
                changeEvent={handlePayableCHI}
              />
            </div>
            <div>GYVENTOJŲ PAJAMŲ MOKESTIS:</div>
            <StyledDivider></StyledDivider>
            <div>
              <Label targetinput='income-received' size='18px'>
                Individualios veiklos pajamų suma:
              </Label>
              <Input
                theme={theme}
                identifier='income-received'
                type='number'
                value={incomeReceived}
                changeEvent={handleIncomeReceivedChange}
              />
            </div>
            <div>
              <Label targetinput='taxable-profit' size='18px'>
                Apmokestinamas pelnas, nuo kurio skaičiuojamas GPM:
              </Label>
              <Input
                theme={theme}
                identifier='taxable-profit'
                type='number'
                value={taxableProfit}
                changeEvent={handleTaxableProfit}
              />
            </div>
            <div>
              <Label targetinput='calc-PIT' size='18px'>
                Apskaičiuota GPM suma ({procGPM}%):
              </Label>
              <Input
                theme={theme}
                identifier='calc-PIT'
                type='number'
                value={calcPIT}
                changeEvent={() => handleTaxableProfit}
              />
            </div>
          </StyledOutputsWrapper>
        </div>
      ) : (
        <div>
          <h1>Individualios veiklos sumų įvedimas:</h1>
          <StyledDivider></StyledDivider>
          <StyledIputsWrapper>
            <div>
              <Label targetinput='income-received' size='18px'>
                Gautos pajamos
              </Label>
              <Input
                theme={theme}
                identifier='income-received'
                type='number'
                value={incomeReceived}
                changeEvent={handleIncomeReceivedChange}
              />
            </div>
            <div>
              <Input
                theme={theme}
                type='radio'
                identifier='radio-0.3'
                value={0.3}
                checked={radioValue === 0.3}
                changeEvent={() => handleRadioValueChange(0.3)}
              />
              <Label targetinput='radio-0.3' size='18px'>
                30% nuo pajamų
              </Label>
            </div>
            <div>
              <Input
                theme={theme}
                type='radio'
                identifier='radio-0'
                value={0}
                checked={radioValue === 0}
                changeEvent={() => handleRadioValueChange(0)}
              />
              <Label targetinput='radio-0' size='18px'>
                faktinės išlaidos
              </Label>
            </div>
            <div>
              <Label targetinput='expenses-value' size='18px'>
                Patirtos sąnaudos
              </Label>
              <Input
                theme={theme}
                identifier='expenses-value'
                type='number'
                value={expensesValue}
                changeEvent={handleExpensesChange}
              />
            </div>
            <div>
              <Label targetinput='paid-SSI' size='18px'>
                Sumokėta VSD
              </Label>
              <Input
                theme={theme}
                identifier='paid-SSI'
                type='number'
                value={paidSSI}
                changeEvent={handlePaidSSI}
              />
            </div>
            <div>
              <Label targetinput='paid-CHI' size='18px'>
                Sumokėta PSD
              </Label>
              <Input
                theme={theme}
                identifier='paid-CHI'
                type='number'
                value={paidCHI}
                changeEvent={handlePaidCHI}
              />
            </div>
            <div>
              <Input
                theme={theme}
                identifier='pansion'
                type='checkbox'
                value={checkboxValue}
                changeEvent={handleCheckboxChenge}
              />
              <Label targetinput='pension' size='18px'>
                3% kaupiu pensijai
              </Label>
            </div>
          </StyledIputsWrapper>
          <StyledOutputsWrapper>
            <h1>PSD ĮMOKOS IR VSD ĮMOKOS:</h1>
            <h1>INDIVIDUALIOS VEIKLOS APMOKESTINIMO APSKAIČIAVIMAI</h1>
            <StyledDivider></StyledDivider>
            <div>
              <Label targetinput='income-received' size='18px'>
                Pajamų suma:
              </Label>
              <Input
                theme={theme}
                identifier='income-received'
                type='number'
                value={incomeReceived}
                onChange={handleIncomeReceivedChange}
              />
            </div>
            <div>
              <Label targetinput='taxable-income' size='18px'>
                „Sodros“ įmokų bazė (suma nuo kurios skaičiuojamos VSD ir PSD
                įmokos):
              </Label>
              <Input
                theme={theme}
                identifier='taxable-income'
                type='number'
                value={taxableIncome}
                changeEvent={handleIncomeReceivedChange}
              />
            </div>
            <div>
              <Label targetinput='calc-SSI' size='18px'>
                Apskaičiuota VSD įmokų suma:
              </Label>
              <Input
                theme={theme}
                identifier='calc-SSI'
                type='number'
                value={calcSSI}
                changeEvent={handleCalcSSI}
              />
            </div>
            <div>
              <Label targetinput='calc-CHI' size='18px'>
                Apskaičiuota PSD įmokų suma:
              </Label>
              <Input
                theme={theme}
                identifier='calc-CHI'
                type='number'
                value={calcCHI}
                changeEvent={() => handleCalcCHI}
              />
            </div>
            <div>
              <Label targetinput='payable-SSI' size='18px'>
                Mokėtina VSDĮ suma:
              </Label>
              <Input
                theme={theme}
                identifier='payable-SSI'
                type='number'
                value={payableSSI}
                changeEvent={handlePayableSSI}
              />
            </div>
            <div>
              <Label targetinput='payable-CHI' size='18px'>
                Mokėtina PSDĮ suma:
              </Label>
              <Input
                theme={theme}
                identifier='payable-CHI'
                type='number'
                value={payableCHI}
                changeEvent={handlePayableCHI}
              />
            </div>
            <div>GYVENTOJŲ PAJAMŲ MOKESTIS:</div>
            <StyledDivider></StyledDivider>
            <div>
              <Label targetinput='income-received' size='18px'>
                Individualios veiklos pajamų suma:
              </Label>
              <Input
                theme={theme}
                identifier='income-received'
                type='number'
                value={incomeReceived}
                changeEvent={handleIncomeReceivedChange}
              />
            </div>
            <div>
              <Label targetinput='taxable-profit' size='18px'>
                Apmokestinamas pelnas, nuo kurio skaičiuojamas GPM:
              </Label>
              <Input
                theme={theme}
                identifier='taxable-profit'
                type='number'
                value={taxableProfit}
                changeEvent={handleTaxableProfit}
              />
            </div>
            <div>
              <Label targetinput='calc-PIT' size='18px'>
                Apskaičiuota GPM suma ({procGPM}%):
              </Label>
              <Input
                theme={theme}
                identifier='calc-PIT'
                type='number'
                value={calcPIT}
                changeEvent={() => handleTaxableProfit}
              />
            </div>
          </StyledOutputsWrapper>
        </div>
      )}
    </StyledWrapper>
  );
};

export default IndividualiosVeiklosMokesciuSkaiciuokleOrganism;

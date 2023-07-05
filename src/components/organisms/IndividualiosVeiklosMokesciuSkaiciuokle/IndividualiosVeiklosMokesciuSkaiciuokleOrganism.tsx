import { useState, ChangeEvent, useEffect } from 'react';
import {
  //   StyledMain,
  //   StyledSection,
  //   StyledSectionHeadingWrapper,
  //   StyledSectionContent,
  StyledDivider,
} from './styles';

import { IColorTheme } from '../../../shared/color_themes';

import Input from '../../atoms/Input';
import Label from '../../atoms/Label';
import Loader from '../../atoms/Loader';

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
      Math.round((taxableIncome * taxRate - paidSSI) * 100) / 100;
    const finalPayableSSI = Math.min(payableSsi.toFixed(2), maxSSI);

    setPayableSSI(finalPayableSSI);

    // Apskaiciuota PSD ir moketina PSD
    const calcCHI = (Math.round(taxableIncome * 0.0698 * 100) / 100).toFixed(2);
    const finalCalcCHI =
      calcCHI < 703.56 ? 703.56 : calcCHI > 5057.06 ? 5057.06 : calcCHI;

    setCalcCHI(finalCalcCHI);

    const finalpayableChi = finalCalcCHI - paidCHI;
    setPayableCHI(finalpayableChi);

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
    <>
      {radioValue === 0.3 ? (
        checkboxValue === 1 ? (
          <div>
            <h1>PSD ĮMOKOS IR VSD ĮMOKOS:</h1>
            <h1>INDIVIDUALIOS VEIKLOS APMOKESTINIMO APSKAIČIAVIMAI</h1>
            <StyledDivider></StyledDivider>
            <div>
              <div>
                <label>Gautos pajamos</label>
                <Input
                  type='number'
                  value={incomeReceived}
                  changeEvent={() => handleIncomeReceivedChange}
                />
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
                  value={expensesValue}
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
                  changeEvent={handleIncomeReceivedChange}
                />
              </div>
              <div>
                <label>
                  „Sodros“ įmokų bazė (suma nuo kurios skaičiuojamos VSD ir PSD
                  įmokos):
                </label>
                <Input
                  type='number'
                  value={taxableIncome}
                  changeEvent={handleIncomeReceivedChange}
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
                  value={payableSSI}
                  changeEvent={handlePayableSSI}
                />
              </div>
              <div>
                <label>Mokėtina PSDĮ suma:</label>
                <Input
                  type='number'
                  value={payableCHI}
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
                  value={taxableProfit}
                  changeEvent={handleTaxableProfit}
                />
              </div>
              <div>
                <label>Apskaičiuota GPM suma ({procGPM}%):</label>
                <Input
                  type='number'
                  value={calcPIT}
                  changeEvent={() => handleTaxableProfit}
                />
              </div>
            </div>
          </div>
        ) : (
          <div>
            <h1>PSD ĮMOKOS IR VSD ĮMOKOS:</h1>
            <h1>INDIVIDUALIOS VEIKLOS APMOKESTINIMO APSKAIČIAVIMAI</h1>
            <StyledDivider></StyledDivider>
            <div>
              <div>
                <label>Gautos pajamos</label>
                <Input
                  type='number'
                  value={incomeReceived}
                  changeEvent={handleIncomeReceivedChange}
                />
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
                  value={expensesValue}
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
                  „Sodros“ įmokų bazė (suma nuo kurios skaičiuojamos VSD ir PSD
                  įmokos):
                </label>
                <Input
                  type='number'
                  value={taxableIncome}
                  changeEvent={handleIncomeReceivedChange}
                />
              </div>

              <div>
                <label>Apskaičiuota VSD įmokų suma:</label>
                <Input
                  type='number'
                  value={calcSSI}
                  changeEvent={handleCalcSSI}
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
                  value={payableSSI}
                  changeEvent={handlePayableSSI}
                />
              </div>
              <div>
                <label>Mokėtina PSDĮ suma:</label>
                <Input
                  type='number'
                  value={payableCHI}
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
                  value={taxableProfit}
                  changeEvent={handleIncomeReceivedChange}
                />
              </div>

              <div>
                <label>Apskaičiuota GPM suma ({procGPM}%):</label>
                <Input
                  type='number'
                  value={calcPIT}
                  changeEvent={() => handleTaxableProfit}
                />
              </div>
            </div>
          </div>
        )
      ) : checkboxValue === 1 ? (
        <div>
          <h1>PSD ĮMOKOS IR VSD ĮMOKOS:</h1>
          <h1>INDIVIDUALIOS VEIKLOS APMOKESTINIMO APSKAIČIAVIMAI</h1>
          <StyledDivider></StyledDivider>
          <div>
            <div>
              <label>Gautos pajamos</label>
              <Input
                type='number'
                value={incomeReceived}
                changeEvent={handleIncomeReceivedChange}
              />
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
                value={expensesValue}
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
                value={taxableIncome}
                changeEvent={handleIncomeReceivedChange}
              />
            </div>

            <div>
              <label>Apskaičiuota VSD įmokų suma:</label>
              <Input
                type='number'
                value={calcSSI}
                changeEvent={handleCalcSSI}
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
                value={payableSSI}
                changeEvent={handlePayableSSI}
              />
            </div>

            <div>
              <label>Mokėtina PSDĮ suma:</label>
              <Input
                type='number'
                value={payableCHI}
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
              <label>Apmokestinamas pelnas, nuo kurio skaičiuojamas GPM:</label>
              <Input
                type='number'
                value={taxableProfit}
                changeEvent={handleIncomeReceivedChange}
              />
            </div>

            <div>
              <label>Apskaičiuota GPM suma ({procGPM}%):</label>
              <Input
                type='number'
                value={calcPIT}
                changeEvent={() => handleTaxableProfit}
              />
            </div>
          </div>
        </div>
      ) : (
        <div>
          <h1>PSD ĮMOKOS IR VSD ĮMOKOS:</h1>
          <h1>INDIVIDUALIOS VEIKLOS APMOKESTINIMO APSKAIČIAVIMAI</h1>
          <StyledDivider></StyledDivider>
          <div>
            <div>
              <label>Gautos pajamos</label>
              <Input
                type='number'
                value={incomeReceived}
                changeEvent={handleIncomeReceivedChange}
              />
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
                value={expensesValue}
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
                value={taxableIncome}
                changeEvent={handleIncomeReceivedChange}
              />
            </div>

            <div>
              <label>Apskaičiuota VSD įmokų suma:</label>
              <Input
                type='number'
                value={calcSSI}
                changeEvent={handleCalcSSI}
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
                value={payableSSI}
                changeEvent={handlePayableSSI}
              />
            </div>

            <div>
              <label>Mokėtina PSDĮ suma:</label>
              <Input
                type='number'
                value={payableCHI}
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
              <label>Apmokestinamas pelnas, nuo kurio skaičiuojamas GPM:</label>
              <Input
                type='number'
                value={taxableProfit}
                changeEvent={handleIncomeReceivedChange}
              />
            </div>

            <div>
              <label>Apskaičiuota GPM suma ({procGPM}%):</label>
              <Input
                type='number'
                value={calcPIT}
                changeEvent={() => handleTaxableProfit}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default IndividualiosVeiklosMokesciuSkaiciuokleOrganism;

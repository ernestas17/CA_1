import { useState, ChangeEvent, useEffect } from 'react';
import {
  StyledWrapper,
  StyledIputsWrapper,
  StyledRadiosWrapper,
  StyledCheckbox,
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
    setTaxableIncome(taxableIncome);
    // Apskaiciuota VSD ir moketina VSD

    const taxRate = checkboxValue === 1 ? 0.1552 : 0.1252;
    const maxSSI = checkboxValue === 1 ? 11244.35 : 9070.83;
    const calculatedSSI = taxableIncome * taxRate;
    const finalSSI = Math.min(calculatedSSI, maxSSI);
    setCalcSSI(finalSSI);
    console.log(finalSSI);

    const payableSsi = taxableIncome * taxRate - (paidSSI ? paidSSI : 0);
    const finalPayableSSI = Math.min(payableSsi, maxSSI);
    console.log(paidSSI);

    setPayableSSI(finalPayableSSI);
    console.log(finalPayableSSI);

    // Apskaiciuota PSD ir moketina PSD
    const calcCHI = taxableIncome * 0.0698;
    // const finalCalcCHI =
    if (calcCHI === 0) {
      setCalcCHI(0);
    } else if (calcCHI < 703.56) {
      setCalcCHI(703.56);
    } else if (calcCHI > 5057.06) {
      setCalcCHI(5057.06);
    } else {
      setCalcCHI(calcCHI);
    }

    // Apmokestinamas pelnas
    const taxableProfit =
      radioValue === 0.3
        ? incomeReceived - expenses
        : incomeReceived - expenses - payableSSI - payableCHI;
    setTaxableProfit(taxableProfit);
    // Apskaiciuotas GPM

    if (taxableProfit <= 20000) {
      setCalcPIT(taxableProfit * 0.15 - taxableProfit * 0.1);
    } else if (taxableProfit > 20000 && taxableProfit < 35000) {
      setCalcPIT(
        taxableProfit * 0.15 -
          taxableProfit * (0.1 - (2 / 300000) * (taxableProfit - 20000))
      );
    } else if (taxableProfit >= 35000) {
      if (taxableProfit * (0.1 - (2 / 300000) * (taxableProfit - 20000)) <= 0) {
        setCalcPIT(taxableProfit * 0.15 - 0);
      } else {
        setCalcPIT(
          taxableProfit * 0.15 -
            taxableProfit * (0.1 - (2 / 300000) * (taxableProfit - 20000))
        );
      }
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
    payableSSI,
    payableCHI,
    taxableProfit,
    calcPIT,
  ]);

  useEffect(() => {
    const finalpayableChi = calcCHI - (paidCHI ? paidCHI : 0);
    setPayableCHI(finalpayableChi);
  }, [calcCHI, paidCHI]);

  const procGPM = taxableProfit ? (calcPIT * 100) / taxableProfit : 0;
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
      <StyledIputsWrapper>
        <h1>Individualios veiklos sumų įvedimas:</h1>
        <StyledDivider></StyledDivider>
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
        <StyledRadiosWrapper>
          <div>
            <Input
              theme={theme}
              type='radio'
              identifier='radio'
              value={0.3}
              // checked={radioValue === 0.3}
              changeEvent={() => handleRadioValueChange(0.3)}
            />
            <Label targetinput='radio' size='18px'>
              30% nuo pajamų
            </Label>
          </div>
          <div>
            <Input
              theme={theme}
              type='radio'
              identifier='radio'
              value={0}
              // checked={radioValue === 0}
              changeEvent={() => handleRadioValueChange(0)}
            />
            <Label targetinput='radio' size='18px'>
              faktinės išlaidos
            </Label>
          </div>
        </StyledRadiosWrapper>
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
        <StyledCheckbox>
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
        </StyledCheckbox>
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
            value={Math.round(incomeReceived * 100) / 100}
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
            value={Math.round(taxableIncome * 100) / 100}
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
            value={Math.round(calcSSI * 100) / 100}
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
            value={Math.round(calcCHI * 100) / 100}
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
            value={Math.round(payableSSI * 100) / 100}
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
            value={Math.round(payableCHI * 100) / 100}
            changeEvent={handlePayableCHI}
          />
        </div>
        <br />
        <br />
        <h1>Gyventojų pajamų mokestis:</h1>
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
            value={Math.round(taxableProfit * 100) / 100}
            changeEvent={handleTaxableProfit}
          />
        </div>
        <div>
          <Label targetinput='calc-PIT' size='18px'>
            Apskaičiuota GPM suma ({procGPM.toFixed(2)}%):
          </Label>
          <Input
            theme={theme}
            identifier='calc-PIT'
            type='number'
            value={Math.round(calcPIT * 100) / 100}
            changeEvent={() => handleTaxableProfit}
          />
        </div>
      </StyledOutputsWrapper>
    </StyledWrapper>
  );
};

export default IndividualiosVeiklosMokesciuSkaiciuokleOrganism;

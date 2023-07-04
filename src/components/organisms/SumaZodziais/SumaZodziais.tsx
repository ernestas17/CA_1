import { ChangeEvent, useRef } from 'react';
import Input from '../../atoms/Input';
import { IColorTheme } from '../../../shared/color_themes';
import { StyledBottom, StyledDivider, StyledTop, StyledWrapper } from './styles';
import Label from '../../atoms/Label';

interface INumbers {
    [key: number]: string;
}

const vienetai: INumbers = {
    1: 'vienas',
    2: 'du',
    3: 'trys',
    4: 'keturi',
    5: 'penki',
    6: 'šeši',
    7: 'septyni',
    8: 'aštuoni',
    9: 'devyni',
};

const desimtys: INumbers = {
    10: 'dešimt',
    11: 'vienuolika',
    12: 'dvylika',
    13: 'trylika',
    14: 'keturiolika',
    15: 'penkiolika',
    16: 'šešiolika',
    17: 'septyniolika',
    18: 'aštuoniolika',
    19: 'devyniolika',
    20: 'dvidešimt',
    30: 'trisdešimt',
    40: 'keturiasdešimt',
    50: 'penkiasdešimt',
    60: 'šešiasdešimt',
    70: 'septyniasdešimt',
    80: 'aštuoniasdešimt',
    90: 'devyniasdešimt',
};

interface ICalcBigNumbers {
    calcBigNumbers: (
        val: number,
        num: number,
        textObj: {
            [key: string]: string;
        },
        nextFunction: ICalcFunction['calc'],
        nextLowerFunction: ICalcFunction['calc']
    ) => string;
}

interface ICalcFunction {
    calc: (val: number) => string;
}

const calcBigNumbers: ICalcBigNumbers['calcBigNumbers'] = (val: number, num, textObj, nextFunction, nextLowerFunction) => {
    const amount = Math.floor(val / num);
    const lowerAmount = val % num;

    if (val >= num && val < num * 10) {
        return val % num == 0
            ? `${val.toString().charAt(0) == '1' ? textObj.single : `${nextFunction(amount)} ${textObj.multiple}`}`
            : `${
                  val.toString().charAt(0) == '1'
                      ? `${textObj.single} ${nextFunction(lowerAmount)}`
                      : `${nextFunction(amount)} ${textObj.multiple} ${nextFunction(lowerAmount)}`
              }`;
    } else if (val >= num * 10 && val < num * 100) {
        const millionsText =
            (amount >= 10 && amount <= 20) || amount % 10 == 0
                ? textObj.multiple2
                : amount.toString().charAt(1) == '1'
                ? textObj.single
                : textObj.multiple;

        return val % num == 0 ? `${nextFunction(amount)} ${millionsText}` : `${nextFunction(amount)} ${millionsText} ${nextFunction(lowerAmount)}`;
    } else if (val >= num * 100 && val < num * 1000) {
        const millionsText =
            amount.toString().charAt(1) == '1' || amount % 10 == 0
                ? textObj.multiple2
                : amount.toString().charAt(2) == '1'
                ? textObj.single
                : textObj.multiple;

        return val % 1000000 == 0
            ? `${nextLowerFunction(amount)} ${millionsText}`
            : `${nextLowerFunction(amount)} ${millionsText} ${nextFunction(lowerAmount)}`;
    } else {
        return nextFunction(val);
    }
};

export interface ISumaZodziais {
    theme: IColorTheme | undefined;
}

const SumaZodziais = ({ theme }: ISumaZodziais) => {
    const outputRef = useRef<HTMLDivElement>(null);

    const numberToText = (val: number) => {
        if (val == 0) return 'nulis';
        if (val > 1000000000000000000 * 1000) return 'Per didelis skaičius!';
        if (!val) return 'Įveskite skaičių!';

        return calculateQuintillions(val);
    };

    const calculateQuintillions = (val: number) => {
        return calcBigNumbers(
            val,
            1000000000000000000,
            {
                single: 'trilijonas',
                multiple: 'trilijonai',
                multiple2: 'trilijonų',
            },
            calculateQuadrillions,
            calculateTrillions
        );
    };

    const calculateQuadrillions = (val: number) => {
        return calcBigNumbers(
            val,
            1000000000000000,
            {
                single: 'bilijardas',
                multiple: 'bilijardai',
                multiple2: 'bilijardų',
            },
            calculateTrillions,
            calculateBillions
        );
    };

    const calculateTrillions = (val: number) => {
        return calcBigNumbers(
            val,
            1000000000000,
            {
                single: 'bilijonas',
                multiple: 'bilijonai',
                multiple2: 'bilijonų',
            },
            calculateBillions,
            calculateMillions
        );
    };

    const calculateBillions = (val: number) => {
        return calcBigNumbers(
            val,
            1000000000,
            {
                single: 'milijardas',
                multiple: 'milijardai',
                multiple2: 'milijardų',
            },
            calculateMillions,
            calculateThousands
        );
    };

    const calculateMillions = (val: number) => {
        return calcBigNumbers(
            val,
            1000000,
            {
                single: 'milijonas',
                multiple: 'milijonai',
                multiple2: 'milijonų',
            },
            calculateThousands,
            calculateHundreds
        );
    };

    const calculateThousands = (val: number) => {
        return calcBigNumbers(
            val,
            1000,
            {
                single: 'tūkstantis',
                multiple: 'tūkstančiai',
                multiple2: 'tūkstančių',
            },
            calculateHundreds,
            calculateHundreds
        );
    };

    const calculateHundreds = (val: number) => {
        if (val >= 100) {
            const hundreds = Math.floor(val / 100);
            const tens = val % 100;

            return val % 100 == 0
                ? `${val.toString().charAt(0) == '1' ? 'šimtas' : `${calculateTens(hundreds)} šimtai`}`
                : `${val.toString().charAt(0) == '1' ? 'šimtas' : `${calculateTens(hundreds)} šimtai`} ${calculateTens(tens)}`;
        } else {
            return calculateTens(val);
        }
    };

    const calculateTens = (val: number) => {
        if (val < 10) {
            return vienetai[val];
        } else if (val >= 10 && val < 20) {
            return desimtys[val];
        } else {
            const roundedNum = val - (val % 10);
            const vienetai = val % 10;

            return val % 10 === 0 ? `${desimtys[roundedNum]}` : `${desimtys[roundedNum]} ${calculateSingles(vienetai)}`;
        }
    };

    const calculateSingles = (val: number) => {
        return vienetai[val];
    };

    const handleNumberInput = (e: ChangeEvent<HTMLInputElement>) => {
        const element = e.target as HTMLInputElement;
        const value = parseFloat(element?.value);

        const output = outputRef?.current;

        if (output) output.innerText = numberToText(value);
    };

    return (
        <StyledWrapper>
            <StyledTop>
                <Label targetinput='numbers-input' size='18px'>
                    Įveskite sumą ir ji bus paversta žodžiais.
                </Label>
                <Input theme={theme} identifier='numbers-input' type='number' changeEvent={(e) => handleNumberInput(e)} />
            </StyledTop>
            <StyledDivider theme={theme} className='zodziai-divider'></StyledDivider>
            <StyledBottom theme={theme}>
                <div ref={outputRef} className='output'>
                    Įveskite skaičių!
                </div>
            </StyledBottom>
        </StyledWrapper>
    );
};

export default SumaZodziais;

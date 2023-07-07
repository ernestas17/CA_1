import { ChangeEvent, useState } from "react";
import { IColorTheme } from "../../../shared/color_themes";
import Input from "../../atoms/Input";
import Label from "../../atoms/Label";
import Select from "../../atoms/Select";
import {
  StyledCheckbox,
  StyledRadiosWrapper,
} from "../IndividualiosVeiklosMokesciuSkaiciuokle/styles";

interface IAtlyginimoIrMokesciuSkaiciuokleOrganismProps {
  theme?: IColorTheme;
}

const AtlyginimoIrMokesciuSkaiciuokleOrganism = ({
  theme,
}: IAtlyginimoIrMokesciuSkaiciuokleOrganismProps) => {
  const [years, setYears] = useState<string[]>(["2023"]);
  const [procent, setProcent] = useState<string[]>(["0%", "2.1%", "3%"]);

  const [selectedSalaryOption, setSelectedSalaryOption] = useState("");

  const [onPaperIncome, setOnPaperIncome] = useState(0);
  const [salary, setSalary] = useState(0);

  const [npd, setNpd] = useState(0);
  const [pnpd, setPnpd] = useState(0);

  const [incomeTax, setIncomeTax] = useState(0);
  const [healthInsurance, setHealthInsurance] = useState(0);
  const [pensionInsurance, setPensionInsurance] = useState(0);
  const [sodra, setSodra] = useState(0);
  const [JobsPrice, setJobsPrice] = useState(0);

  const handleMonthlyIncomeChange = (e: ChangeEvent<HTMLInputElement>) => {
    const monthlyIncomeValue = Number(e.target.value) || 0;
    setOnPaperIncome(monthlyIncomeValue);
    let npdValue = 0;

    if (monthlyIncomeValue < 840) npdValue = 625;
    else if (monthlyIncomeValue > 840 && monthlyIncomeValue < 1926)
      npdValue = 625 - 0.42 * (monthlyIncomeValue - 840);
    else if (monthlyIncomeValue > 1926)
      npdValue = 400 - 0.18 * (monthlyIncomeValue - 642);

    setNpd(() => parseFloat(npdValue.toFixed(2)));

    const yearlyIncome = monthlyIncomeValue * 12;
    let pnpdValue = 0;

    if (yearlyIncome < 10080) pnpdValue = 7500;
    else if (yearlyIncome > 10080 && yearlyIncome < 23112)
      pnpdValue = parseFloat((7500 - 0.42 * (yearlyIncome - 10080)).toFixed(2));
    else if (yearlyIncome > 23112)
      pnpdValue = parseFloat((4800 - 0.18 * (yearlyIncome - 7704)).toFixed(2));

    setPnpd(() => pnpdValue);

    const incomeTaxValue = (monthlyIncomeValue - npdValue) * 0.2;
    setIncomeTax(() => parseFloat(incomeTaxValue.toFixed(2)));

    const healthInsuranceValue = monthlyIncomeValue * 0.0698;
    setHealthInsurance(() => parseFloat(healthInsuranceValue.toFixed(2)));

    const pensionInsuranceValue = monthlyIncomeValue * 0.1252;
    setPensionInsurance(() => parseFloat(pensionInsuranceValue.toFixed(2)));

    const salaryValue =
      monthlyIncomeValue -
      (incomeTaxValue + healthInsuranceValue + pensionInsuranceValue);
    setSalary(() => parseFloat(salaryValue.toFixed(2)));
    console.log("Salary: " + salaryValue);

    const sodraValue = monthlyIncomeValue * 0.0177;
    setSodra(() => parseFloat(sodraValue.toFixed(2)));

    const JobsPrice = monthlyIncomeValue + sodraValue;
    setJobsPrice(() => parseFloat(JobsPrice.toFixed(2)));
  };

  const handleSalaryOptionChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSelectedSalaryOption(e.target.id);

    if (e.target.id === "OnPaperCheckbox") {
      setSalary(onPaperIncome);
    } else if (e.target.id === "calculatedIncomeCheckbox") {
      const salaryValue =
        onPaperIncome - (incomeTax + healthInsurance + pensionInsurance);
      setSalary(parseFloat(salaryValue.toFixed(2)));
    }
  };

  const handleNpdCalculationOptionChange = (
    e: ChangeEvent<HTMLInputElement>
  ) => {
    if (e.target.id === "systemCalculation") {
      setNpd(0);
    } else {
      const npdValue = npd || 0;
      setNpd(npdValue);
    }
  };

  const handleNpdChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNpd(Number(e.target.value));
  };

  const handlePensionCheckboxChange = (e: ChangeEvent<HTMLInputElement>) => {
    // todo
  };

  const handleProcentChange = (e: ChangeEvent<HTMLSelectElement>) => {
    // todo
  };

  return (
    <>
      <div>
        <Select defaultvalue={years[0]} theme={theme} identifier="years">
          {years.map((num) => {
            return (
              <option key={"years" + num} value={num}>
                {num}
              </option>
            );
          })}
        </Select>
      </div>
      <div>
        <StyledRadiosWrapper>
          <div>
            <Label targetinput="salaryLabel" size="18px">
              Atlyginimas
            </Label>
            <Label targetinput="onPaperLabel" size="18px">
              "ant popieriaus"
            </Label>
            <Input
              theme={theme}
              type="radio"
              identifier="OnPaperCheckbox"
              changeEvent={handleSalaryOptionChange}
              checked={selectedSalaryOption === "OnPaperCheckbox"}
            />
            <Label targetinput="monthlyIncomeLabel" size="18px">
              "į rankas"
            </Label>
            <Input
              theme={theme}
              type="radio"
              identifier="calculatedIncomeCheckbox"
              checked={selectedSalaryOption === "calculatedIncomeCheckbox"}
              changeEvent={handleSalaryOptionChange}
            />
          </div>
        </StyledRadiosWrapper>
      </div>
      <div>
        <Label targetinput="calculatedIncomeLabel" size="18px">
          "Ant popieriaus"
        </Label>
        <Input
          theme={theme}
          identifier="calculatedIncome"
          type="number"
          value={Number(onPaperIncome)}
          changeEvent={handleMonthlyIncomeChange}
        />
      </div>
      <div>
        <Label targetinput="NPDLabel" size="18px">
          Kaip skaičiuoti NPD?
        </Label>
      </div>
      <StyledRadiosWrapper>
        <div>
          <Label targetinput="systemCalculationLabel" size="18px">
            paskaičiuos sistema
          </Label>
          <Input
            theme={theme}
            type="radio"
            identifier="systemCalculation"
            changeEvent={handleNpdCalculationOptionChange}
          />
          <Label targetinput="declareMyselfLabel" size="18px">
            nurodysiu pats
          </Label>
          <Input
            theme={theme}
            type="radio"
            identifier="declareMyself"
            changeEvent={handleNpdCalculationOptionChange}
          />
        </div>
      </StyledRadiosWrapper>
      <div>
        <Label targetinput="npdLabel" size="18px">
          Taikomas NPD
        </Label>
        <Input
          theme={theme}
          identifier="npd"
          type="number"
          value={Number(npd)}
          changeEvent={handleNpdChange}
        />
      </div>
      <div>
        <StyledCheckbox>
          <Label targetinput="pensionLabel" size="18px">
            Kaupiu pensijai papildomai
          </Label>
          <Input
            theme={theme}
            identifier="pensionCheckbox"
            type="checkbox"
            changeEvent={handlePensionCheckboxChange}
          />
        </StyledCheckbox>
      </div>
      <div>
        <Label targetinput="procentLabel" size="18px">
          Kiek %?
        </Label>
        <div>
          <Select
            defaultvalue={procent[0]}
            theme={theme}
            changeEvent={handleProcentChange}
            identifier="procent"
          >
            {procent.map((num) => {
              return (
                <option key={"procent" + num} value={num}>
                  {num}
                </option>
              );
            })}
          </Select>
        </div>
      </div>
      <>
        <div>
          <Label targetinput="onPaperIncomeLabel" size="18px">
            Priskaičiuotas atlyginimas "ant popieriaus"
          </Label>
          <Input
            theme={theme}
            identifier="onPaperIncome"
            type="number"
            value={Number(onPaperIncome)}
            changeEvent={handleMonthlyIncomeChange}
          />
        </div>
        <div>
          <Label targetinput="npdLabel" size="18px">
            Pritaikytas NPD
          </Label>
          <Input
            theme={theme}
            identifier="npd"
            type="number"
            value={Number(npd)}
            disabled
          />
        </div>
        <div>
          <Label targetinput="pnpdLabel" size="18px">
            Pritaikytas PNPD
          </Label>
          <Input
            theme={theme}
            identifier="pnpd"
            type="number"
            value={Number(pnpd)}
            disabled
          />
        </div>
        <div>
          <Label targetinput="incomeTaxLabel" size="18px">
            Pajamų mokestis 20 %
          </Label>
          <Input
            theme={theme}
            identifier="incomeTax"
            type="number"
            value={Number(incomeTax)}
            disabled
          />
        </div>
        <div>
          <Label targetinput="healthInsuranceLabel" size="18px">
            Sodra. Sveikatos draudimas 6.98 %
          </Label>
          <Input
            theme={theme}
            identifier="healthInsurance"
            type="number"
            value={Number(healthInsurance)}
            disabled
          />
        </div>
        <div>
          <Label targetinput="pensionInsuranceLabel" size="18px">
            Sodra. Pensijų ir soc. draudimas 15.52 %
          </Label>
          <Input
            theme={theme}
            identifier="pensionInsurance"
            type="number"
            value={Number(pensionInsurance)}
            disabled
          />
        </div>
        <div>
          <Label targetinput="salaryLabel" size="18px">
            Išmokamas atlyginimas "į rankas"
          </Label>
          <Input
            theme={theme}
            identifier="salary"
            type="number"
            value={Number(salary)}
          />
        </div>
        <div>
          <Label targetinput="taxesPaidByTheEmployer" size="18px">
            Darbdavio sumokami mokesčiai
          </Label>
        </div>
        <div>
          <Label targetinput="sodraLabel" size="18px">
            Sodra 1.77 %
          </Label>
          <Input
            theme={theme}
            identifier="sodra"
            type="number"
            value={Number(sodra)}
            disabled
          />
        </div>
        <div>
          <Label targetinput="JobsPriceLabel" size="18px">
            Visa darbo vietos kaina
          </Label>
          <Input
            theme={theme}
            identifier="JobsPrice"
            type="number"
            value={Number(JobsPrice)}
          />
        </div>
      </>
    </>
  );
};
export default AtlyginimoIrMokesciuSkaiciuokleOrganism;

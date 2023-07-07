import { ChangeEvent, useRef, useState } from "react";
import Label from "../../atoms/Label";
import Select from "../../atoms/Select";
import Input from "../../atoms/Input";
import { IColorTheme } from "../../../shared/color_themes";

interface IPVMSkaiciuokleProps {
  theme?: IColorTheme;
}

const PVMSkaiciuokleOrganism = ({ theme }: IPVMSkaiciuokleProps) => {
  const [pvm, setPvm] = useState<string[]>(["21%", "9%", "5%"]);
  const [sum, setSum] = useState<number>();
  const [pvmSum, setPvmSum] = useState<number>(0);
  const [totalSum, setTotalSum] = useState<number>();

  const sumRef = useRef();

  const handlePvmChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const selectedIndex = e.target.selectedIndex;
    const selectedPvm = parseFloat(pvm[selectedIndex]);
    if (!isNaN(selectedPvm)) {
      const calculatedPvmSum = parseFloat(
        ((sum || 0) * (selectedPvm / 100)).toFixed(2)
      );
      setPvmSum(calculatedPvmSum);
      const calculatedTotalSum = parseFloat(
        ((sum || 0) + calculatedPvmSum).toFixed(2)
      );
      setTotalSum(calculatedTotalSum);
    } else {
      setPvmSum(0);
      setTotalSum(sum);
    }
  };

  const handleSumChange = (e: ChangeEvent<HTMLInputElement>) => {
    const enteredSum = parseFloat(e.target.value);
    setSum(enteredSum);

    const selectedIndex = (document.getElementById("pvm") as HTMLSelectElement)
      .selectedIndex;
    const selectedPvm = parseFloat(pvm[selectedIndex]);

    if (!isNaN(enteredSum) && !isNaN(selectedPvm)) {
      const calculatedPvmSum = parseFloat(
        ((enteredSum * selectedPvm) / 100).toFixed(2)
      );
      setPvmSum(calculatedPvmSum);
      const calculatedTotalSum = parseFloat(
        (enteredSum + calculatedPvmSum).toFixed(2)
      );
      setTotalSum(calculatedTotalSum);
    } else {
      setPvmSum(0);
      setTotalSum(enteredSum);
    }
  };

  const handleTotalSumChange = (e: ChangeEvent<HTMLInputElement>) => {
    const enteredTotalSum = parseFloat(e.target.value);

    const selectedIndex = (document.getElementById("pvm") as HTMLSelectElement)
      .selectedIndex;
    const selectedPvm = parseFloat(pvm[selectedIndex]);

    if (!isNaN(enteredTotalSum) && !isNaN(selectedPvm)) {
      const calculatedSum = parseFloat(
        (enteredTotalSum / (1 + selectedPvm / 100)).toFixed(2)
      );
      setSum(calculatedSum);
      const calculatedPvmSum = parseFloat(
        ((calculatedSum * selectedPvm) / 100).toFixed(2)
      );
      setPvmSum(calculatedPvmSum);
      setTotalSum(enteredTotalSum);
    } else {
      setSum(enteredTotalSum);
      setPvmSum(0);
      setTotalSum(enteredTotalSum);
    }
  };

  return (
    <>
      <div>
        <Label targetinput="pvm" size="18px">
          PVM tarifas
        </Label>
        <Select
          defaultvalue={pvm[0]}
          theme={theme}
          changeEvent={handlePvmChange}
          identifier="pvm"
        >
          {pvm.map((num) => {
            return (
              <option key={"pvm" + num} value={num}>
                {num}
              </option>
            );
          })}
        </Select>
      </div>
      <div>
        <Label targetinput="sum" size="18px">
          Suma (be PVM)
        </Label>
        <Input
          type="number"
          value={sum}
          changeEvent={handleSumChange}
          identifier="sum"
          innerRef={sumRef}
          theme={theme}
          min="0"
        />
      </div>
      <div>
        <Label targetinput="pvmSum" size="18px">
          PVM suma
        </Label>
        <Input
          type="number"
          value={pvmSum}
          identifier="pvmSum"
          innerRef={sumRef}
          disabled
          theme={theme}
          min="0"
        />
      </div>
      <div>
        <Label targetinput="totalSum" size="18px">
          Bendra suma (su PVM)
        </Label>
        <Input
          type="number"
          value={totalSum}
          changeEvent={handleTotalSumChange}
          identifier="totalSum"
          innerRef={sumRef}
          theme={theme}
          min="0"
        />
      </div>
    </>
  );
};

export default PVMSkaiciuokleOrganism;

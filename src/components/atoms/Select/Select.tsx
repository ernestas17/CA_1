import { useState, useEffect } from 'react';

interface IOptionProps {
  value: string;
  label: string | number;
}

const Select = () => {
  const [options, setOptions] = useState<IOptionProps[]>([]);
  const [selectedValue, setSelectedValue] = useState<string>('');

  // Function to handle selection changes
  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    setSelectedValue(value);
  };

  const populateDropdown = () => {
    // Priklausomai nuo puslapio, kokių reikės duomenų
    const fetchedOptions: IOptionProps[] = [
      { value: '1', label: 'Option 1' },
      { value: '2', label: 'Option 2' },
      { value: '3', label: 100 },
    ];
    setOptions(fetchedOptions);
  };

  useEffect(() => {
    populateDropdown();
  }, []);

  return (
    <select value={selectedValue} onChange={handleSelectChange}>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

export default Select;

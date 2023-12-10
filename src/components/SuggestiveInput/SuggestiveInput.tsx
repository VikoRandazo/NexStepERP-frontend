import React, { FC, useEffect, useState } from "react";
import styles from "./SuggestiveInput.module.scss";

interface SuggestiveInputProps {
  name: string;
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  dataToInfer: string[];
}

const SuggestiveInput: FC<SuggestiveInputProps> = ({ name, value, setValue, dataToInfer }) => {
  const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>([]);

  const onChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    const {value} = e.currentTarget
setValue(value)
  }

  const filterSuggestions = () => {
    const filtered = dataToInfer.filter((suggestion) => {
      return value ? suggestion.includes(value) : "";
    });
    
    setFilteredSuggestions(filtered)
  };

  useEffect(() => {
    filterSuggestions()
  }, [value])
  

  return (
    <div className={styles.SuggestiveInput}>
      <input name={name} value={value} onChange={onChange} />
      {filteredSuggestions
        .filter((suggestion) => suggestion.includes(value))
        .map((suggestion) => (
          <div className={styles.suggestion}>
            <span>
              {suggestion}</span>
          </div>
        ))}
    </div>
  );
};

export default SuggestiveInput;

import { useState } from "react";

const useCounter = (initialValue = 0) => {
  const [counter, setCounter] = useState(initialValue);

  const handleMinus = () => {
    setCounter(counter - 1);
  };

  const handlePlus = () => {
    setCounter(counter + 1);
  };

  const handleReset = () => {
    setCounter(0);
  };

  return {
    counter,
    handleMinus,
    handlePlus,
    handleReset,
  };
};

export default useCounter;

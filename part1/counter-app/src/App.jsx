import { useState } from "react";
import Display from "./Display";
const App = () => {
  let [counter, setCounter] = useState(0);
  // setTimeout(() => {
  //   setCounter(counter + 1);
  //   console.log(counter);
  //  }, 1000);

  const incrementCounter = () => {
    setCounter(counter + 1);
  };

  return (
    <div>
      <Display counter={counter} />
      <button onClick={incrementCounter}>Plus-One</button>
    </div>
  );
};

export default App;

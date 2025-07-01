import { useState } from "react";
import Display from "./Display";
import MyButton from "./MyButton";

const App = () => {
  let initialState = {
    left: 1,
    right: 2,
  };

  let [clicks, setClicks] = useState(initialState);
  let [clickHistory, setHistory] = useState(["L", "R", "R"]);
  let [totalClicks, setTotal] = useState(3);
  const increaseByOneLeft = () => {
    let newLeft = clicks.left + 1;
    let newState = {
      left: newLeft,
      right: clicks.right,
    };
    setClicks(newState);
    setHistory(clickHistory.concat("L"));
    setTotal(newLeft + clicks.right);
  };
  const increaseByOneRight = () => {
    let newRight = clicks.right + 1;
    setClicks({ left: clicks.left, right: newRight + 1 });
    setHistory([...clickHistory, "R"]);
    setTotal(clicks.left + newRight);
  };

  return (
    <div>
      {clicks.left}
      <MyButton someFunction={increaseByOneLeft} text={"Left"} />
      {clicks.right}
      <MyButton someFunction={increaseByOneRight} text={"Right"} />
      <div>click history: {clickHistory}</div>
      <div>total clicks: {totalClicks}</div>
    </div>
  );
};

export default App;

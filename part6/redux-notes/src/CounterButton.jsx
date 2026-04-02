import  {useCounterDispatch} from "./CounterContext";

const CounterButton = (props) => {
  const counterDispatch = useCounterDispatch();

  return (
    <button
      onClick={() => {
        counterDispatch({ type: props.type });
      }}
    >
      {props.label}
    </button>
  );
};
export default CounterButton;

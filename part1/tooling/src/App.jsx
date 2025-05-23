import SayHello from './SayHello';

let App = () => {
  // return React.createElement(
  //   "div",
  //   {},
  //   [React.createElement(SayHello, {lastWord: "React"}),
  //   React.createElement(SayHello, {lastWord: "javascript"})]
  // );

  return (
    <div> 
      
      <SayHello lastWord="React" />
       <SayHello lastWord="javascript" />
    </div>
  );
};

export default App;
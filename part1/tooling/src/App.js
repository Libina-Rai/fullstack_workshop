import React from 'react';
import SayHello from './sayHello.js';

let App = () => {
  return React.createElement(
    "div",
    {},
    [React.createElement(SayHello, {lasWord: "React"}),
    React.createElement(SayHello, {lasWord: "javascript"})]
  ); 
};

export default App;
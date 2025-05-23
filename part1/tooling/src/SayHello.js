import React from 'react';

let SayHello = (props) =>{
  return React.createElement("h1",{id:"header"},`This is a pure ${props.lasWord}`);
}
export default SayHello;
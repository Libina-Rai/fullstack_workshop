
let SayHello = (props) =>{
  // return React.createElement("h1",{id:"header"},`This is a pure ${props.lastWord}`);
  return <h1 id='header'>This is a pure {props.lastWord} </h1>
  
}
export default SayHello;
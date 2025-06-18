
let SayHello = ({person}) =>{
  
  // return React.createElement("h1",{id:"header"},`This is a pure ${props.lastWord}`);
  
  // const getFullName = () => {
  //   return `My name is ${person.firstName} ${person.lastName} and my id is ${person.id}`;
  // }

  const getFullName = () => `My name is ${person.firstName} ${person.lastName} and my id is ${person.id}`;
  
  
  return <h1 id='header'>
    My name is  {getFullName()} 
    </h1>
  
}
export default SayHello;
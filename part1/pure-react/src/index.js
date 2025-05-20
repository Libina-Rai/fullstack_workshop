let sentence = (props) =>{
  return React.createElement("h1",{id:"header"},`This is a pure ${props.lasWord}`);
}
let App = () => {
  return React.createElement(
    "div",
    {},
    [React.createElement(sentence, {lasWord: "React"}),
    React.createElement(sentence, {lasWord: "javascript"})]
  ); 
};
let container = document.getElementById('Root');
let root = ReactDOM.createRoot(container);
// root.render(App());//function call
root.render(React.createElement(App));//function call if its component 
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';


let container = document.getElementById('Root');
let root = ReactDOM.createRoot(container);
// root.render(App());//function call
root.render(React.createElement(App));//function call if its component 
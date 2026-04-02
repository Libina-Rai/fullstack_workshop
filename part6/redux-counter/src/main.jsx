import { createRoot } from 'react-dom/client'
// import { useState } from 'react'
import { createStore } from 'redux'
import './index.css'

const counterReducer = (state, action) => {
  if (action.type === 'INCREMENT') {
    return state + 1
  } else if (action.type === 'DECREMENT') {
    return state - 1
  } else if (action.type === 'ZERO') {
    return 0
  }

  return state
}

const store = createStore(counterReducer, 0)

function App() {
  // const [count, setCount] = useState(0)

  const increment = () => {
    // setCount(count + 1)
    store.dispatch({ type: 'INCREMENT' })
  }

  return (
    <>
      <div>
        <div>
          The count is: {store.getState()}
        </div>
        <button onClick={increment}>Increment</button>
      </div>
    </>
  )
}

let myRoot = createRoot(document.getElementById('root'))

function myRender() {
  myRoot.render(<App />)
}

store.subscribe(myRender)
myRender()

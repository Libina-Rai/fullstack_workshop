import { createRoot } from 'react-dom/client'
import './index.css'
import store from './reducers/noteReducer'

store.dispatch({
  type: 'NEW_NOTE',
  payload: {
    content: 'the app state is in redux store',
    important: true,
    id: 1
  }
})

store.dispatch({
  type: 'NEW_NOTE',
  payload: {
    content: 'state changes are made with actions',
    important: false,
    id: 2
  }
})

const App = () => {
  return (
    <div>
      <ul>
        {store.getState().map(note => (
          <li key={note.id}>
            {note.content} <strong>{note.important ? 'important' : 'not important'}</strong>
          </li>
        ))}
      </ul>
    </div>
  )
}

let myRoot = createRoot(document.getElementById('root'))

function myRender() {
  myRoot.render(<App />)
}

store.subscribe(myRender)
myRender()

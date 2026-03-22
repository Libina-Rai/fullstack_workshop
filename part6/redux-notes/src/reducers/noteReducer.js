import { createStore } from 'redux'
const noteReducer = (state, action) => {
  if (action.type === 'NEW_NOTE') {
    // state.push(action.payload)
    let newState = [...state, action.payload]
    return newState
  }
  if(action.type === 'TOGGLE_IMPORTANCE') {
    let myState = state.find((note) => note.id === action.payload.id)
    let myUpdatedNote = {...myState, important: !myState.important}
    let newState = state.map((note) => note.id === action.payload.id ? myUpdatedNote : note)
    return newState
  }
  return state
}

const store = createStore(noteReducer, [])

export default noteReducer

/* eslint-disable @typescript-eslint/space-before-function-paren */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React from 'react'
import { FirebaseContext } from './context/firebase'
import { app, db } from './lib/firebaseConfig'

function App() {
  return (
    <div className="App">
      <FirebaseContext.Provider value={{ app, db }}>
        <h1>Hello</h1>
      </FirebaseContext.Provider>
    </div>
  )
}

export default App

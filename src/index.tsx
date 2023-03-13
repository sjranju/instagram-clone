import React from 'react'
import ReactDOM from 'react-dom/client'
import reportWebVitals from './reportWebVitals'
import App from './App'
import { FirebaseContext } from './context/firebase'
import { auth, db } from './lib/firebaseConfig'

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
)
root.render(
  <FirebaseContext.Provider value={{ db, auth }}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </FirebaseContext.Provider>

)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()

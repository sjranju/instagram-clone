/* eslint-disable @typescript-eslint/indent */
import React from 'react'
import ReactDOM from 'react-dom/client'
import reportWebVitals from './reportWebVitals'
import App from './App'
import { FirebaseContext } from './context/firebase'
import { auth, db } from './lib/firebaseConfig'
import store from './store/configStore'
import { Provider } from 'react-redux'
import { SkeletonTheme } from 'react-loading-skeleton'

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
)
root.render(
  <Provider store={store}>
    <FirebaseContext.Provider value={{ db, auth }}>
      {/* <React.StrictMode> */}
      <SkeletonTheme baseColor='#202020' highlightColor='#444'>
        <App />
        {/* </React.StrictMode> */}
      </SkeletonTheme>
    </FirebaseContext.Provider>
  </Provider>

)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()

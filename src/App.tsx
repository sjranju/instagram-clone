/* eslint-disable @typescript-eslint/space-before-function-paren */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
// import { FirebaseContext } from './context/firebase'
// import { app, db } from './lib/firebaseConfig'
import React, { lazy } from 'react'
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import RootLayout from './layouts/RootLayout'
// import Home from './pages/Home'
// import * as ROUTES from './constants/routes'
import './styles/app.css'
const Login = lazy(async () => await import('./pages/login'))

const router = createBrowserRouter(
  createRoutesFromElements(

    <Route path="/" element={<RootLayout />}>
      {/* <Route path="/" element={<Home />} /> */}
      <Route path="/" element={<Login />} />
    </Route>

  )
)

function App() {
  return (

    <RouterProvider router={router} />
    // <div className="App">
    //   <FirebaseContext.Provider value={{ app, db }}>
    //     <h1>Hello</h1>
    //   </FirebaseContext.Provider>
    // </div>
  )
}

export default App

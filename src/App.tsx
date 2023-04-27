/* eslint-disable @typescript-eslint/indent */
/* eslint-disable @typescript-eslint/space-before-function-paren */
/* eslint-disable @typescript-eslint/explicit-function-return-type */

import React, { lazy } from 'react'
import { Route, RouterProvider, createHashRouter, createRoutesFromElements } from 'react-router-dom'
import RootLayout from './layouts/RootLayout'
import * as ROUTES from './constants/routes'
import './styles/app.css'
import { UserContextProvider } from './context/user'

const Login = lazy(async () => await import('./pages/login'))
const SignUp = lazy(async () => await import('./pages/sign-up'))
const NotFound = lazy(async () => await import('./pages/not-found'))
const Dashboard = lazy(async () => await import('./pages/dashboard'))

const router = createHashRouter(
  createRoutesFromElements(

    <Route path="/" element={<RootLayout />} errorElement={<NotFound />}>
      <Route path="/" element={<Login />} />
      <Route path={ROUTES.SIGN_UP} element={<SignUp />} />
      <Route path={ROUTES.DASHBOARD} element={<Dashboard />} />
    </Route>

  )
)

function App() {
  return (
    <UserContextProvider>
      <RouterProvider router={router} />
    </UserContextProvider>
    // <div className="App">
    //   <FirebaseContext.Provider value={{ app, db }}>
    //     <h1>Hello</h1>
    //   </FirebaseContext.Provider>
    // </div>
  )
}

export default App

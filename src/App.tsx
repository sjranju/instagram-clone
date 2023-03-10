/* eslint-disable @typescript-eslint/space-before-function-paren */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
// import { FirebaseContext } from './context/firebase'
// import { app, db } from './lib/firebaseConfig'
import React, { lazy } from 'react'
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import RootLayout from './layouts/RootLayout'
// import Home from './pages/Home'
import * as ROUTES from './constants/routes'
import './styles/app.css'
import { UserContextProvider } from './context/user'
// import UseAuthListener from './hooks/use-auth-listener'
const Login = lazy(async () => await import('./pages/login'))
const SignUp = lazy(async () => await import('./pages/sign-up'))
const NotFound = lazy(async () => await import('./pages/not-found'))
const Dashboard = lazy(async () => await import('./pages/dashboard'))

const router = createBrowserRouter(
  createRoutesFromElements(

    <Route path="/instagram-clone" element={<RootLayout />} errorElement={<NotFound />}>
      {/* <Route path="/" element={<Home />} /> */}
      <Route path={ROUTES.LOGIN} element={<Login />} />
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

/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React, { Suspense } from 'react'
import { Outlet } from 'react-router-dom'

const RootLayout = () => {
  return (
    <div>
      {/* <nav>
        <NavLink to="/">Home</NavLink>
        <NavLink to="login">Login</NavLink>
      </nav> */}
      <main>
        <Suspense fallback={<h1>Loading...</h1>}>
          <Outlet />
        </Suspense>
      </main>
    </div>
  )
}

export default RootLayout

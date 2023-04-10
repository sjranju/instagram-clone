/* eslint-disable @typescript-eslint/indent */
import { User } from 'firebase/auth'
import React, { createContext, useState } from 'react'

interface UserContextType {
  user: User | undefined
  setUser: React.Dispatch<React.SetStateAction<User | undefined>>
}

interface ChildrenPropType {
  children?: React.ReactNode
}

// eslint-disable-next-line @typescript-eslint/consistent-type-assertions
export const UserContext = createContext({} as UserContextType)

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const UserContextProvider = ({ children }: ChildrenPropType) => {
  const getStorageItem = localStorage.getItem('authUser')
  // const [user, setUser] = useState<string | null>(() => (localStorage.getItem('authUser') != null) ? JSON.parse('authUser') : null)
  const [user, setUser] = useState<User | undefined>(() => (getStorageItem != undefined) ? JSON.parse(getStorageItem) : undefined)

  return (
    <div>
      <UserContext.Provider value={{ user, setUser }}>
        {children}
      </UserContext.Provider>
    </div>
  )
}

import { render, screen, fireEvent, act, waitFor } from "@testing-library/react"
import React from "react"
import { Route, Routes, BrowserRouter } from "react-router-dom"
import Login from "./login"
import user from "@testing-library/user-event";
import * as ROUTES from '../constants/routes'
import Dashboard from "./dashboard";
import { UserContextProvider } from "../context/user";
import { Provider } from "react-redux";
import { FirebaseContext } from "../context/firebase";
import { auth, db } from "../lib/firebaseConfig";
import store from "../store/configStore";

// jest.mock('firebase/auth', () => {
//     const mockAuth = {
//         signInWithEmailAndPassword: jest.fn().mockResolvedValue({ user: { uid: 'testUserId' } }),
//     };
//     return {
//         getAuth: jest.fn(() => mockAuth),
//     };
// });

describe('Login', () => {
    afterEach(() => {
        jest.restoreAllMocks();
    });
    test('Renders correctly', () => {
        render(
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Login />} />
                </Routes>
            </BrowserRouter>)
        const myApp = screen.getByRole('login')
        expect(myApp).toBeInTheDocument()
        const emailInput = screen.getByPlaceholderText(/email/i)
        expect(emailInput).toBeInTheDocument()
        const passwordInput = screen.getByPlaceholderText(/password/i)
        expect(passwordInput).toBeInTheDocument()
    })

    test('Login user successfully', async () => {

        user.setup()
        // const mockAuth = {
        //     signInWithEmailAndPassword: jest.fn().mockResolvedValue({ user: { uid: 'testuserId' } })
        // }

        render(
            <Provider store={store}>
                <FirebaseContext.Provider value={{ db, auth }}>
                    <UserContextProvider>
                        <BrowserRouter>
                            <Routes>
                                <Route path="/" element={<Login />} />
                                <Route path={ROUTES.DASHBOARD} element={<Dashboard />} />
                            </Routes>
                        </BrowserRouter>
                    </UserContextProvider>
                </FirebaseContext.Provider>
            </Provider>
        )
        const emailInput = screen.getByPlaceholderText(/email/i)
        act(() => { fireEvent.change(emailInput, { target: { value: "testuser@test.com" } }) })
        const passwordInput = screen.getByPlaceholderText(/password/i)
        act(() => { fireEvent.change(passwordInput, { target: { value: "test_user" } }) })
        const LoginButton = screen.getByRole('button')
        act(() => { fireEvent.click(LoginButton) })
        await waitFor(() => {
            const dashboardPage = screen.getByRole(/dashboardPage/i)
            expect(dashboardPage).toBeInTheDocument()
        })
        screen.debug()
        // await waitFor(() => { expect(localStorage.getItem('displayName')).toBe('test_user') })
    })
})
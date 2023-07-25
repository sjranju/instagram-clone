import React from "react"
import { act, render } from "@testing-library/react"
import App from "./App"

describe('Index', () => {
    test('Renders correctly', () => {
        act(() => {
            render(<App />)

        })
    })
})

import { createContext } from 'react'

export interface User {
    id?: number,
    name?: string
}

export const UserContext = createContext<any>({ id: 1, name: "sasa" })
import { Timestamp } from "firebase/firestore";

export interface Todo {
    id?: string,
    description: string,
    isCompleted?: boolean,
    timestamp?: number
}
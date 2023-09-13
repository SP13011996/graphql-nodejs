import { Todo } from "./todos";

interface User {
    id?: string,
    name: string,
    passowrd: string,
    salt: string,
    todos: Todo[]
}
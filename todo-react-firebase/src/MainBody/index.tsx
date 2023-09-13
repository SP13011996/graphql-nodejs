import { useState } from "react";
import { TodoList } from "../Todo";
import TodoForm from "../TodoForm";
import { Todo } from "../model/todos";

export default function MainBody() {
    const [todos, setTodos] = useState<Todo>({ id: '', description: '' });

    const editTodoCallback = (todo: Todo) => {
        setTodos(todo)
    }
    const showNewListCallback = () => {
        setTodos({ id: '', description: '' })
        console.log("showNewListCallback")
    }

    return (
        <div style={{
            display: 'flex',
            overflowY: 'auto',
            overflowX: 'hidden',
            height: '90vh'
        }}>
            <TodoForm todos={todos} showNewListCallback={showNewListCallback} />
            <TodoList editTodoCallback={editTodoCallback} />
        </div>
    )
}
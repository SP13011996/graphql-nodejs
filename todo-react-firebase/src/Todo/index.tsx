import React, { useEffect, useState } from 'react'
import { TodoCard } from './components/TodoCard'
import todolist from '.././state/todostate'
import firebaseConfig from '.././firebase-config.json'
import { initializeApp } from "firebase/app";
import { getDocs, addDoc, collection, getFirestore } from "firebase/firestore";
import { Todo } from '../model/todos'

const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app)

export const TodoList = (editTodoCallback: { editTodoCallback: any }) => {

    const [gtodolist, settodolist] = useState<Todo[]>([])
    console.log("TodoList")

    useEffect(() => {
        getDocs(collection(firestore, 'todos')).then((e) => {
            let todolist: Todo[] = []
            e.docs.forEach(a => {
                todolist.push({ id: a.id, description: a.data().description, timestamp: a.data().timestamp })
            })
            todolist = todolist.sort((a: Todo, b: Todo) => { return b.timestamp! - a.timestamp! })
            console.log(todolist)
            settodolist(todolist)
        })
    }, [editTodoCallback.editTodoCallback])

    return (
        <React.Fragment>
            <div
                style={{
                    flex: 4,
                    paddingLeft: '10px',
                    overflow: 'auto',
                }}>
                {
                    gtodolist.map((todo, index) => {
                        return <TodoCard key={index} todo={todo} editTodoCallback={editTodoCallback.editTodoCallback} />
                    })
                }
            </div>

        </React.Fragment>
    )
}
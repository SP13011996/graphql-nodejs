import { useEffect, useRef, useState } from "react";
import { Todo } from "../model/todos";
import todolist from "../state/todostate";
import firebaseConfig from '.././firebase-config.json'
import { initializeApp } from "firebase/app";
import { Timestamp, addDoc, collection, doc, getFirestore, updateDoc } from "firebase/firestore";


export default function TodoForm(todos: { todos: Todo, showNewListCallback: any }) {
    const app = initializeApp(firebaseConfig);
    const firestore = getFirestore(app)

    const addTodosToFirestore = async (todo: Todo) => {
        await addDoc(collection(firestore, "todos"), {
            ...todo
        })
        todos.showNewListCallback()
    }
    const updateTodosToFirestore = async () => {
        const docRef = doc(firestore, "todos", todos.todos.id!);
        await updateDoc(docRef, { description: description, timestamp: new Date().getTime() })
        todos.showNewListCallback()
    }

    const [description, setDescription] = useState('')
    const [buttonDescription, setbuttonDescription] = useState('Add')

    const inputref = useRef<HTMLInputElement>(null)

    useEffect(() => {
        inputref.current?.focus()
        setDescription(todos.todos.description)
        if (todos.todos.description != "") {
            setbuttonDescription('Edit')
        }
    }, [todos.todos.description])

    const addTodos = async () => {
        await addTodosToFirestore({ description: description, isCompleted: false, timestamp: new Date().getTime() })
        //todolist.push({ id: `${todolist.length + 1}`, description: description, isCompleted: false })
        todos.showNewListCallback()
        setDescription('')
        inputref.current?.focus()
    }

    const EditTodos = async () => {
        await updateTodosToFirestore()
        //todolist[todolist.findIndex(x => x.id == todos.todos.id)].description = description
        todos.showNewListCallback()
        setbuttonDescription('Add')
        inputref.current?.focus()
    }

    return (
        <div style={{
            flex: 5,
            overflow: 'auto',
        }}>
            <input type="text" ref={inputref} value={description} onChange={(e) => {
                setDescription(e.target.value)
            }} />
            <button onClick={(buttonDescription == "Edit" ? EditTodos : addTodos)}>{buttonDescription}</button>

        </div>
    )
}
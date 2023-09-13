import React from "react";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Todo } from "../../model/todos";


const card = (todo: Todo, editTodoCallback: any) => (
    <React.Fragment>
        <CardContent>
            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                {todo.description}
            </Typography>
        </CardContent>
        <CardActions>
            <Button onClick={() => editTodoCallback(todo)} size="small">Edit</Button>
        </CardActions>
    </React.Fragment>
);

export const TodoCard = (todo: { todo: Todo, editTodoCallback: any }) => {
    return (
        <Card style={{ marginBottom: '10px' }} variant="outlined">
            {card(todo.todo, todo.editTodoCallback)}</Card>
    )
}
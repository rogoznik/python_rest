import React from 'react';
import { useParams } from 'react-router-dom'
import ToDoList from './ToDoList';

function Project(props) {
    let { id } = useParams();
    let todos = props.todos.filter((todo) => todo.project == id)
    return(
        <ToDoList todos={todos} />
    );
}

export default Project;

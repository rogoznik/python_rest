import React from 'react';
import { useParams } from 'react-router-dom';
import ToDoList from './ToDoList';
import NewTodoForm from './NewTodoForm';

function Project(props) {
    const { id } = useParams();
    const todos = props.todos.filter((todo) => todo.project == parseInt(id));
    return(
        <div>
            <NewTodoForm newTodo={props.newTodo} userId={props.userId} projectId={id} />
            <ToDoList todos={todos} deleteTodo={props.deleteTodo} />
        </div>
    );
}

export default Project;

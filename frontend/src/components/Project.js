import React from 'react';
import { useParams } from 'react-router-dom';
import ToDoList from './ToDoList';
import NewTodoForm from './NewTodoForm';
import PropTypes from "prop-types";

function Project(props) {
    const {todos, newTodo, userId, deleteTodo} = props
    const { id } = useParams();
    const projectTodos = todos.filter((todo) => todo.project == parseInt(id));
    return(
        <div>
            <NewTodoForm newTodo={newTodo} userId={userId} projectId={id} />
            <ToDoList todos={projectTodos} deleteTodo={deleteTodo} />
        </div>
    );
}

Project.propTypes = {
    todos: PropTypes.array,
    newTodo: PropTypes.func,
    userId: PropTypes.number,
    deleteTodo: PropTypes.number
};

export default Project;

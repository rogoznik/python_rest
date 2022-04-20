import React from 'react';
import PropTypes from "prop-types";

function ToDoListItem(props) {
    const {todo, deleteTodo} = props;

    let isActive = 'True';
    if (todo.isActive != 1) {
        isActive = 'False';
    }

    function handleClick() {
        if (todo.isActive) {
            deleteTodo(todo.id);
        }
    }

    return (
        <tr>
            <td>
                {props.todo.project}
            </td>
            <td>
                {props.todo.text}
            </td>
            <td>
                {props.todo.createDate}
            </td>
            <td>
                {props.todo.updateDate}
            </td>
            <td>
                {isActive}
            </td>
            <td>
                <button onClick={() => handleClick()}>Del</button>
            </td>
        </tr>
    );
}

ToDoListItem.propTypes = {
    todo: PropTypes.object,
    deleteTodo: PropTypes.func
};

function ToDoList(props) {
    const {todos, deleteTodo} = props;

    return (
        <table>
            <thead>
                <tr>
                    <th>
                        project
                    </th>
                    <th>
                        text
                    </th>
                    <th>
                        createDate
                    </th>
                    <th>
                        updateDate
                    </th>
                    <th>
                        isActive
                    </th>
                    <th>
                        Actions
                    </th>
                </tr>
            </thead>
            <tbody>
                {todos.map((todo) => <ToDoListItem key={todo.id.toString()} todo={todo} deleteTodo={deleteTodo} />)}
            </tbody>
        </table>
    );
}

ToDoList.propTypes = {
    todos: PropTypes.arrya,
    deleteTodo: PropTypes.func
};

export default ToDoList;

import React from 'react';

function ToDoListItem(props) {
    let isActive = 'True';
    if (props.todo.isActive != 1) {
        isActive = 'False';
    }

    function handleClick() {
        if (props.todo.isActive) {
            props.deleteTodo(props.todo.id);
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

function ToDoList(props) {
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
                {props.todos.map((todo) => <ToDoListItem key={todo.id.toString()} todo={todo} deleteTodo={props.deleteTodo} />)}
            </tbody>
        </table>
    );
}

export default ToDoList;

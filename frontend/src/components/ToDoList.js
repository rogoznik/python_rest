import React from 'react';

function ToDoListItem(props) {
    let isActive = 'True';
    if (props.todo.isActive != 1) {
        isActive = 'False';
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
        </tr>
    );
}

function ToDoList(props) {
    return(
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
                </tr>
            </thead>
            <tbody>
                {props.todos.map((todo) => <ToDoListItem todo={todo} />)}
            </tbody>
        </table>
    );
}

export default ToDoList;

import React, { useState } from 'react';
import PropTypes from "prop-types";

function NewTodo(props) {
    const {newTodo, projectId, userId} = props;

    const [textTodo, setTextTodo] = useState('');

    function handleChangeTextDodo(event) {
        setTextTodo(event.target.value);
    }

    function handleSubmit(event) {
        const data = {
            'project': projectId,
            'author': userId,
            'text': textTodo
        };
        newTodo(data);
        event.preventDefault();
    }

    return(
        <form onSubmit={(event) => handleSubmit(event)}>
            <div>
                <textarea placeholder="Text todo" onChange={(event) => handleChangeTextDodo(event)}></textarea>
            </div>
            <input type="submit" value="Add" />
        </form>
        
    );
}

NewTodo.propTypes = {
    newTodo: PropTypes.func,
    projectId: PropTypes.number,
    userId: PropTypes.number
};

export default NewTodo;

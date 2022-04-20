import React, { useState } from 'react';

function NewTodo(props) {

    const [textTodo, setTextTodo] = useState('');

    function handleChangeTextDodo(event) {
        setTextTodo(event.target.value);
    }

    function handleSubmit(event) {
        const data = {
            'project': props.projectId,
            'author': props.userId,
            'text': textTodo
        };
        props.newTodo(data);
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

export default NewTodo;

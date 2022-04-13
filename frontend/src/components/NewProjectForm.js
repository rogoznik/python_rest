import React, { useState } from 'react';
import PropTypes from "prop-types";

function NewProjectForm(props) {
    const {newProject, users} = props;

    const [nameProject, setName] = useState('');
    const [linkToRepo, setLinkToRepo] = useState('');
    const [usersProject, setUsers] = useState([]);

    function handleNameChange(event) {
        setName(event.target.value);
    }

    function handleLinkChange(event) {
        setLinkToRepo(event.target.value);
    }

    function handleUsersChange(event) {
        if (!event.target.selectedOptions) {
            return;
        }

        let users = [];
        for (let i=0; i < event.target.selectedOptions.length; i++) {
            users.push(parseInt(event.target.selectedOptions.item(i).value));
        }

        setUsers(users);
    }

    function handleSubmit(event) {
        newProject(nameProject, linkToRepo, usersProject);
        event.preventDefault();
    }

    return (
        <form onSubmit={(event) => handleSubmit(event)}>
            <div>
                <input type="text" name="name" placeholder="name" onChange={(event) => handleNameChange(event)}/>
            </div>
            <div>
                <input type="text" name="linkToRepo" placeholder="link to repo" onChange={(event) => handleLinkChange(event)}/>
            </div>
            <div>
                <label>Users</label>
                <select multiple name="users" onChange={(event) => handleUsersChange(event)}>
                    {users.map((user) => <option key={user.id.toString()} value={user.id}>{user.firstName} {user.lastName}</option>)}
                </select>
            </div>
            <input type="submit" value="Create" />
        </form>
    );
}

NewProjectForm.propTypes = {
    newProject: PropTypes.func,
    users: PropTypes.array
};

export default NewProjectForm;

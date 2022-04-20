import React from 'react';
import PropTypes from "prop-types";

function UserListItem(props) {
    const {user} = props;

    return (
        <tr>
            <td>
                {user.username}
            </td>
            <td>
                {user.firstName}
            </td>
            <td>
                {user.lastName}
            </td>
            <td>
                {user.email}
            </td>
        </tr>
    );
}

UserListItem.propTypes = {
    user: PropTypes.object
};

function UserList(props) {
    const {users} = props;

    return (
        <table>
            <thead>
                <tr>
                    <th>
                        username
                    </th>
                    <th>
                        firstname
                    </th>
                    <th>
                        lastname
                    </th>
                    <th>
                        email
                    </th>
                </tr>
            </thead>
            <tbody>
                {users.map((user) => <UserListItem key={user.id} user={user} />)}
            </tbody>
        </table>
    );
}

UserList.propTypes = {
    users: PropTypes.array
};

export default  UserList;

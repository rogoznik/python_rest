import React from 'react';

function UserListItem(props) {
    return (
        <tr>
            <td>
                {props.user.username}
            </td>
            <td>
                {props.user.firstName}
            </td>
            <td>
                {props.user.lastName}
            </td>
            <td>
                {props.user.email}
            </td>
        </tr>
    );
}

function UserList(props) {
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
                {props.users.map((user) => <UserListItem key={user.id} user={user} />)}
            </tbody>
        </table>
    );
}

export default  UserList;

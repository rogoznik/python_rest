import React from 'react';
import {Link} from 'react-router-dom';
import PropTypes from "prop-types";

function Menu(props) {
    const {isAuthenticated, logout} = props;

    return (
        <div className='menu'>
            <nav>
                <ul>
                    <li>
                        <Link to='/'>Main</Link>
                    </li>
                    <li>
                        <Link to='/users'>Users</Link>
                    </li>
                    <li>
                        <Link to='/projects'>Projects</Link>
                    </li>
                    <li>
                        <Link to='/todos'>ToDos</Link>
                    </li>
                    <li>
                        {isAuthenticated() ? <button onClick={() => logout()}>Logout</button> : <Link to='/login'>SignIn</Link>}
                    </li>
                </ul>
            </nav>
        </div>
    )
}

Menu.propTypes = {
    isAuthenticated: PropTypes.func,
    logout: PropTypes.func
};

export default Menu;
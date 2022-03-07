import React from 'react';
import {Link} from 'react-router-dom'

function Menu()  {
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
                </ul>
            </nav>
        </div>
    )
}

export default Menu;
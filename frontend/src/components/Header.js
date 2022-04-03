import React from 'react';
import Menu from './Menu';

function Header(props)  {
    const propsMenu = {
        'isAuthenticated': () => props.propsHeader.isAuthenticated(),
        'logout': () => props.propsHeader.logout()
    };
    return (
        <div className='header'>
            <Menu propsMenu={propsMenu} />
        </div>
    )
}

export default Header;
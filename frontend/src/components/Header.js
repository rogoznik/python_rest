import React from 'react';
import Menu from './Menu';
import PropTypes from "prop-types";

function Header(props) {
    const {isAuthenticated, logout} = props;
    
    return (
        <div className='header'>
            <Menu isAuthenticated={isAuthenticated} logout={logout} />
        </div>
    )
}

Header.propTypes = {
    isAuthenticated: PropTypes.func,
    logout: PropTypes.func
};

export default Header;
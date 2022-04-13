import React, { useState } from 'react';
import PropTypes from "prop-types";

function LoginForm(props) {
    const {getToken} = props;

    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');

    function handleSubmit(event,obj) {
        getToken(obj.login, obj.password);
        event.preventDefault();
    }

    function handleChange(event, callback){
        callback(event.target.value);
    }

    return(
        <form onSubmit={(event) => handleSubmit(event, {'login': login, 'password': password})} >
            <input type="text" name="login" placeholder="login" value={login} onChange={(event)=>handleChange(event, setLogin)} />
            <input type="password" name="password" placeholder="password" value={password} onChange={(event)=>handleChange(event, setPassword)} />
            <input type="submit" value="Login" />
        </form>
    );
}

LoginForm.propTypes = {
    getToken: PropTypes.func
};

export default LoginForm;
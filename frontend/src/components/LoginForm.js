import React, { useState } from 'react';

function handleChange(event, callback){
    callback(event.target.value);
}

function handleSubmit(event, callback, obj) {
    callback(obj.login, obj.password);
    event.preventDefault();
}

function LoginForm(props) {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');

    return(
        <form onSubmit={(event) => handleSubmit(event, props.getToken, {'login': login, 'password': password})} >
            <input type="text" name="login" placeholder="login" value={login} onChange={(event)=>handleChange(event, setLogin)} />
            <input type="password" name="password" placeholder="password" value={password} onChange={(event)=>handleChange(event, setPassword)} />
            <input type="submit" value="Login" />
        </form>
    );
}



export default LoginForm;
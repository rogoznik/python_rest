import './App.css';
import React, { useEffect, useState } from 'react';
import {BrowserRouter, Route, Link, Routes, Redirect, useLocation} from 'react-router-dom'
import axios from 'axios';

import UserList from './components/UserList';
import Header from './components/Header';
import Footer from './components/Footer';
import ProjectList from './components/ProjectList';
import ToDoList from './components/ToDoList';
import MainPage from './components/MainPage';
import Project from './components/Project';
import LoginForm from './components/LoginForm';


const NotFound404 = () => {
    let location = useLocation();
    return (
        <div>
            <h1>Страница по адресу '{location.pathname}' не найдена</h1>
        </div>
    )
}

function App() {
    const [users, setUsers] = useState([]);
    const [projects, setProjects] = useState([]);
    const [todos, setToDos] = useState([]);
    const [token, setToken] = useState('');

    function cleanData() {
        setUsers([]);
        setProjects([]);
        setToDos([]);
    }

    function saveToken(data) {
        localStorage.setItem('token', data);
        setToken(data);
    }
    
    function getToken(login, password) {
        axios
            .post('http://127.0.0.1:8000/api-token-auth/', {'username': login, 'password': password})
            .then(response => {
                saveToken(response.data['token']);
            })
            .catch(error => alert('Неверный логин или пароль'));
    }

    function isAuthenticated() {
        return token != '';
    }

    function logout() {
        saveToken('');
        cleanData();
    }

    function getTokenFromStorage() {
        const data = localStorage.getItem('token');
        setToken(data);
    }

    function getHeaders() {
        let headers = {
            'Content-Type': 'application/json'
        }
        if (isAuthenticated()) {
            headers['Authorization'] = 'Token ' + token
        }
        return headers
    }

    function loadData() {
        const headers = getHeaders();

        axios
            .get('http://127.0.0.1:8000/api/users/', {headers})
            .then(response => {
                const newUsers = response.data.results;
                setUsers(newUsers);
            })
            .catch(error => {
                console.log(error);
        });
        axios
            .get('http://127.0.0.1:8000/api/projects/', {headers})
            .then(response => {
                const newProjects = response.data.results;
                setProjects(newProjects);
            })
            .catch(error => {
                console.log(error);
        });
        axios
            .get('http://127.0.0.1:8000/api/todos/', {headers})
            .then(response => {
                const newToDos = response.data.results;
                setToDos(newToDos);
            })
            .catch(error => {
                console.log(error);
        });
    }
    
    useEffect(() => {
        getTokenFromStorage();
        if (token) {
            loadData();
        }
    }, [token]);

    const propsHeader = {
        'isAuthenticated': () => isAuthenticated(),
        'logout': () => logout()
    };

    return (
        <div className="App">
                <BrowserRouter>
                <Header propsHeader={propsHeader} />
                <div className='body'>
                    <Routes>
                        <Route exact path='/' element={<MainPage />} />

                        <Route exact path='/users' element={<UserList users={users} />} />
                            
                        <Route exact path='/projects' element={<ProjectList projects={projects} />} />

                        <Route exact path='/project/:id' element={<Project todos={todos} />} />
                        
                        <Route exact path='/todos' element={<ToDoList todos={todos} />} />

                        <Route exact path='/login' element={<LoginForm getToken={(login, password) => getToken(login, password)} />} />
                        
                        <Route path='*' element={<NotFound404 />} />
                    </Routes>
                </div>
                </BrowserRouter>
            
            <Footer />
        </div>
    );
}

export default App;

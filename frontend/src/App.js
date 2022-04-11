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
import NewProjectForm from './components/NewProjectForm';


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
    const [userId, setUserId] = useState(0);

    function cleanData() {
        setUsers([]);
        setProjects([]);
        setToDos([]);
    }

    function saveData(data) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('id', data.id);
        setToken(data.token);
        setUserId(data.id);
    }
    
    function getToken(login, password) {
        axios
            .post('http://127.0.0.1:8000/api-token-auth/', {'username': login, 'password': password})
            .then(response => {
                saveData(response.data);
            })
            .catch(error => alert('Неверный логин или пароль'));
    }

    function isAuthenticated() {
        return token != '';
    }

    function logout() {
        saveData({'token': '', 'id': ''});
        cleanData();
    }

    function getDataFromStorage() {
        const token = localStorage.getItem('token');
        const id = localStorage.getItem('id');
        setToken(token);
        setUserId(id);
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

    function newProject(name, linkToRepo, users) {
        const headers = getHeaders();
        const data = {
            'name': name,
            'linkToRepo': linkToRepo,
            'users': users
        };
        axios
            .post('http://127.0.0.1:8000/api/projects/', data, {headers})
            .then(response => {
                loadData();
            })
            .catch(error => {
                console.log(error);
        });
    }

    function newTodo(data) {
        const headers = getHeaders();
        axios
            .post('http://127.0.0.1:8000/api/todos/', data, {headers})
            .then(response => {
                loadData();
            })
            .catch(error => {
                console.log(error);
        });
    }

    function deleteTodo(id) {
        const headers = getHeaders();
        axios
            .delete(`http://127.0.0.1:8000/api/todos/${id}`, {headers})
            .then(response => {
                // const newTodos = todos.filter((todo) => todo.id != id);
                // newTodos.push(
                //     todos.find((todo) => todo.id == id).isActive = false
                // );
                // setToDos(newTodos);
                loadData();
            })
            .catch(error => {
                console.log(error);
        });
    }

    function deleteProject(id) {
        const headers = getHeaders();
        axios
            .delete(`http://127.0.0.1:8000/api/projects/${id}`, {headers})
            .then(response => {
                // const newProjects = projects.filter((project) => project.id != id);
                // setProjects(newProjects);
                // const newTodos = todos.filter((todo) => todo.project != id);
                // setToDos(newTodos);
                loadData();
            })
            .catch(error => {
                console.log(error);
        });
    }
    
    useEffect(() => {
        getDataFromStorage();
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
                            
                        <Route exact path='/projects' element={<ProjectList projects={projects} deleteProject={(id) => deleteProject(id)} />} />

                        <Route exact path='/project/:id' element={<Project todos={todos} userId={userId} newTodo={(data) => newTodo(data)} deleteTodo={(id) => deleteTodo(id)}/>} />
                        
                        <Route exact path='/todos' element={<ToDoList todos={todos} deleteTodo={(id) => deleteTodo(id)}/>} />

                        <Route exact path='/login' element={<LoginForm getToken={(login, password) => getToken(login, password)} />} />

                        <Route exact path='/project/create' element={<NewProjectForm users={users} newProject={(name, linkToRepo, users) => newProject(name, linkToRepo, users)} />} />
                        
                        <Route path='*' element={<NotFound404 />} />
                    </Routes>
                </div>
                </BrowserRouter>
            
            <Footer />
        </div>
    );
}

export default App;

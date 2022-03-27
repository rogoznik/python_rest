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


const NotFound404 = () => {
    let location = useLocation();
    return (
      <div>
          <h1>Страница по адресу '{location.pathname}' не найдена</h1>
      </div>
    )
  }
  

function App() {
    const  [users, setUsers] = useState([]);
    const  [projects, setProjects] = useState([]);
    const  [todos, setToDos] = useState([]);
    
    useEffect(() => {
        axios
            .get('http://127.0.0.1:8000/api/users/')
            .then(response => {
                const newUsers = response.data.results;
                setUsers(newUsers);
            })
            .catch(error => {
                console.log(error);
            });
        axios
            .get('http://127.0.0.1:8000/api/projects/')
            .then(response => {
                const newProjects = response.data.results;
                setProjects(newProjects);
            })
            .catch(error => {
                console.log(error);
            });
        axios
            .get('http://127.0.0.1:8000/api/todos/')
            .then(response => {
                const newToDos = response.data.results;
                setToDos(newToDos);
            })
            .catch(error => {
                console.log(error);
            });
    }, []);

    return (
        <div className="App">
                <BrowserRouter>
                <Header />
                <div className='body'>
                    <Routes>
                        <Route exact path='/' element={<MainPage />} />

                        <Route exact path='/users' element={<UserList users={users} />} />
                            
                        <Route exact path='/projects' element={<ProjectList projects={projects} />} />

                        <Route exact path='/project/:id' element={<Project todos={todos} />} />
                        
                        <Route exact path='/todos' element={<ToDoList todos={todos} />} />
                        
                        <Route path='*' element={<NotFound404 />} />
                    </Routes>
                </div>
                </BrowserRouter>
            
            <Footer />
        </div>
    );
}

export default App;

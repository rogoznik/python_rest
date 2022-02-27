import './App.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import UserList from './components/UserList';
import Header from './components/Header';
import Footer from './components/Footer';


function App() {
    const  [users, setUsers] = useState([]);

    useEffect(() => {
        axios
            .get('http://127.0.0.1:8000/api/users/')
            .then(response => {
                const newUsers = response.data;
                setUsers(newUsers);
                
            })
            .catch(error => {
                console.log(error);
            });
        console.log("useEffect");
    }, []);

    return (
        <div className="App">
            <Header />
            <div className='body'>
                <UserList users={users} />
            </div>
            <Footer />
        </div>
    );
}

export default App;

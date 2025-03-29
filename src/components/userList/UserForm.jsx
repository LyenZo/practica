// src/components/UserForm.js
import React, { useState, useEffect } from 'react';
import { createUser, updateUser } from '../../services/UserService';

const UserForm = ({ user }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password,setPassword] = useState('');

    useEffect(() => {
        if (user) {
            setName(user.name);
            setEmail(user.email);
            setPassword(user.password);
        }
    }, [user]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const userData = { name, email, password };

        if (user) {
            await updateUser(user.id, userData);
        } else {
            await createUser(userData);
        }

        setName('');
        setEmail('');
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Nombre"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
            />
            <input
                type="email"
                placeholder="Correo electrónico"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
            />
            <input
                type="text"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
            />
            <button type="submit">{user ? 'Actualizar' : 'Crear'}</button>
        </form>
    );
};

export default UserForm;

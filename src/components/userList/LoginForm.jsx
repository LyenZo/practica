import React, { useState } from 'react';
import { toast } from 'react-toastify'; // Importamos toast

const LoginForm = ({ onLoginSuccess, onLogout }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        if (!email || !password) {
            setError('Por favor, ingresa ambos campos.');
            return;
        }

        try {
            const response = await fetch('http://34.202.231.19//users/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            if (response.ok) {
                const data = await response.json();
                setIsLoggedIn(true);
                onLoginSuccess(data.access_token);
                toast.success('¡Login exitoso!'); // Mostrar notificación de éxito
            } else {
                setError('Credenciales incorrectas. Intenta de nuevo.');
                toast.error('Credenciales incorrectas'); // Notificación de error
                setIsLoggedIn(false);
            }
        } catch (err) {
            setError('Hubo un problema al intentar iniciar sesión.');
            toast.error('Hubo un problema al intentar iniciar sesión.'); // Notificación de error
            setIsLoggedIn(false);
        }
    };

    const handleLogout = () => {
        setIsLoggedIn(false);
        setEmail('');
        setPassword('');
        setError('');
        onLogout();
    };

    return (
        <div>
            <h2>{isLoggedIn ? 'Bienvenido!' : 'Iniciar Sesión'}</h2>

            {isLoggedIn && (
                <>
                    <p style={{ color: 'green' }}>¡Sesión iniciada correctamente!</p>
                    <button onClick={handleLogout}>Cerrar sesión</button>
                </>
            )}

            {error && <p style={{ color: 'red' }}>{error}</p>}

            {!isLoggedIn && (
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Email:</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label>Contraseña:</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit">Iniciar sesión</button>
                </form>
            )}
        </div>
    );
};

export default LoginForm;

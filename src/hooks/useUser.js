import { useEffect, useState } from "react";
import { getAllUsers } from "../services/UserService";

export default function useUser() {
    const [users, setUsers] = useState([]);  
    const [loading, setLoading] = useState(true); 
    const [error, setError] = useState(null);  

    const fetchUsers = async () => {
        try {
            const data = await getAllUsers();
            if (Array.isArray(data)) {  
                setUsers(data);
            } else {
                setUsers([]); 
                setError("Los datos obtenidos no son válidos.");
            }
        } catch (error) {
            console.error("ERROR:", error);
            setError("Hubo un problema al cargar los usuarios.");
        } finally {
            setLoading(false);  
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    return { users, loading, error };
}

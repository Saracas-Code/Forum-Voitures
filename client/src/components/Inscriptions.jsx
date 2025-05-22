import ProfileView from "./ProfileView";
import { useState, useEffect } from "react";
import axios from "axios";

const Inscriptions = ({ currentUser, refetchPendingCount  }) => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        axios
            .get("http://localhost:3000/api/users?validated=false", { withCredentials: true })
            .then(res => setUsers(res.data))
            .catch(err => console.error("Erreur lors du chargement des inscriptions:", err));
    }, []);

    const handleRoleChange = (userId, newRole) => {
        setUsers(prevUsers =>
            prevUsers.filter(u => u._id !== userId) // desaparece de la lista tras valider
        );
    };

    const handleValidate = async (userId) => {
        try {
            await axios.put(`http://localhost:3000/api/users/${userId}/validate`, {}, {
                withCredentials: true
            });

            setUsers(prevUsers => prevUsers.filter(u => u._id !== userId));
            refetchPendingCount?.();
        } catch (err) {
            console.error("Erreur lors de la validation de l'utilisateur:", err);
        }
    };

    const handleReject = async (userId) => {
        try {
            await axios.delete(`http://localhost:3000/api/users/${userId}`, {
                withCredentials: true
            });
            setUsers(prevUsers => prevUsers.filter(u => u._id !== userId));
            refetchPendingCount?.();
        } catch (err) {
            console.error("Erreur lors du rejet de l'utilisateur:", err);
        }
    };

    return (
        <div className="profile-list-container">
            <h2>Inscriptions en attente</h2>
            <div className="profile-cards">
                {users.map(user => (
                    <ProfileView
                        key={user.login}
                        user={user}
                        currentUser={currentUser}
                        onRoleChange={handleRoleChange}
                        onReject={handleReject} // nuevo callback
                        onValidate={handleValidate}
                        isInscription={true}    // señalamos que es modo "inscription"
                    />
                ))}
            </div>
        </div>
    );
};

export default Inscriptions;

import ProfileView from "./ProfileView";
import { useState, useEffect } from "react";
import axios from "axios";

const Inscriptions = ({ currentUser, refetchPendingCount  }) => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        console.log("[INSCRIPTIONS] Chargement des utilisateurs non validés...");

        axios
            .get("http://localhost:3000/api/users?validated=false", { withCredentials: true })
            .then(res => {
                setUsers(res.data);
                console.log(`[INSCRIPTIONS] ${res.data.length} utilisateur(s) non validé(s) chargé(s).`);
            })
            .catch(err => console.error("[INSCRIPTIONS] Erreur lors du chargement des inscriptions:", err));
    }, []);

    const handleRoleChange = (userId, newRole) => {
        setUsers(prevUsers =>
            prevUsers.filter(u => u._id !== userId) // desaparece de la lista tras valider
        );
    };

    const handleValidate = async (userId) => {
        try {

            console.log(`[INSCRIPTIONS] Tentative de validation de l'utilisateur : ${userId}`);

            await axios.put(`http://localhost:3000/api/users/${userId}/validate`, {}, {
                withCredentials: true
            });

            console.log(`[INSCRIPTIONS] Utilisateur validé avec succès : ${userId}`);

            setUsers(prevUsers => prevUsers.filter(u => u._id !== userId));
            refetchPendingCount?.();
        } catch (err) {
            console.error(`[INSCRIPTIONS] Erreur lors de la validation de ${userId} :`, err.response?.data || err.message);
        }
    };

    const handleReject = async (userId) => {

        try {
            console.log(`[INSCRIPTIONS] Tentative de rejet de l'utilisateur : ${userId}`);

            await axios.delete(`http://localhost:3000/api/users/${userId}`, {
                withCredentials: true
            });

            console.log(`[INSCRIPTIONS] Utilisateur rejeté avec succès : ${userId}`);
            setUsers(prevUsers => prevUsers.filter(u => u._id !== userId));
            refetchPendingCount?.();
        } catch (err) {
            console.error(`[INSCRIPTIONS] Erreur lors du rejet de ${userId} :`, err.response?.data || err.message);
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

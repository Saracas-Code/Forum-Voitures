import "../styles/ProfileList.css";
import axios from "axios";

const ProfileView = ({ user, currentUser, onRoleChange, onReject, onValidate, isInscription = false }) => {

    const canToggleAdmin = currentUser?.role === "admin" && currentUser?.login !== user?.login;

    // Changer le rôle d'un utilisateur
    const handleToggleAdmin = async () => {
        const newRole = user.role === "admin" ? "member" : "admin";

        if (currentUser.role != "admin") {
            console.error(`[PROFILE VIEW] Erreur lors du changement de rôle : ${currentUser.login} n'est pas un admin`)
        }

        console.log(`[PROFILE VIEW] Tentative de changement de rôle pour ${user.login} → ${newRole}`);

        try {
            await axios.put(`http://localhost:3000/api/users/${user._id}/role`, {
                role: newRole
            }, { withCredentials: true });

            console.log(`[PROFILE VIEW] Rôle mis à jour avec succès : ${user.login} est maintenant ${newRole}`);
            onRoleChange(user._id, newRole);
        } catch (err) {
            console.error(`[PROFILE VIEW] Erreur lors du changement de rôle pour ${user.login} :`, err.response?.data || err.message);
        }
    };


    // MODE INSCRIPTION :
    // Valider user (asignar rol "member")
    const handleValidate = async () => {

        if (currentUser.role != "admin") {
            console.error(`[PROFILE VIEW] Erreur lors de la validation : ${currentUser.login} n'est pas un admin`)
        }

        console.log(`[PROFILE VIEW] Validation de l'utilisateur : ${user.login}`);

        try {
            await onValidate(user._id);
            alert(`${user.login} a été accepté avec succès dans le forum !`);
        } catch (err) {
            console.error(`[PROFILE VIEW] Erreur lors de la validation de ${user.login} :`, err.response?.data || err.message);
            alert(`Erreur lors de l'acceptation de ${user.login}`);
        }
    };

    // Rejecter user
    const handleReject = () => {

        if (currentUser.role != "admin") {
            console.error(`[PROFILE VIEW] Erreur lors de la validation : ${currentUser.login} n'est pas un admin`)
        }

        if (window.confirm(`Êtes-vous sûr de vouloir supprimer ${user.login} ?`)) {
            console.log(`[PROFILE VIEW] Rejet de l'utilisateur : ${user.login}`);
            onReject(user._id);
        }
    };

    return (
        <div className="profile-card">
            <div className="avatar">👤</div>
            <div className="info">
                <p><strong>{user.prenom} {user.nom}</strong></p>
                <p>{user.login}</p>
                <p className="email">{user.email}</p>
                <p className="role">{user.role}</p>
                <br />
                <p className="description"><strong>Description :</strong> {user.description}</p>

                {isInscription ? (
                    <div className="admin-actions">
                        <button className="reject-btn admin-btn" onClick={handleReject}>
                            Rejeter user
                        </button>
                        <button className="toggle-admin-btn admin-btn" onClick={handleValidate}>
                            Valider user
                        </button>
                    </div>
                ) : (
                    canToggleAdmin && (
                        <button className="toggle-admin-btn admin-btn" onClick={handleToggleAdmin}>
                            {user.role === "admin" ? "Retirer rôle admin" : "Faire admin"}
                        </button>
                    )
                )}
            </div>
        </div>
    );
};

export default ProfileView;

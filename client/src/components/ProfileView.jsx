import "../styles/ProfileList.css";
import axios from "axios";

const ProfileView = ({ user, currentUser, onRoleChange, onReject, onValidate, isInscription = false }) => {

    const canToggleAdmin = currentUser?.role === "admin" && currentUser?.login !== user?.login;

    // Si no es inscripción, puede cambiar entre admin/member
    const handleToggleAdmin = async () => {
        const newRole = user.role === "admin" ? "member" : "admin";

        try {
            console.log(user._id);
            await axios.put(`http://localhost:3000/api/users/${user._id}/role`, {
                role: newRole
            }, { withCredentials: true });

            onRoleChange(user._id, newRole);
        } catch (err) {
            console.error("Erreur lors du changement de rôle:", err);
        }
    };

    // Si estamos en el modo inscripción :
    // Validar usuario (asignar rol "member")
    const handleValidate = async () => {
        try {
            await onValidate(user._id);
            alert(`${user.login} a été accepté avec succès dans le forum !`);
        } catch (err) {
            console.error("Erreur lors de la validation :", err);
            alert(`Erreur lors de l'acceptation de ${user.login}`);
        }
    };

    // Rechazar usuario
    const handleReject = () => {
        if (window.confirm(`Êtes-vous sûr de vouloir supprimer ${user.login} ?`)) {
            console.log(user._id);
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
                    <>
                        <button className="reject-btn" onClick={handleReject}>
                            Rejeter utilisateur
                        </button>
                        <button className="toggle-admin-btn" onClick={handleValidate}>
                            Valider utilisateur
                        </button>
                    </>
                ) : (
                    canToggleAdmin && (
                        <button className="toggle-admin-btn" onClick={handleToggleAdmin}>
                            {user.role === "admin" ? "Retirer rôle admin" : "Faire admin"}
                        </button>
                    )
                )}
            </div>
        </div>
    );
};

export default ProfileView;

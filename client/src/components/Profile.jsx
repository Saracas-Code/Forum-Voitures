import { useState } from "react";
import axios from "axios";
import { FaArrowLeft } from "react-icons/fa";
import "../styles/Profile.css";

const Profile = ({ currentUser, setShowProfile }) => {

    const [editMode, setEditMode] = useState(false);
    const [userData, setUserData] = useState({
        prenom: currentUser?.prenom || "",
        nom: currentUser?.nom || "",
        role: currentUser?.role || "",
        description: currentUser?.description || "",
        login: currentUser?.login,
        email: currentUser?.email
    });

    const handleSave = async () => {
        try {
            await axios.put(`http://localhost:3000/api/users/${userData.login}`, {
                prenom: userData.prenom,
                nom: userData.nom,
                description: userData.description
            }, { withCredentials: true });

            setEditMode(false);
        } catch (err) {
            console.error("Erreur lors de la mise à jour du profil :", err);
        }
    };

    const handleCancel = () => {
        setUserData({
            ...userData,
            prenom: currentUser.prenom,
            nom: currentUser.nom,
            description: currentUser.description
        });
        setEditMode(false);
    };

    const toggleAdmin = async () => {
        try {
            const newRole = userData.role === "admin" ? "member" : "admin";
            await axios.put(`http://localhost:3000/api/users/${userData.login}/role`, { role: newRole }, { withCredentials: true });
            setUserData(prev => ({ ...prev, role: newRole }));
        } catch (err) {
            console.error("Erreur lors du changement de rôle :", err);
        }
    };

    return (
        <div className="profile-container">
            <div className="user-info">
                <div className="avatar-section">
                    <div className="avatar-placeholder">👤</div>
                    <div className="credentials">
                        <p><strong>Login :</strong> {userData.login}</p>
                        <p><strong>Email :</strong> {userData.email}</p>
                    </div>
                </div>

                <div className="field">
                    <label>Prénom</label>
                    {editMode ? (
                        <input value={userData.prenom} onChange={(e) => setUserData({ ...userData, prenom: e.target.value })} />
                    ) : (
                        <p>{userData.prenom}</p>
                    )}
                </div>

                <div className="field">
                    <label>Nom</label>
                    {editMode ? (
                        <input value={userData.nom} onChange={(e) => setUserData({ ...userData, nom: e.target.value })} />
                    ) : (
                        <p>{userData.nom}</p>
                    )}
                </div>

                <div className="field">
                    <label>Rôle</label>
                    <p>{userData.role}</p>
                </div>

                <div className="field">
                    <label>Description</label>
                    {editMode ? (
                        <textarea value={userData.description} onChange={(e) => setUserData({ ...userData, description: e.target.value })} />
                    ) : (
                        <p>{userData.description}</p>
                    )}
                </div>

                {/* Solo tú puedes editar tu perfil */}
                {(
                    <div className="button-group">
                        {!editMode && <button onClick={() => setEditMode(true)}>Éditer</button>}
                        {editMode && (
                            <>
                                <button className="save-btn" onClick={handleSave}>Garder</button>
                                <button className="cancel-btn" onClick={handleCancel}>Annuler</button>
                            </>
                        )}
                    </div>
                )}
            </div>

            <div className="user-messages">
                <h3>Liste de messages de {userData.prenom} {userData.nom}</h3>
                <div className="message-placeholder">Message 1</div>
                <div className="message-placeholder">Message 2</div>
                <div className="message-placeholder">Message 3</div>
            </div>
        </div>
    );
};

export default Profile;

import { useState, useEffect } from "react";
import axios from "axios";
import { FaArrowLeft } from "react-icons/fa";
import "../styles/Profile.css";
import UserInfo from "./UserInfo";
import UserActivity from "./UserActivity";

const Profile = ({ setShowProfile }) => {

    const [editMode, setEditMode] = useState(false);
    const [originalData, setOriginalData] = useState(null);
    const [userData, setUserData] = useState(null);

    const [userMessages, setUserMessages] = useState([]);
    const [userReplies, setUserReplies] = useState([]);

    // Charger les informations du profil des utilisateurs
    useEffect(() => {
        const fetchProfileData = async () => {
            console.log("[PROFILE] Chargement des données du profil...");

            try {
                const userRes = await axios.get("http://localhost:3000/api/users/me", {
                    withCredentials: true
                });

                console.log("[PROFILE] Données utilisateur :", userRes.data);
                setUserData(userRes.data);

                const msgRes = await axios.get(
                    `http://localhost:3000/api/messages?user=${userRes.data._id}&all=true`,
                    { withCredentials: true }
                );
                console.log(`[PROFILE] ${msgRes.data.length} message(s) récupéré(s)`);

                const replyRes = await axios.get(
                    `http://localhost:3000/api/replies?userId=${userRes.data._id}`,
                    { withCredentials: true }
                );
                console.log(`[PROFILE] ${replyRes.data.length} réponse(s) récupérée(s)`);

                setUserMessages(msgRes.data);
                setUserReplies(replyRes.data);

            } catch (err) {
                console.error("[PROFILE] Erreur chargement des données :", err.message);
            }
        };

        fetchProfileData();
    }, []);


    const handleSave = async () => {
        console.log("[PROFILE] Enregistrement des modifications du profil...");

        try {
            await axios.put(`http://localhost:3000/api/users/${userData._id}`, {
                prenom: userData.prenom,
                nom: userData.nom,
                description: userData.description
            }, { withCredentials: true });

            console.log("[PROFILE] Modifications enregistrées avec succès");
            setEditMode(false);
            setOriginalData(null);
        } catch (err) {
            console.error("[PROFILE] Erreur lors de l'enregistrement :", err.message);
        }
    };

    const handleCancel = () => {
        console.log("[PROFILE] Annulation des modifications");

        if (originalData) {
            setUserData(originalData);
            setOriginalData(null);
        }
        setEditMode(false);
    };

    const handleDeleteMessage = async (id) => {
        if (!window.confirm("Supprimer ce message ?")) return;

        console.log(`[PROFILE] Suppression du message : ${id}`);

        try {
            await axios.delete(`http://localhost:3000/api/messages/${id}`, { withCredentials: true });
            setUserMessages((prev) => prev.filter((msg) => msg._id !== id));

            console.log("[PROFILE] Message supprimé. Rafraîchissement des réponses...");
            const replyRes = await axios.get(`http://localhost:3000/api/replies?userId=${userData._id}`, {
                withCredentials: true,
            });
            setUserReplies(replyRes.data);
        } catch (err) {
            console.error("[PROFILE] Erreur lors de la suppression du message :", err.message);
        }
    };

    const handleDeleteReply = async (messageId, replyId) => {
        if (!window.confirm("Supprimer cette réponse ?")) return;

        console.log(`[PROFILE] Suppression de la réponse ${replyId} du message ${messageId}`);

        try {
            await axios.delete(`http://localhost:3000/api/messages/${messageId}/reply/${replyId}`, {
                withCredentials: true,
            });
            setUserReplies((prev) => prev.filter((r) => r._id !== replyId));
            console.log("[PROFILE] Réponse supprimée avec succès");
        } catch (err) {
            console.error("[PROFILE] Erreur lors de la suppression de la réponse :", err.message);
        }
    };

    
    return userData && (
        <div className="profile-container">
            <UserInfo
                userData={userData}
                editMode={editMode}
                setEditMode={setEditMode}
                setOriginalData={setOriginalData}
                setUserData={setUserData}
                handleSave={handleSave}
                handleCancel={handleCancel}
            />
            <UserActivity
                prenom={userData.prenom}
                userMessages={userMessages}
                userReplies={userReplies}
                handleDeleteMessage={handleDeleteMessage}
                handleDeleteReply={handleDeleteReply}
            />
        </div>
    );
};

export default Profile;

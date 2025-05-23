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

    useEffect(() => {
        const fetchProfileData = async () => {
            try {
                const userRes = await axios.get("http://localhost:3000/api/users/me", {
                    withCredentials: true
                });

                setUserData(userRes.data);
                console.log(userRes.data);

                const msgRes = await axios.get(
                    `http://localhost:3000/api/messages?user=${userRes.data._id}&all=true`,
                    { withCredentials: true }
                );

                const replyRes = await axios.get(
                    `http://localhost:3000/api/replies?userId=${userRes.data._id}`,
                    { withCredentials: true }
                );

                setUserMessages(msgRes.data);
                setUserReplies(replyRes.data);
            } catch (err) {
                console.error("Erreur chargement des données de profil :", err);
            }
        };

        fetchProfileData();
    }, []);


    const handleSave = async () => {
        try {
            await axios.put(`http://localhost:3000/api/users/${userData._id}`, {
                prenom: userData.prenom,
                nom: userData.nom,
                description: userData.description
            }, { withCredentials: true });

            setEditMode(false);
            setOriginalData(null);
        } catch (err) {
            console.error("Erreur lors de la mise à jour du profil :", err);
        }
    };

    const handleCancel = () => {
        if (originalData) {
            setUserData(originalData);
            setOriginalData(null); // Limpia la snapshot después de usarla
        }
        setEditMode(false);
    };

    const handleDeleteMessage = async (id) => {
        if (!window.confirm("Supprimer ce message ?")) return;
        try {
            await axios.delete(`http://localhost:3000/api/messages/${id}`, { withCredentials: true });

            // Actualiza los mensajes localmente
            setUserMessages((prev) => prev.filter((msg) => msg._id !== id));

            // Vuelve a recuperar las replies desde el backend
            const replyRes = await axios.get(`http://localhost:3000/api/replies?userId=${userData._id}`, {
                withCredentials: true,
            });
            setUserReplies(replyRes.data);

        } catch (err) {
            console.error("Erreur lors de la suppression du message ou du rafraîchissement des réponses :", err);
        }
    };

    const handleDeleteReply = async (messageId, replyId) => {
        if (!window.confirm("Supprimer cette réponse ?")) return;
        try {
            console.log(messageId, replyId)
            await axios.delete(`http://localhost:3000/api/messages/${messageId}/reply/${replyId}`, {
            withCredentials: true,
            });
            setUserReplies((prev) => prev.filter((r) => r._id !== replyId));
        } catch (err) {
            console.error("Erreur lors de la suppression de la réponse :", err);
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

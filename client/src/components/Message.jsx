import { useState } from "react";
import axios from "axios";
import "../styles/Message.css";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import ReplyList from "./ReplyList";

const Message = ({ message, onDelete }) => {
    const [showReplies, setShowReplies] = useState(false);
    const [showReplyForm, setShowReplyForm] = useState(false);
    const [replyText, setReplyText] = useState("");
    const [localReplies, setLocalReplies] = useState(message.replyList || []);

    if (!message) return null;

    const { _id, title, content, date, user, userLogin } = message;

    const handleSendReply = async () => {
        if (!replyText.trim()) {
            console.warn("[REPLY] Tentative d'envoi vide ignorée.");
            return;
        }

        console.log("[REPLY] Envoi de la réponse au message :", _id);
        console.log("[REPLY] Contenu :", replyText);

        try {
            const res = await axios.post(`http://localhost:3000/api/messages/${_id}/reply`, {
                content: replyText
            }, { withCredentials: true });

            console.log("[REPLY] Réponse ajoutée avec succès :", res.data);

            setLocalReplies([res.data, ...localReplies]);
            setReplyText("");
            setShowReplyForm(false);
        } catch (err) {
            console.error("[REPLY] Erreur lors de l'envoi de la réponse :", err.response?.data || err.message);
            console.error("Erreur lors de la réponse :", err);
        }
    };

    return (
        <div className="message">
        <p className="message-title"><strong>{title || "(Sans titre)"}</strong></p>
        <p className="message-content">{content || "(Pas de contenu)"}</p>
        <p className="message-date">
            Publié le : {date ? new Date(date).toLocaleDateString() : "date inconnue"}
        </p>
        <p className="message-owner">Propriétaire : {userLogin || "anonyme"}</p>

        {onDelete && (
            <button className="delete-btn" onClick={() => onDelete(_id)}>🗑 Supprimer</button>
        )}

        {!onDelete && (
            <>
                <button className="response-btn" onClick={() => setShowReplies(!showReplies)}>
                    {showReplies ? <FiChevronUp /> : <FiChevronDown />}
                    <span style={{ marginLeft: "8px" }}>
                        {showReplies ? "Cacher replies" : "Montrer replies"}
                    </span>
                </button>

                {showReplies && (
                    <ReplyList messageId={_id} initialReplies={localReplies} />
                )}
            </>
        )}

        </div>
    );
};

export default Message;

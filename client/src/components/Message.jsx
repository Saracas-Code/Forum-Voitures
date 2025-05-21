import { useState } from "react";
import axios from "axios";
import "../styles/Message.css";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";

const Message = ({ message }) => {
    const [showReplies, setShowReplies] = useState(false);
    const [showReplyForm, setShowReplyForm] = useState(false);
    const [replyText, setReplyText] = useState("");
    const [localReplies, setLocalReplies] = useState(message.replyList || []);

    if (!message) return null;

    const { _id, title, content, date, user } = message;

    const handleSendReply = async () => {
        if (!replyText.trim()) return;
        try {
            const res = await axios.post(`http://localhost:3000/api/messages/${_id}/reply`, {
                content: replyText
            }, { withCredentials: true });

            setLocalReplies([res.data, ...localReplies]);
            setReplyText("");
            setShowReplyForm(false);
        } catch (err) {
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
            <p className="message-owner">Propriétaire : {user || "anonyme"}</p>

            <button className="response-btn" onClick={() => setShowReplies(!showReplies)}>
                {showReplies ? <FiChevronUp /> : <FiChevronDown />}
                <span style={{ marginLeft: "8px" }}>
                    {showReplies ? "Cacher replies" : "Montrer replies"}
                </span>
            </button>

            {showReplies && (
                <div className="replies">
                    {localReplies.length > 0 ? (
                        localReplies.map((reply, index) => (
                            <div key={index} className="reply">
                                <p>{reply.content || "(Pas de contenu)"}</p>
                                <p className="reply-info">
                                    Par {reply.user || "inconnu"} le {reply.date ? new Date(reply.date).toLocaleDateString() : "date inconnue"}
                                </p>
                            </div>
                        ))
                    ) : (
                        <p className="no-replies">Aucune réponse pour ce message.</p>
                    )}

                    {!showReplyForm && (
                        <button className="reply-toggle-btn" onClick={() => setShowReplyForm(true)}>
                            Répondre
                        </button>
                    )}

                    {showReplyForm && (
                        <div className="reply-form">
                            <input
                            type="text"
                            value={replyText}
                            onChange={(e) => setReplyText(e.target.value)}
                            placeholder="Écrivez votre réponse ici..."
                            />
                            <div className="reply-form-buttons">
                            <button className="send-btn" onClick={handleSendReply}>Envoyer</button>
                            <button className="cancel-btn" onClick={() => setShowReplyForm(false)}>Annuler</button>
                            </div>
                        </div>
                    )}


                </div>
            )}
        </div>
    );
};

export default Message;

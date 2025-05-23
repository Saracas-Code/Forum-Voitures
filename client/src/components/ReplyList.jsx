import { useState } from "react";
import axios from "axios";
import Reply from "./Reply";
import "../styles/ReplyList.css";

const ReplyList = ({ messageId, initialReplies }) => {
    const [replies, setReplies] = useState(initialReplies || []);
    const [replyText, setReplyText] = useState("");
    const [showReplyForm, setShowReplyForm] = useState(false);

    const handleSendReply = async () => {

        if (!replyText.trim()) {
            console.warn("[REPLY] Réponse vide - envoi annulé.");
            return;
        }

        console.log(`[REPLY] Envoi d'une réponse au message ${messageId}`);
        console.log("[REPLY] Contenu :", replyText);

        try {
            const res = await axios.post(`http://localhost:3000/api/messages/${messageId}/reply`, {
                content: replyText
            }, { withCredentials: true });

            console.log("[REPLY] Réponse enregistrée avec succès :", res.data);

            setReplies([res.data, ...replies]);
            setReplyText("");
            setShowReplyForm(false);
        } catch (err) {
            console.error("[REPLY] Erreur lors de l'envoi de la réponse :", err.response?.data || err.message);
        }
    };


    return (
        <div className="replies">
            {replies.length > 0 ? (
                replies.map((reply, index) => (
                    <Reply key={index} reply={reply} />
                ))
            ) : (
                <p className="no-replies">Aucune réponse pour ce message.</p>
            )}

            {!showReplyForm ? (
                <button className="reply-toggle-btn" onClick={() => setShowReplyForm(true)}>
                    Répondre
                </button>
            ) : (
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
    );
};

export default ReplyList;

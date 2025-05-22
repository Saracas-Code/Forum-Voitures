import { useState } from "react";
import axios from "axios";
import Reply from "./Reply";
import "../styles/ReplyList.css";

const ReplyList = ({ messageId, initialReplies }) => {
    const [replies, setReplies] = useState(initialReplies || []);
    const [replyText, setReplyText] = useState("");
    const [showReplyForm, setShowReplyForm] = useState(false);

    const handleSendReply = async () => {
        if (!replyText.trim()) return;

        try {
            const res = await axios.post(`http://localhost:3000/api/messages/${messageId}/reply`, {
                content: replyText
            }, { withCredentials: true });

            setReplies([res.data, ...replies]);
            setReplyText("");
            setShowReplyForm(false);
        } catch (err) {
            console.error("Erreur lors de la réponse :", err);
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

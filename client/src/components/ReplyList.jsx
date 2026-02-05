import { useState } from "react";
import axios from "axios";
import Reply from "./Reply";
import "../styles/ReplyList.css";
import Button from "./ui/Button";
import TextInput from "./ui/TextInput";

const ReplyList = ({ messageId, initialReplies }) => {
    const [replies, setReplies] = useState(initialReplies || []);
    const [replyText, setReplyText] = useState("");
    const [showReplyForm, setShowReplyForm] = useState(false);

    const handleSendReply = async () => {

        if (!replyText.trim()) {
            console.warn("[REPLY] Reponse vide - envoi annule.");
            return;
        }

        console.log(`[REPLY] Envoi d'une reponse au message ${messageId}`);
        console.log("[REPLY] Contenu :", replyText);

        try {
            const res = await axios.post(`http://localhost:3000/api/messages/${messageId}/reply`, {
                content: replyText
            }, { withCredentials: true });

            console.log("[REPLY] Reponse enregistree avec succes :", res.data);

            setReplies([res.data, ...replies]);
            setReplyText("");
            setShowReplyForm(false);
        } catch (err) {
            console.error("[REPLY] Erreur lors de l'envoi de la reponse :", err.response?.data || err.message);
        }
    };


    return (
        <div className="replies">
            {replies.length > 0 ? (
                replies.map((reply, index) => (
                    <Reply key={index} reply={reply} />
                ))
            ) : (
                <p className="no-replies">Aucune reponse pour ce message.</p>
            )}

            {!showReplyForm ? (
                <Button variant="secondary" size="sm" onClick={() => setShowReplyForm(true)}>
                    Repondre
                </Button>
            ) : (
                <div className="reply-form">
                    <TextInput
                        id={`reply_${messageId}`}
                        label="Votre reponse"
                        value={replyText}
                        onChange={(e) => setReplyText(e.target.value)}
                        placeholder="Ecrivez votre reponse ici..."
                    />
                    <div className="reply-form-buttons">
                        <Button size="sm" onClick={handleSendReply}>Envoyer</Button>
                        <Button variant="secondary" size="sm" onClick={() => setShowReplyForm(false)}>
                            Annuler
                        </Button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ReplyList;

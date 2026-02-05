import { useState } from "react";
import axios from "axios";
import "../styles/Message.css";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import ReplyList from "./ReplyList";
import Button from "./ui/Button";
import Card from "./ui/Card";

const Message = ({ message, onDelete }) => {
    const [showReplies, setShowReplies] = useState(false);
    const [showReplyForm, setShowReplyForm] = useState(false);
    const [replyText, setReplyText] = useState("");
    const [localReplies, setLocalReplies] = useState(message.replyList || []);

    if (!message) return null;

    const { _id, title, content, date, user, userLogin } = message;

    const handleSendReply = async () => {
        if (!replyText.trim()) {
            console.warn("[REPLY] Tentative d'envoi vide ignoree.");
            return;
        }

        console.log("[REPLY] Envoi de la reponse au message :", _id);
        console.log("[REPLY] Contenu :", replyText);

        try {
            const res = await axios.post(`http://localhost:3000/api/messages/${_id}/reply`, {
                content: replyText
            }, { withCredentials: true });

            console.log("[REPLY] Reponse ajoutee avec succes :", res.data);

            setLocalReplies([res.data, ...localReplies]);
            setReplyText("");
            setShowReplyForm(false);
        } catch (err) {
            console.error("[REPLY] Erreur lors de l'envoi de la reponse :", err.response?.data || err.message);
            console.error("Erreur lors de la reponse :", err);
        }
    };

    return (
        <Card className="message-card" as="article">
            <p className="message-title"><strong>{title || "(Sans titre)"}</strong></p>
            <p className="message-content">{content || "(Pas de contenu)"}</p>
            <p className="message-meta">
                Publie le : {date ? new Date(date).toLocaleDateString() : "date inconnue"}
            </p>
            <p className="message-meta">Proprietaire : {userLogin || "anonyme"}</p>

            {onDelete && (
                <Button variant="danger" size="sm" onClick={() => onDelete(_id)}>
                    Supprimer
                </Button>
            )}

            {!onDelete && (
                <>
                    <Button
                        variant="secondary"
                        size="sm"
                        className="reply-toggle"
                        onClick={() => setShowReplies(!showReplies)}
                    >
                        {showReplies ? <FiChevronUp /> : <FiChevronDown />}
                        <span className="reply-toggle-text">
                            {showReplies ? "Cacher replies" : "Montrer replies"}
                        </span>
                    </Button>

                    {showReplies && (
                        <ReplyList messageId={_id} initialReplies={localReplies} />
                    )}
                </>
            )}

        </Card>
    );
};

export default Message;

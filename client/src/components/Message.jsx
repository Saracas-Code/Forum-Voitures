import { useState } from "react";
import "../styles/Message.css";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";

const Message = ({ message }) => {
    const [showReplies, setShowReplies] = useState(false);

    // Protección básica en caso de props incompletas
    if (!message) return null;

    const { title, content, date, user, replyList = [] } = message;

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
                    {replyList.length > 0 ? (
                        replyList.map((reply, index) => (
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
                </div>
            )}
        </div>
    );
};

export default Message;

import "../styles/Reply.css";

const Reply = ({ reply, onDelete }) => {
    if (!reply) return null;

    return (
        <div className="reply">
        <p>{reply.content || "(Pas de contenu)"}</p>
        <p className="reply-info">

            Par {reply.userLogin || "inconnu"} le {reply.date ? new Date(reply.date).toLocaleDateString() : "date inconnue"}
        </p>

        {onDelete && (
            <button className="delete-btn" onClick={() => onDelete(reply.messageId, reply._id)}>🗑 Supprimer</button>
        )}
        </div>
    );
};

export default Reply;

import "../styles/Reply.css";

const Reply = ({ reply }) => {
    if (!reply) return null;

    return (
        <div className="reply">
            <p>{reply.content || "(Pas de contenu)"}</p>
            <p className="reply-info">
                Par {reply.user || "inconnu"} le {reply.date ? new Date(reply.date).toLocaleDateString() : "date inconnue"}
            </p>
        </div>
    );
};

export default Reply;

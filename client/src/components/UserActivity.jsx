import Message from "./Message";
import Reply from "./Reply";

const UserActivity = ({ prenom, userMessages, userReplies, handleDeleteMessage, handleDeleteReply }) => (
    <div className="user-messages">
        <h3>Messages de {prenom}</h3>
        {userMessages.length > 0 ? (
        userMessages.map((msg) => (
            <Message key={msg._id} message={msg} onDelete={handleDeleteMessage} />
        ))
        ) : (
        <p className="no-content">Aucun message</p>
        )}

        <h3>Réponses de {prenom}</h3>
        {userReplies.length > 0 ? (
        userReplies.map((rep) => (
            <Reply key={rep._id} reply={rep} onDelete={handleDeleteReply} />
        ))
        ) : (
        <p className="no-content">Aucune reply</p>
        )}
    </div>
);

export default UserActivity;

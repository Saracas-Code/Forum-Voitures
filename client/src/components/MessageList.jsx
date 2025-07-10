// components/MessageList.jsx
import Message from "./Message";
import "../styles/MessageList.css";

const MessageList = ({ messages }) => {

    return (
        <section id="liste_msg">
            <h2 className="message-list-title">Derniers messages</h2>

            {messages.length === 0 ? (
                <p className="no-content">Aucun message à afficher.</p>
            ) : (
                messages.map((msg) => (
                    <Message key={msg._id} message={msg} />
                ))
            )}
        </section>
    );
};

export default MessageList;

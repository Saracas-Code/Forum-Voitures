// components/MessageList.jsx
import Message from "./Message";
import "../styles/MessageList.css";

const MessageList = ({ messages }) => {
    if (messages.length === 0) {
        return <p className="no-content">Aucun message à afficher.</p>;
    }

    return (
        <section id="liste_msg">
        {messages.map((msg) => (
            <Message key={msg._id} message={msg} />
        ))}
        </section>
    );
};

export default MessageList;

// components/MessageList.jsx
import Message from "./Message";
import "../styles/MessageList.css";
import Card from "./ui/Card";

const MessageList = ({ messages }) => {

    return (
        <Card as="section" className="message-list">
            <h2 className="section-title">Derniers messages</h2>

            {messages.length === 0 ? (
                <p className="no-content">Aucun message a afficher.</p>
            ) : (
                messages.map((msg) => (
                    <Message key={msg._id} message={msg} />
                ))
            )}
        </Card>
    );
};

export default MessageList;

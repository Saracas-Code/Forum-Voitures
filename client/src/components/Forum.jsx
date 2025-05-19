import { useEffect, useState } from "react";
import axios from "axios";
import MessageList from "./MessageList";
import AjoutMessage from "./AjoutMessage";

function Forum({ currentUser, modeForum, setSelectedUser }) {
  const [messages, setMessages] = useState([]);

  const fetchMessages = async () => {
    try {
      const res = await axios.get(`http://localhost:3000/api/forum?private=${modeForum}`, {
        withCredentials: true,
      });
      setMessages(res.data);
    } catch (err) {
      console.error("Erreur lors du chargement des messages :", err);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, [modeForum]);

  return (
    <div className="container">
      <h2>{modeForum ? "Forum Privé" : "Forum Public"}</h2>
      <AjoutMessage modeForum={modeForum} onMessageSent={fetchMessages} />
      <MessageList
        messages={messages}
        currentUser={currentUser}
        setSelectedUser={setSelectedUser}
      />
    </div>
  );
}

export default Forum;

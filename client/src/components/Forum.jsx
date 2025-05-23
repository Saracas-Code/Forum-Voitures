// Forum.jsx
import { useState, useEffect } from "react";
import axios from "axios";
import "../styles/Forum.css";
import MessageList from "./MessageList";
import Message from "./Message";

const Forum = ({ currentUser, isPrivateView, filters  }) => {

  const [messages, setMessages] = useState([]);
  const [newContent, setNewContent] = useState("");
  const [newTitle, setNewTitle] = useState("");

  // Cargar mensajes desde la BD cada vez que cambia el modo
  useEffect(() => {
    const params = { private: isPrivateView }; // importante: siempre incluir private

    if (filters.author) params.userLogin = filters.author;
    if (filters.keyword) params.keyword = filters.keyword;
    if (filters.startDate) params.startDate = filters.startDate;
    if (filters.endDate) params.endDate = filters.endDate;

    axios.get("http://localhost:3000/api/messages", {
      params,
      withCredentials: true,
    })
      .then((res) => setMessages(res.data))
      .catch(console.error);
  }, [filters, isPrivateView]); // dispara cuando cambia el filtro o el modo


  // Añadir nuevo mensaje
  const handleAddMessage = () => {

    if (!newContent.trim() || !newTitle.trim()) return;

    axios.post("http://localhost:3000/api/messages", {
      title: newTitle,
      content: newContent,
      isPrivate: isPrivateView // ← muy importante
    }, { withCredentials: true })
      .then(res => {
        setMessages([res.data, ...messages]); // Aparece arriba
        setNewContent("");
        setNewTitle("");
      })
      .catch(console.error);
  };

  return (
    <div id="css_container">
      <section id="nouveau_msg">
        <div id="new_comment">
          <label id="title-msg">Titre</label>
          <input
            type="text"
            id="title_input"
            placeholder="Titre..."
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
          />
          <label id="contenu-msg">Contenu</label>
          <input
            type="text"
            id="message_input"
            placeholder="Écrivez votre message ici..."
            value={newContent}
            onChange={(e) => setNewContent(e.target.value)}
          />
          <button id="add_message" onClick={handleAddMessage}>Ajouter</button>
        </div>
      </section>

      <MessageList messages={messages} />
    </div>
  );
};

export default Forum;

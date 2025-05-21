// Forum.jsx
import { useState, useEffect } from "react";
import axios from "axios";
import "../styles/Forum.css";
import Message from "./Message";

const Forum = ({ currentUser }) => {
  const [messages, setMessages] = useState([]);
  const [newContent, setNewContent] = useState("");
  const [newTitle, setNewTitle] = useState("");

  // Cargar mensajes desde la BD
  useEffect(() => {
    axios.get("http://localhost:3000/api/forum", {
      withCredentials: true
    })
    .then((res) => setMessages(res.data))
    .catch(console.error);
  }, []);


  // Añadir nuevo mensaje
  const handleAddMessage = () => {
    if (!newContent.trim() || !newTitle.trim()) return;
    axios.post("http://localhost:3000/api/messages", {
      title: newTitle,
      content: newContent,
      user: currentUser.login
    }, { withCredentials: true })
      .then(res => {
        setMessages([res.data, ...messages]);
        setNewContent("");
        setNewTitle("");
      })
      .catch(console.error);
  };

  return (
    <div id="css_container">
      <section id="nouveau_msg">
        <div id="new_comment">
          <label id="title-msg">Title</label>
          <input
            id="title_input"
            type="text"
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

      <section id="liste_msg">
        {messages.map(msg => {
          return <Message key={msg._id} message={msg} />;
        })}
      </section>
    </div>
  );
};

export default Forum;

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

    console.log("[MESSAGES] Chargement des messages avec filtres :", params);

    axios.get("http://localhost:3000/api/messages", {
      params,
      withCredentials: true,
    })
      .then((res) => {
        setMessages(res.data);
        console.log(`[MESSAGES] ${res.data.length} message(s) reçu(s) du serveur.`);
      })
      .catch((error) => {
        console.error("[MESSAGES] Erreur lors du chargement :", error.message);
      });
  }, [filters, isPrivateView]); // dispara cuando cambia el filtro o el modo


  // Añadir nuevo mensaje
  const handleAddMessage = () => {

    if (!newContent.trim() || !newTitle.trim()) return;

    console.log("[MESSAGES] Tentative d'ajout d'un message :", { title: newTitle, isPrivate: isPrivateView });

    axios.post("http://localhost:3000/api/messages", {
      title: newTitle,
      content: newContent,
      isPrivate: isPrivateView // ← muy importante
    }, { withCredentials: true })
    .then(res => {
      console.log("[MESSAGES] Message ajouté avec succès :", res.data);
      setMessages([res.data, ...messages]);
      setNewContent("");
      setNewTitle("");
    })
    .catch((error) => {
      console.error("[MESSAGES] Erreur lors de l'envoi du message :", error.response?.data || error.message);
    });
  };

  return (
    <div id="css_container">
      <section id="nouveau_msg">
        <label htmlFor="title_input">Titre</label>
        <input
          type="text"
          id="title_input"
          placeholder="Titre..."
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
        />

        <label htmlFor="message_input">Contenu</label>
        <textarea
          id="message_input"
          placeholder="Écrivez votre message ici..."
          value={newContent}
          onChange={(e) => setNewContent(e.target.value)}
          rows={5}
        />

        <button id="add_message" onClick={handleAddMessage}>Ajouter</button>
      </section>


      <MessageList messages={messages} />
    </div>
  );
};

export default Forum;

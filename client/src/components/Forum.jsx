// Forum.jsx
import { useState, useEffect } from "react";
import axios from "axios";
import "../styles/Forum.css";
import MessageList from "./MessageList";
import Button from "./ui/Button";
import Card from "./ui/Card";
import TextInput from "./ui/TextInput";

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
      <Card className="compose-card" as="section">
        <TextInput
          id="title_input"
          label="Titre"
          multiline
          placeholder="Titre..."
          value={newTitle}
          maxLength={100}
          onChange={(e) => setNewTitle(e.target.value)}
          onInput={(e) => {
            e.target.style.height = "auto";
            e.target.style.height = `${e.target.scrollHeight}px`;
          }}
        />
        <small className="ui-hint field-hint">{newTitle.length}/100</small>

        <TextInput
          id="message_input"
          label="Contenu"
          multiline
          placeholder="Écrivez votre message ici..."
          value={newContent}
          maxLength={1000}
          onChange={(e) => setNewContent(e.target.value)}
          onInput={(e) => {
            e.target.style.height = "auto";
            e.target.style.height = `${e.target.scrollHeight}px`;
          }}
        />
        <small className="ui-hint field-hint">{newContent.length}/1000</small>

        <div className="compose-actions">
          <Button type="button" onClick={handleAddMessage}>Ajouter</Button>
        </div>
      </Card>


      <MessageList messages={messages} />
    </div>
  );
};

export default Forum;

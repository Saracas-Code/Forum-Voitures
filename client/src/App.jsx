import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import PagePrincipale from "./components/PagePrincipale";
import Login from "./components/Login";
import Enregistrement from "./components/Enregistrement";
import Profile from "./components/Profile"
import './App.css';
import axios from "axios";
import { useState, useEffect } from "react";

// Recuperar user automáticamente al cargar la app
function App() {

    const [currentUser, setCurrentUser] = useState(null);
    const [checkingSession, setCheckingSession] = useState(true);

    useEffect(() => {
        console.log("[APP] currentUser mis à jour :", currentUser);
        axios.get("http://localhost:3000/api/isLogged", { withCredentials: true })
        .then((res) => {
            if (res.data.logged) {
                setCurrentUser(res.data.user);
            }
        })
        .finally(() => setCheckingSession(false));
    }, []);

    if (checkingSession) {
        return <p>Chargement...</p>;
    }

    return (
        <Router>
        <Routes>
            <Route path="/login" element={<Login currentUser={currentUser} setCurrentUser={setCurrentUser} />} />
            <Route path="/register" element={<Enregistrement />} />
            <Route path="/forum" element={<PagePrincipale currentUser={currentUser} setCurrentUser={setCurrentUser} />} />
            <Route path="/" element={<Navigate to={currentUser ? "/forum" : "/login"} />} />
        </Routes>
        </Router>
    );
}


export default App;

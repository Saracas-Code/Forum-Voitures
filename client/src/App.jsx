import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import PagePrincipale from "./components/PagePrincipale";
import Login from "./components/Login";
import Enregistrement from "./components/Enregistrement";
import './App.css';
import axios from "axios";
import { useState, useEffect } from "react";

function RedirectOnStart({ currentUser }) {
    const navigate = useNavigate();

    useEffect(() => {
        if (currentUser) {
        navigate("/forum");
        } else {
        navigate("/login");
        }
    }, [navigate, currentUser]);

    return <p>Chargement...</p>;
}

function App() {
    const [currentUser, setCurrentUser] = useState(null);

    // Recuperar user automáticamente al cargar la app
    useEffect(() => {
        axios.get("http://localhost:3000/api/isLogged", { withCredentials: true })
        .then((res) => {
            if (res.data.logged) {
            setCurrentUser(res.data.user);
            } else {
            setCurrentUser(null);
            }
        })
        .catch(() => {
            setCurrentUser(null);
        });
    }, []);

    return (
        <Router>
        <Routes>
            <Route path="/" element={<RedirectOnStart currentUser={currentUser} />} />
            <Route path="/forum" element={<PagePrincipale currentUser={currentUser} setCurrentUser={setCurrentUser} />} />
            <Route path="/login" element={<Login setCurrentUser={setCurrentUser} />} />
            <Route path="/register" element={<Enregistrement />} />
        </Routes>
        </Router>
    );
}

export default App;

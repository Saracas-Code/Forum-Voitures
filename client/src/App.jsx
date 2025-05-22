import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import PagePrincipale from "./components/PagePrincipale";
import Login from "./components/Login";
import Enregistrement from "./components/Enregistrement";
import Profile from "./components/Profile"
import './App.css';
import axios from "axios";
import { useState, useEffect } from "react";

// Recuperar user automáticamente al cargar la app
function RedirectOnStart({ setCurrentUser }) {
    const navigate = useNavigate();

    useEffect(() => {
        axios.get("http://localhost:3000/api/isLogged", { withCredentials: true })
            .then((res) => {
                if (res.data.logged) {
                    setCurrentUser(res.data.user);
                    navigate("/forum");
                } else {
                    setCurrentUser(null);
                    navigate("/login");
                }
            })
            .catch(() => {
                setCurrentUser(null);
                navigate("/login");
            });
    }, [navigate, setCurrentUser]);

    return <p>Chargement...</p>;
}


function App() {
    const [currentUser, setCurrentUser] = useState(null);

    return (
        <Router>
        <Routes>
            <Route path="/" element={<RedirectOnStart setCurrentUser={setCurrentUser} />} />
            <Route path="/login" element={<Login setCurrentUser={setCurrentUser} />} />
            <Route path="/register" element={<Enregistrement />} />
            <Route path="/forum" element={<PagePrincipale currentUser={currentUser} setCurrentUser={setCurrentUser} />} />
            <Route path="/profile" element={<Profile currentUser={currentUser} />} />
        </Routes>
        </Router>
    );
}

export default App;

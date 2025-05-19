import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import Forum from "./components/PagePrincipale";
import Login from "./components/Login";
import Enregistrement from "./components/Enregistrement";
import './App.css';
import axios from "axios";
import { useState, useEffect } from "react";


function RedirectOnStart() {
    const navigate = useNavigate();

    useEffect(() => {
        axios.get("http://localhost:3000/api/isLogged", { withCredentials: true })
        .then((res) => {
        if (res.data.logged) {
            navigate("/forum");
        } else {
            navigate("/login");
        }
        })
        .catch(() => {
            navigate("/login");
        });
    }, [navigate]);

  return <p>Chargement...</p>; // feedback pendant qu'on redirige
}

function App() {
    const [currentUser, setCurrentUser] = useState(null);
    return (
    <Router>
        <Routes>
            {/* Page racine qui dirige à la route correcte */}
            <Route path="/" element={<RedirectOnStart />} />

            <Route path="/forum" element={<Forum currentUser={currentUser} setCurrentUser={setCurrentUser} />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Enregistrement />} />
        </Routes>
    </Router>
    );
}

export default App;

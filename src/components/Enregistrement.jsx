import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import "../styles/forms.css"
import "../styles/Enregistrement.css"

const Enregistrement = () => {

    // States pour les inputs et le message d'erreur
    const [prenom, setPrenom] = useState("");
    const [nom, setNom] = useState("");
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const [retapez, setRetapez] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const navigate = useNavigate(); // Pour rédiriger après le login

    // Fonction pour vérifier la registration
    const handleSubmit = (event) => {
        event.preventDefault(); // Éviter que la page se recharge

        if (!prenom || !nom || !login || !password || !retapez) {
            setError("Veuillez remplir tous les champs");
            setSuccess("");
            return;
        }

        if (password !== retapez) {
            setError("La password n'est pas la même");
            setSuccess("");
            return;
        }

        setSuccess("Inscription réussie! En attente de validation administrative ")
        setError("");
        
        // APRÈS ÇA, L'USER DOIT ATTENDRE À QU'UN ADMIN LUI ACEPTE ET L'AJOUTE DANS LA BASE DE DONNÉES
    };

    const handleReset = () => {
        setPrenom("");
        setNom("");
        setLogin("");
        setPassword("");
        setRetapez("");
        setError("");
        setSuccess("");
    };

    return (
        <div className="enregistrement-container">
            <h1>Enregistrement</h1>
            <div id="connect">
                <Link to="/">Page Principale</Link>
                <Link to="/login">Connexion</Link>
            </div>
            <form onSubmit={handleSubmit} onReset={handleReset}>
                <div className="prenom_nom">
                    <div>
                        <label htmlFor="chp_prenom">Prénom</label>
                        <input id="chp_prenom" placeholder="Name..." value={prenom} onChange={(e) => setPrenom(e.target.value)} />
                    </div>
                    <div>
                        <label htmlFor="chp_nom">Nom</label>
                        <input id="chp_nom" placeholder="Surname..." value={nom} onChange={(e) => setNom(e.target.value)} />
                    </div>
                </div>

                <label htmlFor="chp_login">Login (Username)</label>
                <input id="chp_login" placeholder="Login..." value={login} onChange={(e) => setLogin(e.target.value)}/>

                <label htmlFor="chp_password">Mot de passe</label>
                <input type="password" id="chp_password" placeholder="Password..." value={password} onChange={(e) => setPassword(e.target.value)}/>

                <label htmlFor="chp_retapez">Retapez le mot de passe</label>
                <input type="password" id="chp_retapez" placeholder="Repeat password..." value={retapez} onChange={(e) => setRetapez(e.target.value)}/>

                <button type="submit">S'inscrire</button>
                <button type="reset">Annuler</button>

                {error && <p className="error">{error}</p>}
                {success && <p className="success">{success}</p>}
            </form>
        </div>
    );
};

export default Enregistrement;
